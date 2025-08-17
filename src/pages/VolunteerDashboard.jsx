import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { requestService } from "../services/requestService";
import Card from "../components/Card";

const VolunteerDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(requestService.getAllNewRequests());
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Requests</h1>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <Link to={`/request/${req.requestID}`} key={req.requestID}>
              <Card className="hover:shadow-xl transition-shadow">
                <h2 className="text-xl font-bold text-blue-600">
                  {req.requestType} Request
                </h2>
                <p className="mt-2 text-gray-700">{req.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    <strong>School:</strong> {req.schoolName}
                  </p>
                  <p>
                    <strong>City:</strong> {req.city}
                  </p>
                  <p>
                    <strong>Posted:</strong>{" "}
                    {new Date(req.requestDate).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p>No new requests available at the moment.</p>
      )}
    </div>
  );
};

export default VolunteerDashboard;
