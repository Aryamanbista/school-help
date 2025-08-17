const express = require("express");
const router = express.Router();
const {
  createOffer,
  getOffersForRequest,
  acceptOffer,
} = require("../controllers/offerController");
const {
  protect,
  isVolunteer,
  isSchoolAdmin,
} = require("../middleware/authMiddleware");

router.route("/").post(protect, isVolunteer, createOffer);

router.get("/request/:requestId", protect, isSchoolAdmin, getOffersForRequest);

router.put("/:id/accept", protect, isSchoolAdmin, acceptOffer);

module.exports = router;
