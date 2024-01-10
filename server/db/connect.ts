import MongoDB, { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DB_URI || "";

const client = new MongoClient(connectionString);

let connection: MongoDB.MongoClient;

(async () => {
    try {
        console.log("Connecting to MongoDB Atlas cluster...");
        connection = await client.connect();
        console.log("Successfully connected to MongoDB Atlas!");
    } catch (e) {
        console.error("Connection to MongoDB Atlas failed!", e);
    }
})();

const getDB = () => connection.db("app");

export default getDB;
