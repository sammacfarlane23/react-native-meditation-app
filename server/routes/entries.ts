import express from "express";
import getDB from "../db/connect";

const router = express.Router();

// Get a list of all entries
router.get("/", async (req, res) => {
  const collection = await getDB().collection("entries");
  const results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

// Add a new entry to the collection
router.post("/", async (req, res) => {
  console.log("POST /entries");
  const collection = await getDB().collection("entries");
  // @TODO: Add validation
  const newDocument = req.body;
  const result = await collection.insertOne(newDocument);
  console.log("successfully added entry to db", { result });
  res.send(result).status(204);
});

export default router;
