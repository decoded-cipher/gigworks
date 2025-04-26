import { Hono } from "hono";
const router = new Hono();

import { createPayment } from "../../services/payment";
import { createUser, getUserByPhone } from "../../services/user";
import { addProfileTag, removeProfileTag } from "../../services/profileTag";

import {
  addProfileLicense,
  removeProfileLicense,
} from "../../services/profileLicense";

import {
  addProfileMedia,
  removeProfileMedia,
} from "../../services/profileMedia";

import {
  createProfile,
  getProfileById,
  updateProfile,
  getProfileCount,
  getRenewalProfiles,
  getProfileBySlug,
  checkProfileSlug,
  getProfilesByCategory,
  updateProfileStatus,
} from "../../services/profile";

import {
  User,
  Profile,
  ProfilePayment,
  ProfileMedia,
  ProfileLicense,
  ProfileTag,
} from "../../config/database/interfaces";
import { verifyToken } from "../../middleware/authentication";

/**
 * @route   POST /api/v1/business
 * @desc    Create a new business
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/business
 **/

router.post("/", async (c) => {
  try {
    const data = await c.req.json();
    const profileStatus = data.payment.payment_status === "success" ? 1 : 0;

    let user: User = await getUserByPhone(data.user.phone);

    let profile: Profile = await createProfile({
      ...data.profile,
      user_id: user.id,
      status: profileStatus,
    });

    if (!profile) {
      return c.json(
        {
          message: "Business creation failed",
        },
        400
      );
    }

    let license: License | null = null;
    if (data.license && data.license.length > 0) {
      license = await addProfileLicense(profile.id, data.license);
    }

    let payment: ProfilePayment | null = null;
    if (data.payment) {
      payment = await createPayment({
        ...data.payment,
        profile_id: profile.id,
      });
    }

    return c.json(
      {
        message: "Business created successfully",
        data: {
          user,
          profile,
          license,
          payment,
        },
      },
      201
    );
  } catch (error) {
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
 * @route   GET /api/v1/business/renewal
 * @desc    Get all businesses that need renewal
 * @access  Public
 * @params  user
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500
 *
 * @example /api/v1/business/renewal
 **/

router.get("/renewal", async (c) => {
  try {
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 10;
    const days = Number(c.req.query("days")) || 0;
    const search = c.req.query("search") || "";
    let profiles = await getRenewalProfiles(page, limit, days, search);

    if (!profiles) {
      return c.json(
        {
          message: "No businesses found",
        },
        404
      );
    }

    return c.json(
      {
        message: "Businesses fetched successfully",
        data: {
          profiles: profiles.data,
          meta: {
            params: {
              page: page,
              limit: limit,
              days: days,
            },
            total_count: profiles.count,
            total_pages: Math.ceil(profiles.count / limit),
            previous:
              page > 1
                ? `/api/v1/sub_category?page=${page - 1}&limit=${limit}`
                : null,
            next:
              profiles.data.length === limit
                ? `/api/v1/sub_category?page=${page + 1}&limit=${limit}`
                : null,
          },
        },
      },
      200
    );
  } catch (error) {
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
 * @route   GET /api/v1/business/count
 * @desc    Get count of all businesses
 * @access  Public
 * @params  user
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500
 *
 * @example /api/v1/business/count
 **/

router.get("/count", async (c) => {
  try {
    let count = await getProfileCount();
    return c.json(
      {
        message: "Businesses count fetched successfully",
        data: count,
      },
      200
    );
  } catch (error) {
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
 * @route   GET /api/v1/business/:slug
 * @desc    Get a business by slug
 * @access  Public
 * @params  slug
 * @return  message, data
 * @error   400, { error }
 * @status  200, 500, 404
 *
 * @example /api/v1/business/:slug
 **/

router.get("/:slug", async (c) => {
  try {
    const { slug } = c.req.param();

    let profile = await getProfileBySlug(slug);
    if (!profile) {
      return c.json(
        {
          message: "Business does not exist or is expired",
        },
        404
      );
    }

    return c.json(
      {
        message: "Business fetched successfully",
        data: profile,
      },
      200
    );
  } catch (error) {
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
 * @route   GET /api/v1/business/slug/check
 * @desc    Check if a business slug is available
 * @access  Public
 * @params  slug
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business/slug/check?value=slug
 **/

router.get("/slug/check", async (c) => {
  try {
    const slug = c.req.query("value");

    let exists = await checkProfileSlug(slug);
    if (exists) {
      return c.json(
        {
          message: "This slug is already in use. Try another one.",
          data: false,
        },
        200
      );
    }

    return c.json(
      {
        message: "This slug is available for use. You can proceed.",
        data: true,
      },
      200
    );
  } catch (error) {
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
 * @route   GET /api/v1/business?category_id=123
 * @desc    Get businesses by category with pagination
 * @access  Public
 * @params  category_id, page, limit, search
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business?category_id=123&page=1&limit=10&search=keyword
 **/

router.get("/", async (c) => {
  try {
    const category_id = c.req.query("category_id");
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 10;
    const search = c.req.query("search") || "";

    let result = await getProfilesByCategory(category_id, page, limit, search);

    if (!result) {
      return c.json(
        {
          message: "No businesses found",
        },
        404
      );
    }

    return c.json(
      {
        message: "Businesses fetched successfully",
        data: {
          profiles: result.data,
          meta: {
            params: {
              category_id: category_id,
              page: page,
              limit: limit,
              search: search,
            },
            total_count: result.count,
            total_pages: Math.ceil(result.count / limit),
            previous:
              page > 1
                ? `/api/v1/sub_category?page=${page - 1}&limit=${limit}`
                : null,
            next:
              result.data.length === limit
                ? `/api/v1/sub_category?page=${page + 1}&limit=${limit}`
                : null,
          },
        },
      },
      200
    );
  } catch (error) {
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
 * @route   PATCH /api/v1/business/:id
 * @desc    Update a business by id
 * @access  Authenticated
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business/:id
 **/

router.patch("/:id", verifyToken, async (c) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json();

    let checkProfile = await getProfileById(id);
    if (!checkProfile) {
      return c.json(
        {
          message: "Business does not exist",
        },
        404
      );
    }

    let profile = await updateProfile(id, data);
    if (!profile) {
      return c.json(
        {
          message: "Business update failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "Business updated successfully",
        data: profile,
      },
      200
    );
  } catch (error) {
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
 * @route   POST /api/v1/business/:id/media
 * @desc    Add media to a business by id
 * @access  Authenticated
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/business/:id/media
 **/

router.post("/:id/media", verifyToken, async (c) => {
  try {
    const { id } = c.req.param();
    const { url, description } = await c.req.json();

    let media = await addProfileMedia({ profile_id: id, url, description });

    if (!media) {
      return c.json(
        {
          message: "Media addition failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "Media added successfully",
        data: media,
      },
      201
    );
  } catch (error) {
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
 * @route   DELETE /api/v1/business/:id/media/:media_id
 * @desc    Remove media from a business by id
 * @access  Authenticated
 * @params  id, media_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business/:id/media/:media_id
 **/

router.delete("/:id/media/:media_id", verifyToken, async (c) => {
  try {
    const { id, media_id } = c.req.param();

    let profile = await removeProfileMedia(id, media_id);
    if (!profile) {
      return c.json(
        {
          message: "Media removal failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "Media removed successfully",
        data: profile,
      },
      200
    );
  } catch (error) {
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
 * @route   POST /api/v1/business/:id/tag
 * @desc    Add tag to a business by id
 * @access  Authenticated
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/business/:id/tag
 **/

router.post("/:id/tag", verifyToken, async (c) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json();

    let profile = await addProfileTag(id, data);
    if (!profile) {
      return c.json(
        {
          message: "Tag addition failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "Tag added successfully",
        data: profile,
      },
      201
    );
  } catch (error) {
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
 * @route   DELETE /api/v1/business/:id/tag/:tag_id
 * @desc    Remove tag from a business by id
 * @access  Authenticated
 * @params  id, tag_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business/:id/tag/:tag_id
 **/

router.delete("/:id/tag/:tag_id", verifyToken, async (c) => {
  try {
    const { id, tag_id } = c.req.param();

    let profile = await removeProfileTag(id, tag_id);
    if (!profile) {
      return c.json(
        {
          message: "Tag removal failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "Tag removed successfully",
        data: profile,
      },
      200
    );
  } catch (error) {
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
 * @route   POST /api/v1/business/:id/license
 * @desc    Add license to a business by id
 * @access  Authenticated
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/business/:id/license
 **/

router.post("/:id/license", verifyToken, async (c) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json();

    let license = await addProfileLicense(id, data);
    if (!license) {
      return c.json(
        {
          message: "License addition failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "License added successfully",
        data: license,
      },
      201
    );
  } catch (error) {
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
 * @route   DELETE /api/v1/business/:id/license/:license_id
 * @desc    Remove license from a business by id
 * @access  Authenticated
 * @params  id, license_id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business/:id/license/:license_id
 **/

router.delete("/:id/license/:license_id", verifyToken, async (c) => {
  try {
    const { id, license_id } = c.req.param();

    let license = await removeProfileLicense(id, license_id);
    if (!license) {
      return c.json(
        {
          message: "License removal failed",
        },
        400
      );
    }

    return c.json(
      {
        message: "License removed successfully",
        data: license,
      },
      200
    );
  } catch (error) {
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
 * @route   POST /api/v1/business/update-status
 * @desc    Update profile status of a business by id
 * @access  Authenticated
 * @params  profileId, status
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/business/update-status
 **/
router.post("/update-status", async (c) => {
  try {
    const { profileId, status } = await c.req.json();
    const profile = await updateProfileStatus(profileId, status);
    if (!profile) {
      return c.json(
        {
          message: "Profile status update failed",
        },
        400
      );
    }
    return c.json(
      {
        message: "Profile status updated successfully",
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      500
    );
  }
});
module.exports = router;
