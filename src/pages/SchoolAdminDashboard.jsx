import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import Card from "../components/Card";
import Button from "../components/Button";

const SchoolAdminDashboard = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.schoolID) {
      setRequests(requestService.getRequestsBySchoolId(currentUser.schoolID));
    }
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case "NEW":
        return "text-blue-600";
      case "PENDING":
        return "text-yellow-600";
      case "CLOSED":
        return "text-gray-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">School Dashboard</h1>
        <Link to="/school-admin/create-request">
          <Button>Create New Request</Button>
        </Link>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Your Requests</h2>
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <Link
                to={`/school-admin/review-offers/${req.requestID}`}
                key={req.requestID}
              >
                <div className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{req.description}</p>
                    <p className="text-sm text-gray-500">
                      Posted: {new Date(req.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`font-bold ${getStatusColor(req.requestStatus)}`}
                  >
                    {req.requestStatus}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>You have not created any requests yet.</p>
        )}
      </Card>
    </div>
  );
};
export default SchoolAdminDashboard;
