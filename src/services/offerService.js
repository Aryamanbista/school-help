import api from "./api";

export const offerService = {
  submitOffer: async (offerData) => {
    // The frontend uses requestID, but backend expects 'request'.
    // This is a good place to map the data structure.
    const payload = {
      request: offerData.requestID,
      remarks: offerData.remarks,
    };
    const response = await api.post("/offers", payload);
    return response.data;
  },

  getOffersByRequestId: async (requestId) => {
    const response = await api.get(`/offers/request/${requestId}`);
    return response.data;
  },

  acceptOffer: async (offerId) => {
    const response = await api.put(`/offers/${offerId}/accept`);
    return response.data;
  },
};
