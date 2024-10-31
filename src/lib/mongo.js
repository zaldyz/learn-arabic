import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("MongoDB URI not in environment, place it in a .env file at the root of the project"); 
}

let clientInstance;

try {
  let client = new MongoClient(uri, options);

  if (process.env.NODE_ENV !== 'production') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientInstance = global._mongoClientPromise;
  } else {
    clientInstance = client.connect();
  }
} catch {
  throw new Error("Error connecting to cluster");
}

export const closeMongoClient = async () => {
  try {
    const conn = await clientInstance;
    await conn.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
}

export default clientInstance;