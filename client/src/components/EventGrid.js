import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./EventGrid.css";

function EventGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:7000/events/displayEvent",{method:"GET"})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data.result); // assuming `data` is an array of event objects
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
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventGrid;
