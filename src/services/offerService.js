const OFFERS_KEY = "schoolhelp_offers";

const getOffers = () => {
  const offers = localStorage.getItem(OFFERS_KEY);
  return offers ? JSON.parse(offers) : [];
};

const saveOffers = (offers) => {
  localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));
};

export const offerService = {
  submitOffer: (offerData) => {
    const offers = getOffers();
    const newOffer = {
      offerID: new Date().getTime(), // Simple unique ID
      ...offerData,
      offerDate: new Date().toISOString(),
      offerStatus: "PENDING",
    };
    offers.push(newOffer);
    saveOffers(offers);
    return newOffer;
  },
  getOffersByRequestId: (requestId) => {
    const offers = getOffers();
    return offers.filter((o) => o.requestID === requestId);
  },
  acceptOffer: (offerId) => {
    const offers = getOffers();
    const offerIndex = offers.findIndex((o) => o.offerID === offerId);
    if (offerIndex !== -1) {
      // Set this offer to ACCEPTED
      offers[offerIndex].offerStatus = "ACCEPTED";

      // Set all other offers for this request to REJECTED
      const requestId = offers[offerIndex].requestID;
      offers.forEach((offer, index) => {
        if (offer.requestID === requestId && offer.offerID !== offerId) {
          offers[index].offerStatus = "REJECTED";
        }
      });

      saveOffers(offers);

      // Also update the request status
      // In a real app, this would be a transaction. Here we call the other service.
      const requests = JSON.parse(localStorage.getItem("schoolhelp_requests"));
      const requestIndex = requests.findIndex((r) => r.requestID === requestId);
      if (requestIndex !== -1) {
        requests[requestIndex].requestStatus = "PENDING"; // Or 'IN PROGRESS'
        localStorage.setItem("schoolhelp_requests", JSON.stringify(requests));
      }
    }
  },
};
