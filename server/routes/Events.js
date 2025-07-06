const express = require("express");
const app = express.Router();


const {createEvent,displayEvent,editEvent,deleteEvent} = require("../controller/eventController");

app.post("/deleteEvent",deleteEvent);
app.post("/createEvent",createEvent);
app.post("/editEvent",editEvent);
app.get("/displayEvent",displayEvent);

module.exports = app;