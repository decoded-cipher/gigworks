import { Hono } from "hono";
const router = new Hono();

import { seedCategory } from "../../seeder/category";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  enableDisableCategory,
} from "../../services/category";

/**
 * @route   POST /api/v1/category
 * @desc    Create a new category
 * @access  Public
 * @params  name
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/category
 **/

router.post("/", async (c) => {
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
    const category = await createCategory(name);
    return c.json(
      {
        message: "Category created successfully",
        // data: category
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
 * @route   GET /api/v1/category
 * @desc    Get all category with pagination
 * @access  Public
 * @params  void
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category?page=1&limit=10
 **/

router.get("/", async (c) => {
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit"));
  const search = c.req.query("search") || "";
  const hasBusiness = Boolean(c.req.query("hasBusiness")) || false;
  const status = c.req.query("status");

  try {
    const result = await getCategories(
      page,
      limit,
      search,
      hasBusiness,
      status
    );

    if (result.data.length > 0) {
      return c.json(
        {
          message: "Categories fetched successfully",
          data: {
            categories: result.data,
            meta: {
              params: {
                page: page,
                limit: limit,
                search: search,
                hasBusiness: hasBusiness,
                status: status,
              },
              total_count: result.count,
              total_pages: Math.ceil(result.count / limit),
              previous:
                page > 1
                  ? `/api/v1/category?page=${page - 1}&limit=${limit}`
                  : null,
              next:
                result.data.length === limit
                  ? `/api/v1/category?page=${page + 1}&limit=${limit}`
                  : null,
            },
          },
        },
        200
      );
    } else {
      return c.json(
        {
          message: "Categories not found",
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
 * @route   GET /api/v1/category/:id
 * @desc    Get a category by id
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category/1
 **/

router.get("/:id", async (c) => {
  const { id } = c.req.param();

  try {
    const category = await getCategoryById(id);

    if (category) {
      return c.json(
        {
          message: "Category fetched successfully",
          data: category,
        },
        200
      );
    } else {
      return c.json(
        {
          message: "Category not found",
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
 * @route   PATCH /api/v1/category/:id
 * @desc    Update a category
 * @access  Public
 * @params  id, name
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category/1
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
    const category = await updateCategory(id, name);

    if (category) {
      return c.json(
        {
          message: "Category updated successfully",
          data: category,
        },
        200
      );
    } else {
      return c.json(
        {
          message: "Category not found",
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
 * @route   PATCH /api/v1/category/:id/:mode
 * @desc    Enable/Disable a category
 * @access  Public
 * @params  id
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category/1
 **/

router.patch("/:id/:mode", async (c) => {
  const { id, mode } = c.req.param();

  if (!id || !mode) {
    return c.json(
      {
        message: "Category ID and MODE are required",
      },
      400
    );
  }

  let status = 0;
  switch (mode) {
    case "enable":
      status = 1;
      break;
    case "disable":
      status = 0;
      break;
    default:
      return c.json(
        {
          message: "Invalid mode",
        },
        400
      );
  }

  try {
    await enableDisableCategory(id, status);
    return c.json(
      {
        message: "Category and Sub-categories updated successfully",
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
 * @route   GET /api/v1/category/seed
 * @desc    Seed data for testing
 * @access  Public
 * @params  void
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/category/seed
 **/

// router.post('/seed', async (c) => {
//     try {
//         await seedCategory();
//         return c.json({
//             message: 'Data seeded successfully'
//         }, 201);

//     } catch (error) {
//         return c.json({
//             message: 'Internal Server Error',
//             error: error.message
//         }, 500);
//     }
// });

export default router;
