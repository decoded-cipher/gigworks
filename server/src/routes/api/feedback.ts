
import { Hono } from "hono";
const router = new Hono();
import { nanoid } from "nanoid";

import {
  getProfileTestimonials,
  createTestimonial,
  updateTestimonialStatus
} from "../../services/testimonial";

import { verifyToken } from "../../middleware/authentication";
import { User } from "../../config/database/interfaces";



/**
 * @route   GET /api/v1/feedback/:profileId
 * @desc    Get all testimonials of a profile
 * @access  Private
 * @return  message, data
 * @error   500, { error }
 * @status  200, 500
 *
 * @example /api/v1/feedback/profile123
 **/

router.get("/:profileId", verifyToken, async (c) => {
  try {
    const { profileId } = c.req.param();

    const testimonials = await getProfileTestimonials(profileId);
    return c.json(
      {
        message: "Testimonials retrieved successfully",
        data: testimonials,
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      500
    );
  }
});



/**
 * @route   POST /api/v1/feedback/generate-link
 * @desc    Generate a unique feedback link that expires in 10 minutes
 * @access  Private
 * @return  message, data: { linkId, expiresAt }
 * @error   500, { error }
 * @status  201, 500
 **/

router.post("/generate-link", async (c) => {
  try {
    const { profileId } = await c.req.json();
    
    if (!profileId) {
      return c.json({ message: "profileId required" }, 400);
    }

    // Generate unique ID using nanoid
    const linkId = nanoid();
    const expiresAt = Date.now() + (10 * 60 * 1000); // 10 minutes
    
    const kv = (c.env as any)?.KV_STORE;
    if (kv) {
      await kv.put(`feedback:${linkId}`, JSON.stringify({
        profileId,
        expiresAt,
      }), { expirationTtl: 600 });
    }

    return c.json({
      message: "Link generated",
      data: {
        linkId,
        profileId,
        expiresAt,
        expiresIn: "10 minutes"
      }
    }, 201);
  } catch (error: any) {
    return c.json({ message: "Error", error: error.message }, 500);
  }
});



/**
 * @route   POST /api/v1/feedback
 * @desc    Create a new testimonial/feedback
 * @access  Public
 * @return  message, data
 * @error   400, 500, { error }
 * @status  201, 400, 500
 *
 * @example POST /api/v1/feedback
 * @body    { profileId, userDetails, rating, comment }
 **/

router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { rating, comment, linkId } = body;
    let userDetails = body.userDetails;

    if (!linkId) {
      return c.json({
        message: "Forbidden",
        error: "Valid feedback link required"
      }, 403);
    }

    // Get and validate link
    const kv = (c.env as any)?.KV_STORE;
    if (!kv) {
      return c.json({ message: "Service unavailable" }, 500);
    }

    const linkData = await kv.get(`feedback:${linkId}`);
    if (!linkData) {
      return c.json({ message: "Invalid or expired link" }, 400);
    }

    const linkInfo = JSON.parse(linkData);
    const { profileId, expiresAt } = linkInfo;

    if (Date.now() > expiresAt) {
      return c.json({ message: "Link expired" }, 400);
    }

    // Validate required fields
    if (!userDetails || !rating || !comment) {
      return c.json({
        message: "Missing required fields",
        error: "userDetails, rating and comment are required"
      }, 400);
    }

    // Delete used link from KV store
    await kv.delete(`feedback:${linkId}`);

    if (userDetails) {
      userDetails = JSON.stringify(userDetails);
    }

    const testimonial = await createTestimonial(profileId, userDetails, rating, comment);
    return c.json({
      message: "Testimonial created successfully",
      // data: testimonial,
    }, 201);
  } catch (error: any) {
    return c.json({
      message: "Internal Server Error",
      error: error.message
    }, 500);
  }
});



/**
 * @route   PATCH /api/v1/feedback/:testimonialId
 * @desc    Update testimonial status (only for profile owner)
 * @access  Private
 * @return  message, data
 * @error   400, 401, 403, 500, { error }
 * @status  200, 400, 401, 403, 500
 *
 * @example PATCH /api/v1/feedback/testimonial123
 * @body    { status, profileId }
 **/

router.patch("/:testimonialId", verifyToken, async (c) => {
  try {
    const { testimonialId } = c.req.param();
    const body = await c.req.json();
    const { status, profileId } = body;

    // Validate required fields
    if (status === undefined || !profileId) {
      return c.json(
        {
          message: "Missing required fields",
          error: "status and profileId are required",
        },
        400
      );
    }

    // Validate status
    if (status !== 0 && status !== 1) {
      return c.json(
        {
          message: "Invalid status",
          error: "Status must be 0 (inactive) or 1 (active)",
        },
        400
      );
    }

    const updatedTestimonial = await updateTestimonialStatus(testimonialId, profileId, status);
    return c.json(
      {
        message: "Testimonial status updated successfully",
        // data: updatedTestimonial,
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      500
    );
  }
});



export default router;
