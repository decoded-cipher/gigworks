import { Hono } from "hono";
const router = new Hono();

import {
  getAllSubCategoryOptions,
  createSubCategoryOption,
  updateSubCategoryOption,
  updateSubCategoryOptionStatus,
} from "../../services/subCategoryOption";


/**
 * @route   GET /api/v1/sub_category_option
 * @desc    Get all sub_category_options
 * @access  Public
 * @return  message, data
 * @error   500, { error }
 * @status  200, 500
 *
 * @example /api/v1/sub_category_option
 **/

router.get("/", async (c) => {
  try {
    const { search } = c.req.query();

    const sub_category_options = await getAllSubCategoryOptions(search);
    return c.json(
      {
        message: "Sub category options retrieved successfully",
        data: sub_category_options,
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
 * @route   POST /api/v1/sub_category_option
 * @desc    Create a new sub_category_option
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/sub_category_option
 **/

router.post("/", async (c) => {
  const { name, sub_category_id } = await c.req.json();

  if (!name || !sub_category_id) {
    return c.json(
      {
        message: "Name and Sub-Category ID are required",
      },
      400
    );
  }

  try {
    const sub_category_option = await createSubCategoryOption(
      name,
      sub_category_id
    );
    return c.json(
      {
        message: "Sub category option created successfully",
        data: sub_category_option,
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
 * @route   PATCH /update-status
 * @desc    Update the status of a sub_category_option
 * @access  Public
 * @params  sub_category_option_id, status
 * @return  message, data
 * @error   400, { message }
 * @error   500, { message, error }
 * @status  200, 400, 500
 *
 * @example  /api/v1/sub_category_option/update-status
 **/

router.patch("/update-status", async (c) => {
  const { sub_category_option_id, status } = await c.req.json();

  if (!sub_category_option_id || status === undefined) {
    return c.json(
      {
        message: "sub_category_option_id and status are required",
      },
      400
    );
  }

  try {
    const updatedOption = await updateSubCategoryOptionStatus(
      sub_category_option_id,
      status
    );
    return c.json(
      {
        message: "Sub category option status updated successfully",
        data: updatedOption,
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
 * @route   PATCH /:id
 * @desc    Update a sub_category_option by ID
 * @access  Public
 * @params  id (path parameter), name (request body)
 * @return  message, data
 * @error   400, { message }
 * @error   404, { message }
 * @error   500, { message, error }
 * @status  200, 400, 404, 500
 *
 * @example  /api/v1/sub_category_option/:sub_category_option_id
 **/

router.patch("/:id", async (c) => {
  const sub_category_option_id = c.req.param("id") || "";
  const { name } = await c.req.json();

  if (!name) {
    return c.json(
      {
        message: "Name is required",
      },
      400
    );
  }

  try {
    const updatedSubCategoryOption = await updateSubCategoryOption(
      sub_category_option_id,
      name
    );
    if (!updatedSubCategoryOption) {
      return c.json(
        {
          message: "Sub category option not found",
        },
        404
      );
    }

    return c.json(
      {
        message: "Sub category option updated successfully",
        data: updatedSubCategoryOption,
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
