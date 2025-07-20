import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventGrid from "./components/EventGrid";
import EventDetails from "./components/EventDetails";
import "./App.css";
import LandingPage from "./components/LandingPage";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/events" element={<EventGrid />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/createevent" element={<CreateEvent />}/>
        <Route path="/updateevent/:id" element={<EditEvent />}/>
      </Routes>
    </Router>
  );
}

export default App;
