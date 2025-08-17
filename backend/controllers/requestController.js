const Request = require("../models/Request");
const School = require("../models/School"); // We may need this later

// @desc    Get all requests with status 'NEW'
// @route   GET /api/requests
// @access  Public
const getAllNewRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requestStatus: "NEW" })
      .populate("school", "schoolName city")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a single request by ID
// @route   GET /api/requests/:id
// @access  Public
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "school",
      "schoolName city address"
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new request
// @route   POST /api/requests
// @access  Private/SchoolAdmin
const createRequest = async (req, res) => {
  const { description, requestType, ...details } = req.body;
  try {
    const newRequest = new Request({
      school: req.user.school, // Get school from the logged-in admin user
      description,
      requestType,
      ...details,
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all requests for the logged-in admin's school
// @route   GET /api/requests/myschool
// @access  Private/SchoolAdmin
const getRequestsBySchool = async (req, res) => {
  try {
    const requests = await Request.find({ school: req.user.school }).sort({
      createdAt: -1,
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllNewRequests,
  getRequestById,
  createRequest,
  getRequestsBySchool,
};
