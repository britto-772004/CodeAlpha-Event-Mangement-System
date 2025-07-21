import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: id,
    organisationName: "",
    eventName: "",
    eventType: "",
    date: "",
    eventMode: "",
    teamSize: "",
    description: "",
    registrationLink: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing event
  useEffect(() => {
    fetch("http://localhost:7000/events/displayEventSingle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
      .then((res) => res.json())
      .then((data) => {
        const event = data.data;
        setFormData({
          id: id, // Keep the ID
          organisationName: event.organisationName || "",
          eventName: event.eventName || "",
          eventType: event.eventType || "",
          date: event.date ? event.date.slice(0, 10) : "",
          eventMode: event.eventMode || "",
          teamSize: event.teamSize || "",
          description: event.description || "",
          registrationLink: event.registrationLink || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to fetch event");
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:7000/events/editEvent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update event");
        return res.json();
      })
      .then((data) => {
        alert("Event updated successfully!");
        navigate("/events");
      })
      .catch((err) => {
        console.error("Update Error:", err);
        setError("Error updating event");
      });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    // <div style={{ maxHeight: "90vh", width: "600px", margin: "40px auto", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", borderRadius: "8px", background: "#f9f9f9" }}>
    <div
    style={{
      maxHeight: "90vh",
      overflowY: "auto",            // ✅ Enable internal scroll
      width: "90%",                 // ✅ Responsive width
      maxWidth: "700px",            // ✅ Allow more space for form
      margin: "40px auto",
      padding: "20px",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      borderRadius: "8px",
      background: "#f9f9f9"
    }}
  >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Event</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label style={labelStyle}>Organisation Name </label>
        <input
          type="text"
          name="organisationName"
          placeholder="Organisation Name"
          value={formData.organisationName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>Event Name </label>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>Event Type</label>
        <input
          type="text"
          name="eventType"
          placeholder="Event Type"
          value={formData.eventType}
          onChange={handleChange}
          style={inputStyle}
        />
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
        />
        <label style={labelStyle}>Event Mode</label>
        <input
          type="text"
          name="eventMode"
          placeholder="Event Mode"
          value={formData.eventMode}
          onChange={handleChange}
          style={inputStyle}
        />
        <label style={labelStyle}>Team Size </label>
        <input
          type="number"
          name="teamSize"
          placeholder="Team Size"
          value={formData.teamSize}
          onChange={handleChange}
          style={inputStyle}
        />
        <label style={labelStyle}>Description </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <label style={labelStyle}>Registration Link </label>
        <input
          type="url"
          name="registrationLink"
          placeholder="Registration Link"
          value={formData.registrationLink}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Update Event
        </button>
      </form>
    </div>
  );
}

// CSS styles
const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
const labelStyle = {
  fontWeight: "bold",
  fontSize: "15px"
};

export default EditEventPage;
