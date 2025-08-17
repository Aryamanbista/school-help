const Offer = require("../models/Offer");
const Request = require("../models/Request");

// @desc    Create a new offer for a request
// @route   POST /api/offers
// @access  Private/Volunteer
const createOffer = async (req, res) => {
  const { request, remarks } = req.body;
  try {
    const newOffer = new Offer({
      request,
      remarks,
      volunteer: req.user._id, // Get volunteer from logged-in user
    });
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all offers for a specific request
// @route   GET /api/offers/request/:requestId
// @access  Private/SchoolAdmin
const getOffersForRequest = async (req, res) => {
  try {
    const offers = await Offer.find({ request: req.params.requestId }).populate(
      "volunteer",
      "fullname occupation"
    ); // Populate volunteer info
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Accept an offer
// @route   PUT /api/offers/:id/accept
// @access  Private/SchoolAdmin
const acceptOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // TODO: Add check to ensure the admin belongs to the school that made the request

    // Update offer status
    offer.offerStatus = "ACCEPTED";
    await offer.save();

    // Update the associated request's status to PENDING
    await Request.findByIdAndUpdate(offer.request, {
      requestStatus: "PENDING",
    });

    // Reject all other offers for the same request
    await Offer.updateMany(
      { request: offer.request, _id: { $ne: offer._id } },
      { offerStatus: "REJECTED" }
    );

    res.json({ message: "Offer accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOffer, getOffersForRequest, acceptOffer };
