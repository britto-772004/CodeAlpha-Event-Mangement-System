import React from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/event/${event._id}`, { state: event });
  };

  return (
    <div className="event-card">
      <h3>{event.eventName}</h3>
      <p><strong>College:</strong> {event.organisationName}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <button className="cta-btn" onClick={handleViewDetails}>
        View Details
      </button>
    </div>
  );
}

export default EventCard;
