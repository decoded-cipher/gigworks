
import { Hono } from "hono";
const router = new Hono();

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
    const { profileId, rating, comment } = body;
    let userDetails = body.userDetails;

    // Validate required fields
    if (!profileId || !userDetails || !rating || !comment) {
      return c.json(
        {
          message: "Missing required fields",
          error: "profileId, userDetails, rating, and comment are required",
        },
        400
      );
    }

    if (userDetails) {
      userDetails = JSON.stringify(userDetails);
    }

    const testimonial = await createTestimonial(profileId, userDetails, rating, comment);
    return c.json(
      {
        message: "Testimonial created successfully",
        // data: testimonial,
      },
      201
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
