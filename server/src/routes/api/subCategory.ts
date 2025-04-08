import { Hono } from "hono";
const router = new Hono();

import {
  createSubCategory,
  getCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  updateSubCategoryStatus,
} from "../../services/subCategory";

/**
 * @route   POST /api/v1/sub_category
 * @desc    Create a new sub_category
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/sub_category
 **/

router.post("/", async (c) => {
  const { name, category_id } = await c.req.json();

  if (!name || !category_id) {
    return c.json(
      {
        message: "Name and Category ID are required",
      },
      400
    );
  }

  try {
    const sub_category = await createSubCategory(name, category_id);
    return c.json(
      {
        message: "Sub category created successfully",
        // data: sub_category
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
 * @route   GET /api/v1/sub_category
 * @desc    Get all sub_category with pagination
 * @access  Public
 * @params  void
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/sub_category?page=1&limit=10
 **/

router.get("/", async (c) => {
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 10;
  const search = c.req.query("search") || "";
  const status = c.req.query("status");

  try {
    const result = await getCategories(page, limit, search, status);

    if (result.data.length > 0) {
      return c.json(
        {
          message: "Sub categories fetched successfully",
          data: {
            sub_categories: result.data,
            meta: {
              params: {
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
    } else {
      return c.json(
        {
          message: "Sub categories not found",
        },
        404
      );
    }
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
 * @route   GET /api/v1/sub_category/:id
 * @desc    Get a sub_category by id
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/sub_category/1
 **/

router.get("/:id", async (c) => {
  const { id } = c.req.param();
  const status = c.req.query("status");

  try {
    const sub_category = await getSubCategoryById(id, status);

    if (sub_category) {
      return c.json(
        {
          message: "Sub category fetched successfully",
          data: sub_category,
        },
        200
      );
    } else {
      return c.json(
        {
          message: "Sub category not found",
        },
        404
      );
    }
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
 * @route   PATCH /api/v1/sub_category/:id
 * @desc    Update a sub_category
 * @access  Public
 * @params  id, name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/sub_category/1
 **/

router.patch("/:id", async (c) => {
  const { name } = await c.req.json();
  const id = c.req.param("id");

  if (!name) {
    return c.json(
      {
        message: "All fields are required",
      },
      400
    );
  }

  try {
    const sub_category = await updateSubCategory(id, name);

    if (sub_category) {
      return c.json(
        {
          message: "Sub category updated successfully",
          data: sub_category,
        },
        200
      );
    } else {
      return c.json(
        {
          message: "Sub category not found",
        },
        404
      );
    }
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
 * @route   DELETE /api/v1/sub_category/:id
 * @desc    Delete a sub_category
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/sub_category/1
 **/

router.delete("/:id", async (c) => {
  const { id } = c.req.param();

  try {
    await deleteSubCategory(id);
    return c.json(
      {
        message: "Sub category deleted successfully",
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
 * @route   PUT /api/v1/update-status
 * @desc    Update an existing sub category type by ID
 * @access  Public
 * @params  id (path parameter)
 * @body    { "status": "0", "category_id": "category_id" }
 * @return  message, data
 * @error   400, { error }
 * @error   404, { error }
 * @status  200, 400, 404
 *
 * @example /api/v1/sub_category/update-status
 **/

router.put("/update-status", async (c) => {
  const { status, sub_category_id } = await c.req.json();

  // Validate required fields
  if (!status && !sub_category_id) {
    return c.json(
      {
        message: "status, category_id is required",
      },
      400
    );
  }

  try {
    const sub_category = await updateSubCategoryStatus(sub_category_id, status);

    if (!sub_category) {
      return c.json(
        {
          message: "Sub category not found",
        },
        404
      );
    }

    return c.json(
      {
        message: "Sub category staus updated successfully",
        data: sub_category,
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
export default router;
