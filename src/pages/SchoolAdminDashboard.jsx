import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// We would need to expand our services to manage requests and offers from an admin's perspective
// For this example, we'll just display info. A full implementation would require more service functions.

// Mock function - in a real app, this would come from a service
const getSchoolRequests = (schoolId) => {
  // This is a placeholder. You'd filter requests from requestService here.
  console.log(`Fetching requests for school ID: ${schoolId}`);
  return [
    {
      requestID: 1,
      description: "Need volunteer tutor for Grade 10 Math.",
      requestStatus: "NEW",
      offers: 2,
    },
    {
      requestID: 3,
      description: "English literature session for Grade 9.",
      requestStatus: "CLOSED",
      offers: 1,
    },
  ];
};

const SchoolAdminDashboard = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Assuming the school admin user object has a schoolID
    if (currentUser && currentUser.schoolID) {
      setRequests(getSchoolRequests(currentUser.schoolID));
    }
  }, [currentUser]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">School Dashboard</h1>
        {/* A button to open a 'New Request' modal would go here */}
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Your Requests</h2>
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.requestID}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{req.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {req.requestStatus} | Offers: {req.offers}
                </p>
              </div>
              {/* A button to 'View Offers' would navigate to a review page */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SchoolAdminDashboard;
