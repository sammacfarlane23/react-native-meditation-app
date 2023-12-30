import MongoDB, { MongoClient } from "mongodb";

export async function connectToCluster(uri: string) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function executeUserCrudOperations() {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri!);
    const db = mongoClient.db("app");
    const collection = db.collection("users");

    console.log("CREATE user");
    await createUserDocument(collection);
  } finally {
    await mongoClient?.close();
  }
}

export async function createUserDocument(collection: MongoDB.Collection) {
  const userDocument = {
    name: "John Smith",
    birthdate: new Date(2000, 11, 20),
    address: { street: "Pike Lane", city: "Los Angeles", state: "CA" },
  };

  await collection.insertOne(userDocument);
}
