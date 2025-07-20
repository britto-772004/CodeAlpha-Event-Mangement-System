import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="landing-content">
          <h1 className="fade-in delay-1">Welcome to EventHub</h1>
          <p className="fade-in delay-2">Your Ultimate Event Management Platform</p>
          <p className="fade-in delay-3">
            Discover, Join, and Manage events effortlessly.
          </p>
          <p className="fade-in delay-4">
            Unleash your potential through competitions, hackathons, tech fests, and more.
          </p>
          <button className="get-started-btn fade-in delay-5">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
