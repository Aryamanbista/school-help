import api from "./api";

export const requestService = {
  getAllNewRequests: async () => {
    const response = await api.get("/requests");
    return response.data;
  },

  getRequestById: async (id) => {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  },

  getRequestsBySchoolId: async () => {
    const response = await api.get("/requests/myschool");
    return response.data;
  },

  addRequest: async (requestData) => {
    const response = await api.post("/requests", requestData);
    return response.data;
  },

  // Note: The backend endpoint for this was not built, but this is how you'd call it.
  closeRequest: async (requestId) => {
    // const response = await api.put(`/requests/${requestId}/close`);
    console.warn("closeRequest API endpoint is not yet implemented.");
    return Promise.resolve(); // Return a resolved promise to avoid breaking the UI
  },
};
