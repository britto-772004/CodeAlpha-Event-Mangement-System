import React, { useEffect, useState } from 'react';

function EditEvent({ eventId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    organisationName: '',
    eventName: '',
    eventType: '',
    date: '',
    eventMode: '',
    teamSize: '',
    description: '',
    registrationLink: '',
  });

  useEffect(() => {
    fetch(`http://localhost:7000/events/displayEventSingle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: eventId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          organisationName: data.organisationName || '',
          eventName: data.eventName || '',
          eventType: data.eventType || '',
          date: data.date  || '',
          eventMode: data.eventMode || '',
          teamSize: data.teamSize || '',
          description: data.description || '',
          registrationLink: data.registrationLink || '',
        });
      })
      .catch((err) => console.error('Error fetching event data:', err));
  }, [eventId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { id: eventId, ...formData };

    try {
      const response = await fetch('http://localhost:7000/events/editEvent', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event updated successfully');
        if (onUpdate) onUpdate(); // Refresh parent list
        if (onClose) onClose();   // Close modal or form
      } else {
        alert('Update failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="organisationName" placeholder="Organisation Name" value={formData.organisationName} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="eventMode" placeholder="Event Mode" value={formData.eventMode} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="teamSize" placeholder="Team Size" value={formData.teamSize} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="registrationLink" placeholder="Registration Link" value={formData.registrationLink} onChange={handleChange} className="w-full border p-2 rounded" />
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
}

export default EditEvent;
