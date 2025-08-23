import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api"; // Use our central api client
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaArrowLeft } from "react-icons/fa";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const { data } = await api.get(`/requests/${id}`);
        setRequest(data);
      } catch (error) {
        console.error("Failed to fetch request details", error);
        toast.error("Could not find the requested item.");
        navigate("/volunteer/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, navigate]);

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const offerData = {
        request: request._id, // The backend needs the request ID
        remarks,
      };
      await api.post("/offers", offerData);
      toast.success("Your offer has been submitted successfully!");
      navigate("/volunteer/dashboard");
    } catch (error) {
      console.error("Failed to submit offer", error);
      const message =
        error.response?.data?.message || "Failed to submit offer.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoBack = () => navigate(-1);

  if (loading) return <LoadingSpinner />;
  if (!request) return null; // Or a "Not Found" message

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Requests</span>
        </button>
      </div>

      <Card>
        <span
          className={`font-semibold px-3 py-1 rounded-full text-xs mb-4 inline-block bg-blue-100 text-blue-800`}
        >
          {request.requestStatus}
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-4">
          {request.description}
        </h1>
        <div className="space-y-3 text-neutral-700 border-t border-neutral-100 pt-4">
          <p>
            <strong>School:</strong> {request.school.schoolName},{" "}
            {request.school.city}
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
          />
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
