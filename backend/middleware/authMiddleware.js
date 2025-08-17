const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (and attach to request object)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check for School Admin role
const isSchoolAdmin = (req, res, next) => {
  if (req.user && req.user.role === "School Admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Not a School Admin." });
  }
};

// Middleware to check for Volunteer role
const isVolunteer = (req, res, next) => {
  if (req.user && req.user.role === "Volunteer") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Not a Volunteer." });
  }
};

module.exports = { protect, isSchoolAdmin, isVolunteer };
