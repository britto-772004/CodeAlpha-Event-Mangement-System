import React, { useState } from "react";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";

function CreateEvent() {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organisationName: "",
    eventName: "",
    eventType: "",
    date: "",
    eventMode: "",
    teamSize: "",
    description: "",
    registrationLink: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can send this to your backend API here
    fetch("http://localhost:7000/events/createEvent",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(formData)

        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to create event");
            return response.json();
          })
          .then((data) => {
            // console.log("Event created:", data);
            // Optionally redirect or clear form
            navigate("/events");
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Organisation Name</label>
          <input
            type="text"
            name="organisationName"
            value={formData.organisationName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Event Type</label>
          <input
            type="text"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Event Mode</label>
          <input
            type="text"
            name="eventMode"
            value={formData.eventMode}
            onChange={handleChange}
            placeholder="Online / Offline"
            required
          />
        </div>

        <div className="form-group">
          <label>Team Size</label>
          <input
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Registration Link</label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
