const { MongoClient } = require('mongodb');

// Connection URI (from .env or hardcoded)
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'EventManagement'; // Your database name

let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error('Database not connected!');
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = { connectDB, getDB, closeDB };