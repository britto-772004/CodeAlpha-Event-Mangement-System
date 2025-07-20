import React, { useState } from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleViewDetails = () => {
    navigate(`/event/${event._id}`, { state: event });
  };

  const handleEdit = () => {
    navigate(`/updateevent/${event._id}`, { state: event });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:7000/events/deleteEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event._id }),
      });

      const data = await response.json();
      if (response.ok) {
        onDelete(event._id); // remove from UI
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      alert("Error deleting event");
    }
  };

  return (
    <div className="event-card">
      <div className="menu-wrapper">
        <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>⋮</div>
        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>

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
