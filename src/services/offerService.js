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
};
