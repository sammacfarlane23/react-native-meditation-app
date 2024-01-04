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


// export async function connectToCluster(uri: string) {
//   let mongoClient;

//   try {
//     mongoClient = new MongoClient(uri);
//     await mongoClient.connect();

//     return mongoClient;
//   } catch (error) {
//     process.exit();
//   }
// }

// export async function executeUserCrudOperations() {
//   const uri = process.env.DB_URI;
//   let mongoClient;

//   try {
//     mongoClient = await connectToCluster(uri!);
//     const db = mongoClient.db("app");
//     const collection = db.collection("users");

//     // console.log("CREATE user");
//     // await createEntryDocument(collection);
//     return collection;
//   } finally {
//     await mongoClient?.close();
//   }
// }

// export async function createEntryDocument(collection: MongoDB.Collection) {
//   const entryDocument = {
//     date: "2021-09-02T12:00:00.000Z",
//     duration: 1200,
//     id: "1",
//     text: "This is the entry text",
//   };

//   await collection.insertOne(entryDocument);
// }
