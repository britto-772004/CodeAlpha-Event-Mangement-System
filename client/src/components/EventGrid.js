import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./EventGrid.css";
import { FaPlus } from "react-icons/fa"; // Font Awesome icon
import { useNavigate } from "react-router-dom";

function EventGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleDeleteEvent = (deletedId) => {
    setEvents((prev) => prev.filter((event) => event._id !== deletedId));
  };
  useEffect(() => {
    fetch("http://localhost:7000/events/displayEvent", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data.result); // assuming data.result is array of event objects
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading events...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="event-page-container">
      <div className="create-btn-container">
        <button className="create-event-btn" onClick={()=>{navigate("/createevent")}}>
          <FaPlus className="icon" />
          Create
        </button>
      </div>

      <div className="event-grid">
      {events.map((event) => (
      <EventCard key={event._id} event={event} onDelete={handleDeleteEvent} />
      ))}
      </div>
      
    </div>
  );
}

export default EventGrid;


