import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaArrowLeft } from "react-icons/fa";

const ReviewOffersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const requestRes = await api.get(`/requests/${id}`);
      const offersRes = await api.get(`/offers/request/${id}`);
      setRequest(requestRes.data);
      setOffers(offersRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Could not load data for this request.");
      navigate("/school-admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, navigate]);

  const handleAccept = async (offerId) => {
    try {
      await api.put(`/offers/${offerId}/accept`);
      toast.success("Offer has been accepted!");
      fetchData(); // Refresh data to show updated statuses
    } catch (error) {
      console.error("Failed to accept offer", error);
      toast.error("Failed to accept the offer.");
    }
  };

  // Note: The logic for closing a request is missing from the backend controller/routes.
  // This would be the next feature to add to the API.
  const handleCloseRequest = () => {
    toast.error("Close request functionality not yet implemented in API.");
    // Example of future API call: await api.put(`/requests/${id}/close`);
  };

  const handleGoBack = () => navigate(-1);
  const hasAcceptedOffer = offers.some((o) => o.offerStatus === "ACCEPTED");
  if (loading) return <LoadingSpinner />;
  if (!request) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <Card className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">
          {request.description}
        </h1>
        <p>
          Status:{" "}
          <span className="font-semibold ml-2">{request.requestStatus}</span>
        </p>
      </Card>
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          Received Offers ({offers.length})
        </h2>
        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer) => (
              <Card
                key={offer._id}
                className={`relative transition-all ${
                  offer.offerStatus === "ACCEPTED"
                    ? "border-2 border-green-500 bg-green-50"
                    : ""
                }`}
              >
                <p className="text-neutral-700 pr-28">{offer.remarks}</p>
                <p className="text-sm text-neutral-500 mt-2">
                  Offered by: <strong>{offer.volunteer.fullname}</strong> (
                  {offer.volunteer.occupation})
                </p>
                <div className="absolute top-4 right-4">
                  {!hasAcceptedOffer && (
                    <Button onClick={() => handleAccept(offer._id)}>
                      Accept
                    </Button>
                  )}
                  {hasAcceptedOffer && (
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-xs ${
                        offer.offerStatus === "ACCEPTED"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {offer.offerStatus}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 py-8">
            No offers have been received for this request yet.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewOffersPage;
