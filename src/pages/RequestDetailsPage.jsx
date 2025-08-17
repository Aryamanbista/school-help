import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { requestService } from "../services/requestService";
import { offerService } from "../services/offerService";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [request, setRequest] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const req = requestService.getRequestById(id);
    setRequest(req);
  }, [id]);

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== "Volunteer") {
      alert("Only volunteers can make offers.");
      return;
    }
    const offerData = {
      requestID: request.requestID,
      volunteerID: currentUser.username, // Using username as ID for simplicity
      volunteerName: currentUser.fullname,
      remarks,
    };
    offerService.submitOffer(offerData);
    alert("Your offer has been submitted!");
    navigate("/volunteer/dashboard");
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <h1 className="text-3xl font-bold mb-4">
          {request.requestType}: {request.description}
        </h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>School:</strong> {request.schoolName}, {request.city}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="font-semibold text-green-600">
              {request.requestStatus}
            </span>
          </p>
          {request.requestType === "Tutorial" && (
            <>
              <p>
                <strong>Student Level:</strong> {request.studentLevel}
              </p>
              <p>
                <strong>Number of Students:</strong> {request.numStudents}
              </p>
            </>
          )}
          {request.requestType === "Resource" && (
            <>
              <p>
                <strong>Resource Type:</strong> {request.resourceType}
              </p>
              <p>
                <strong>Number Required:</strong> {request.numRequired}
              </p>
            </>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Submit an Offer</h2>
        <form onSubmit={handleSubmitOffer}>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter any remarks (e.g., your qualifications, availability, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="4"
            required
          ></textarea>
          <Button type="submit" className="mt-4">
            Submit Offer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RequestDetailsPage;
