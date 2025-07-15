import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetails.css";

function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  if (!event) {
    return <p style={{ textAlign: "center", color: "red" }}>No event data found.</p>;
  }

  return (
    <div className="event-details">
      <h2>{event.eventName}</h2>
      <p><strong>Organization:</strong> {event.organisationName}</p>
      <p><strong>Type:</strong> {event.eventType}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Mode:</strong> {event.eventMode}</p>
      <p><strong>Team Size:</strong> {event.teamSize}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <button className="apply-btn" onClick={() => window.open(event.registrationLink, "_blank")}>
        Apply
      </button>
      <button className="back-btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default EventDetails;
