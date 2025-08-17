import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { requestService } from "../services/requestService";
import { offerService } from "../services/offerService";
import Card from "../components/Card";
import Button from "../components/Button";

const ReviewOffersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [offers, setOffers] = useState([]);
  const [acceptedOffer, setAcceptedOffer] = useState(null);

  useEffect(() => {
    const req = requestService.getRequestById(id);
    const off = offerService.getOffersByRequestId(parseInt(id));
    setRequest(req);
    setOffers(off);
    const accepted = off.find((o) => o.offerStatus === "ACCEPTED");
    if (accepted) setAcceptedOffer(accepted);
  }, [id]);

  const handleAccept = (offerId) => {
    offerService.acceptOffer(offerId);
    // Refresh data
    const off = offerService.getOffersByRequestId(parseInt(id));
    setOffers(off);
    setAcceptedOffer(off.find((o) => o.offerStatus === "ACCEPTED"));
  };

  const handleCloseRequest = () => {
    requestService.closeRequest(request.requestID);
    navigate("/school-admin/dashboard");
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h1 className="text-3xl font-bold mb-2">{request.description}</h1>
        <p>
          Status: <span className="font-semibold">{request.requestStatus}</span>
        </p>
      </Card>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">
          Received Offers ({offers.length})
        </h2>
        {offers.length > 0 ? (
          <div className="space-y-4">
            {offers.map((offer) => (
              <Card
                key={offer.offerID}
                className={`relative ${
                  offer.offerStatus === "ACCEPTED"
                    ? "border-2 border-green-500"
                    : ""
                }`}
              >
                <p className="text-gray-700">{offer.remarks}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Offered by: <strong>{offer.volunteerName}</strong>
                </p>
                <div className="absolute top-4 right-4">
                  {!acceptedOffer ? (
                    <Button onClick={() => handleAccept(offer.offerID)}>
                      Accept Offer
                    </Button>
                  ) : (
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-sm ${
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
          <p>No offers have been received for this request yet.</p>
        )}
      </div>

      {acceptedOffer && request.requestStatus !== "CLOSED" && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleCloseRequest}
            className="bg-gray-700 hover:bg-gray-800"
          >
            Close This Request
          </Button>
        </div>
      )}
    </div>
  );
};
export default ReviewOffersPage;
