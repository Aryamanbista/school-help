import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { requestService } from "../services/requestService";
import { offerService } from "../services/offerService";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaArrowLeft } from "react-icons/fa";

const ReviewOffersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [offers, setOffers] = useState([]);

  // A consolidated function to refresh data from services
  const fetchData = () => {
    const requestId = parseInt(id);
    const req = requestService.getRequestById(requestId);
    if (req) {
      const off = offerService.getOffersByRequestId(requestId);
      setRequest(req);
      setOffers(off);
    } else {
      toast.error("Request not found.");
      navigate("/school-admin/dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, navigate]);

  const handleAccept = (offerId) => {
    offerService.acceptOffer(offerId);
    toast.success("Offer has been accepted!");
    fetchData(); // Refresh data to show updated statuses
  };

  const handleCloseRequest = () => {
    requestService.closeRequest(request.requestID);
    toast.success("Request has been closed.");
    navigate("/school-admin/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const hasAcceptedOffer = offers.some((o) => o.offerStatus === "ACCEPTED");

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
          <span>Back to Dashboard</span>
        </button>
      </div>
      {/* --- End of Back Button --- */}

      <Card className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">
          {request.description}
        </h1>
        <p>
          Status:
          <span
            className={`font-semibold ml-2 ${
              request.requestStatus === "NEW"
                ? "text-blue-600"
                : request.requestStatus === "PENDING"
                ? "text-yellow-600"
                : "text-neutral-500"
            }`}
          >
            {request.requestStatus}
          </span>
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
                key={offer.offerID}
                className={`relative transition-all ${
                  offer.offerStatus === "ACCEPTED"
                    ? "border-2 border-green-500 bg-green-50"
                    : offer.offerStatus === "REJECTED"
                    ? "opacity-60"
                    : ""
                }`}
              >
                <p className="text-neutral-700 pr-28">{offer.remarks}</p>
                <p className="text-sm text-neutral-500 mt-2">
                  Offered by: <strong>{offer.volunteerName}</strong>
                </p>
                <div className="absolute top-4 right-4">
                  {!hasAcceptedOffer ? (
                    <Button onClick={() => handleAccept(offer.offerID)}>
                      Accept Offer
                    </Button>
                  ) : (
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-xs ${
                        offer.offerStatus === "ACCEPTED"
                          ? "bg-green-200 text-green-800"
                          : offer.offerStatus === "REJECTED"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
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

      {hasAcceptedOffer && request.requestStatus !== "CLOSED" && (
        <Card className="mt-8 text-center">
          <p className="text-neutral-600 mb-3">
            This request is now fulfilled. You can close it to remove it from
            the active list.
          </p>
          <Button
            onClick={handleCloseRequest}
            className="bg-neutral-700 hover:bg-neutral-800"
          >
            Close This Request
          </Button>
        </Card>
      )}
    </motion.div>
  );
};

export default ReviewOffersPage;
