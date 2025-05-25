import { SchoolModel } from "../models/schoolModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Haversine formula to calculate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Add School
export const addSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    throw new ApiError(400, "All fields are required and must be valid types.");
  }

  // Use model to insert
  const school = await SchoolModel.addSchool({ name, address, latitude, longitude });

  res.status(201).json(
    new ApiResponse(201, school, "School added successfully")
  );
});

// List Schools sorted by proximity
export const listSchools = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.query;

  if (
    typeof latitude === "undefined" ||
    typeof longitude === "undefined" ||
    isNaN(Number(latitude)) ||
    isNaN(Number(longitude))
  ) {
    throw new ApiError(400, "User latitude and longitude are required as query parameters.");
  }

  const userLat = Number(latitude);
  const userLon = Number(longitude);

  // Use model to fetch all schools
  const schools = await SchoolModel.getAllSchools();

  // Add distance to each school and sort
  const schoolsWithDistance = schools.map((school) => ({
    ...school,
    distance: getDistance(userLat, userLon, school.latitude, school.longitude),
  }));

  schoolsWithDistance.sort((a, b) => a.distance - b.distance);

  res.json(
    new ApiResponse(200, schoolsWithDistance, "Schools sorted by proximity")
  );
});