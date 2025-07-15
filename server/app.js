const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const events = require("./routes/Events");
const { connectDB } = require("./config/db");
// create an event managing api
app.use("/events",events);

require("dotenv").config({debug:false});
const port = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


