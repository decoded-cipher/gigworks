import { Hono } from "hono";
const router = new Hono();

import {
  createLicenseType,
  getLicenseTypes,
  updatedLicenseType,
  updatedLicenseTypeStatus,
} from "../../services/license";
import { license } from "../../config/database/schema";

/**
 * @route   POST /api/v1/license
 * @desc    Add a new license type to the system
 * @access  Public
 * @params  name, description
 * @return  message, data
 * @error   400, { error }
 * @status  201, 400
 *
 * @example /api/v1/license
 **/

router.post("/", async (c) => {
  const { name, description } = await c.req.json();

  if (!name || !description) {
    return c.json(
      {
        message: "Name and description are required",
      },
      400
    );
  }

  try {
    let licenseType = await createLicenseType(name, description);

    return c.json(
      {
        message: "License type created successfully",
        data: licenseType,
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
 * @route   GET /api/v1/license
 * @desc    Get all license types
 * @access  Public
 * @return  message, data
 * @error   400, { error }
 * @status  200, 400
 *
 * @example /api/v1/license
 **/

router.get("/", async (c) => {
  try {
    let licenseTypes = await getLicenseTypes();

    return c.json(
      {
        message: "License types retrieved successfully",
        data: licenseTypes,
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
 * @route   PATCH /api/v1/license/:id
 * @desc    Update an existing license type by ID
 * @access  Public
 * @params  id (path parameter), name, description (request body)
 * @return  message, data
 * @error   400, { error }
 * @error   404, { error }
 * @status  200, 400, 404
 *
 * @example /api/v1/license/:id
 **/

router.patch("/:id", async (c) => {
  const licenseId = c.req.param("id");
  const { name, description } = await c.req.json();

  if (!name || !description) {
    return c.json(
      {
        message: "Name and description are required",
      },
      400
    );
  }

  try {
    const updatedLicense = await updatedLicenseType(
      licenseId,
      name,
      description
    );

    if (!updatedLicense) {
      return c.json(
        {
          message: "License type not found",
        },
        404
      );
    }

    return c.json(
      {
        message: "License type updated successfully",
        data: updatedLicense,
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
 * @route   PUT /api/v1/license/update-status
 * @desc    Update an existing license type by ID
 * @access  Public
 * @params  id (path parameter)
 * @body    { "status": "active", "name": "New License Name", "description": "Updated description" }
 * @return  message, data
 * @error   400, { error }
 * @error   404, { error }
 * @status  200, 400, 404
 *
 * @example /api/v1/license/update-status
 **/

router.put("/update-status", async (c) => {
  const { status, licenseId } = await c.req.json();

  // Validate required fields
  if (!status && !licenseId) {
    return c.json(
      {
        message: "status, licenseId is required",
      },
      400
    );
  }

  try {
    const updatedLicense = await updatedLicenseTypeStatus(status, licenseId);

    if (!updatedLicense) {
      return c.json(
        {
          message: "License type not found",
        },
        404
      );
    }

    return c.json(
      {
        message: "License type updated successfully",
        data: updatedLicense,
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
