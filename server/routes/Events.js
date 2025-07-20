const express = require("express");
const app = express.Router();


const {createEvent,displayEvent,editEvent,deleteEvent, displayEventSingle} = require("../controller/eventController");

app.post("/deleteEvent",deleteEvent);
app.post("/createEvent",createEvent);
app.put("/editEvent",editEvent);
app.get("/displayEvent",displayEvent);
app.post("/displayEventSingle",displayEventSingle);

module.exports = app;