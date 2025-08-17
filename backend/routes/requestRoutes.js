const express = require("express");
const router = express.Router();
const {
  getAllNewRequests,
  getRequestById,
  createRequest,
  getRequestsBySchool,
} = require("../controllers/requestController");
const { protect, isSchoolAdmin } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getAllNewRequests)
  .post(protect, isSchoolAdmin, createRequest);

router.get("/myschool", protect, isSchoolAdmin, getRequestsBySchool);

router.route("/:id").get(getRequestById);

module.exports = router;
