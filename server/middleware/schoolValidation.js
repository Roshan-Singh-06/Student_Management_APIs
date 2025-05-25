// Validation middleware for addSchool
export function validateAddSchool(req, res, next) {
  const { name, address, latitude, longitude } = req.body;
  if (
    !name ||
    typeof name !== "string" ||
    !address ||
    typeof address !== "string" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (name, address, latitude, longitude) are required and must be valid types.",
    });
  }
  next();
}

// Validation middleware for listSchools
export function validateListSchools(req, res, next) {
  const { latitude, longitude } = req.query;
  if (
    typeof latitude === "undefined" ||
    typeof longitude === "undefined" ||
    isNaN(Number(latitude)) ||
    isNaN(Number(longitude))
  ) {
    return res.status(400).json({
      success: false,
      message:
        "User latitude and longitude are required as query parameters and must be valid numbers.",
    });
  }
  next();
}
