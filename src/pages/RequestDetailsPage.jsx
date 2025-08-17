import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { requestService } from "../services/requestService";
import { offerService } from "../services/offerService";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaArrowLeft } from "react-icons/fa";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const { currentUser } = useAuth();
  const [request, setRequest] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const req = requestService.getRequestById(id);
    if (req) {
      setRequest(req);
    } else {
      // Handle case where request is not found
      toast.error("Request not found.");
      navigate("/volunteer/dashboard");
    }
  }, [id, navigate]);

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!currentUser || currentUser.role !== "Volunteer") {
      toast.error("Only registered volunteers can make offers.");
      setSubmitting(false);
      return;
    }

    const offerData = {
      requestID: request.requestID,
      volunteerID: currentUser.username, // Using username as ID for simplicity
      volunteerName: currentUser.fullname,
      remarks,
    };

    // Simulate network delay
    setTimeout(() => {
      offerService.submitOffer(offerData);
      toast.success("Your offer has been submitted successfully!");
      setSubmitting(false);
      navigate("/volunteer/dashboard");
    }, 1000);
  };

  // Function to handle clicking the back button
  const handleGoBack = () => {
    navigate(-1); // This navigates to the previous entry in the history stack
  };

  if (!request) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* --- Back Button Added Here --- */}
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Requests</span>
        </button>
      </div>
      {/* --- End of Back Button --- */}

      <Card>
        <span
          className={`font-semibold px-3 py-1 rounded-full text-xs mb-4 inline-block ${
            request.requestStatus === "NEW"
              ? "bg-blue-100 text-blue-800"
              : "bg-neutral-200 text-neutral-800"
          }`}
        >
          {request.requestStatus}
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-4">
          {request.description}
        </h1>
        <div className="space-y-3 text-neutral-700 border-t border-neutral-100 pt-4">
          <p>
            <strong>School:</strong> {request.schoolName}, {request.city}
          </p>
          {request.requestType === "Tutorial" && (
            <>
              <p>
                <strong>Student Level:</strong> {request.studentLevel}
              </p>
              <p>
                <strong>Number of Students:</strong> {request.numStudents}
              </p>
            </>
          )}
          {request.requestType === "Resource" && (
            <>
              <p>
                <strong>Resource Type:</strong> {request.resourceType}
              </p>
              <p>
                <strong>Number Required:</strong> {request.numRequired}
              </p>
            </>
          )}
        </div>
      </Card>

      <Card className="mt-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          Make an Offer
        </h2>
        <form onSubmit={handleSubmitOffer}>
          <label
            htmlFor="remarks"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Remarks
          </label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Let the school know why you're a good fit. (e.g., your qualifications, availability, etc.)"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            rows="5"
            required
          ></textarea>
          <Button
            type="submit"
            className="mt-4 w-full py-3"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Offer"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default RequestDetailsPage;
