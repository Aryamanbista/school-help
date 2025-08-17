const REQUESTS_KEY = "schoolhelp_requests";

// Pre-populate with some data if it's the first time
const initializeRequests = () => {
  const requests = localStorage.getItem(REQUESTS_KEY);
  if (!requests) {
    const dummyRequests = [
      {
        requestID: 1,
        schoolID: 101,
        schoolName: "City High School",
        city: "Metroville",
        requestDate: new Date().toISOString(),
        requestStatus: "NEW",
        description: "Need volunteer tutor for Grade 10 Math.",
        requestType: "Tutorial",
        studentLevel: "Grade 10",
        numStudents: 15,
      },
      {
        requestID: 2,
        schoolID: 102,
        schoolName: "Suburb Middle School",
        city: "Suburbia",
        requestDate: new Date().toISOString(),
        requestStatus: "NEW",
        description: "Requesting 20 used laptops for our library.",
        requestType: "Resource",
        resourceType: "personal computer",
        numRequired: 20,
      },
      {
        requestID: 3,
        schoolID: 101,
        schoolName: "City High School",
        city: "Metroville",
        requestDate: new Date().toISOString(),
        requestStatus: "CLOSED",
        description: "English literature session for Grade 9.",
        requestType: "Tutorial",
        studentLevel: "Grade 9",
        numStudents: 25,
      },
    ];
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(dummyRequests));
  }
};

initializeRequests();

const getRequests = () => {
  return JSON.parse(localStorage.getItem(REQUESTS_KEY)) || [];
};

export const requestService = {
  getAllNewRequests: () => {
    const requests = getRequests();
    return requests.filter((r) => r.requestStatus === "NEW");
  },
  getRequestById: (id) => {
    const requests = getRequests();
    return requests.find((r) => r.requestID === parseInt(id));
  },
};
