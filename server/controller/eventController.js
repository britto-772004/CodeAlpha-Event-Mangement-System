const {  getDB } = require("../config/db");
const {ObjectId} = require("mongodb");

const createEvent = async(req , res)=>{
    try{
        console.log("HI from create event");
        const db= await getDB();

        const connection = await db.collection('Events');
        console.log("Before input ");
        const {organisationName,eventName,eventType,date,eventMode,teamSize,description,registrationLink } = req.body;
        console.log("after input ");
        let data = {
            organisationName : organisationName,
            eventName : eventName,
            eventType : eventType,
            date : date,
            eventMode : eventMode,
            teamSize : teamSize,
            description : description,
            registrationLink : registrationLink,
            createdAt : new Date()
        }

        await connection.insertOne(data);

        res.status(201).json({
            message: "successfully inserted into the events collection"
        })
    }
    catch(err){
        console.log("error :",err);
        res.json({
            message:err
        })
    }

}

const displayEvent = async(req , res)=>{
    console.log("Hi from display event");
    try{
        const db = await getDB();
        const connection = db.collection("Events");

        const result = await connection.find().sort({date:1}).toArray();

        res.status(200).json({
            message : "Fetched all the data from the database",
            result : result
        })
    }
    catch(err){
        res.json({
            message : "Error while fetching the data from the database",
            error : err
        })
    }
}

const displayEventSingle = async(req , res)=>{
    // console.log("Hi from display event");
    try{
        const db = await getDB();
        const connection = db.collection("Events");
        const {id} = req.body;
        const event = await connection.findOne({ _id: new ObjectId(id) });

        res.status(200).json({
            message : "Fetched all the data from the database",
            data : event
        })
    }
    catch(err){
        console.log("Error  : ",err);
        res.json({
            message : "Error while fetching the data from the database",
            error : err
        })
    }
}
const editEvent = async(req , res)=>{
    console.log("Hi from edit event");

    try{
        const db = await getDB();
        const connection = await db.collection("Events");
        const {id,organisationName,eventName , eventType, date, eventMode,teamSize, description,registrationLink } = req.body;
        
        const updateddata ={
            organisationName : organisationName,
            eventName : eventName,
            eventType : eventType,
            date : date,
            eventMode : eventMode,
            teamSize : teamSize,
            description : description,
            registrationLink : registrationLink,
            createdAt : new Date()
        }

        const result = await connection.updateOne(
            { _id: new ObjectId(id) },  // Filter
            { $set: updateddata }        // Update
        );

        if (result.modifiedCount == 0) {
            return res.status(404).json({ message: "No matching document found to update." });
        }
        res.status(200).json({
            message: "Event updated successfully",
            result
        });

    }
    catch(err){
        console.log("Error : ",err);
        res.json({
            message:"error",
            error : err
        })
    }
}

const deleteEvent = async(req ,res)=>{
    console.log("Hi from the delete event");
    try {
        const db = await getDB();
        const collection = db.collection("Events");

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Event ID is required for deletion" });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No event found with the given ID" });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            result
        });

    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({
            message: "Failed to delete event",
            error: err.message
        });
    }
}

module.exports = {createEvent,displayEvent,editEvent,deleteEvent,displayEventSingle};