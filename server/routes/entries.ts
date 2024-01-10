import express, { Request, Response } from "express";
import { validationResult, body, param } from "express-validator";
import { ObjectId } from "mongodb";

import getDB from "../db/connect";

const router = express.Router();

// Get a list of all entries
router.get("/", async (req, res) => {
  const collection = await getDB().collection("entries");
  const results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

// Add a new entry to the collection
router.post(
  "/",
  [
    body("text", "Text must be string").optional().isString(),
    body("duration", "Duration is required and must be numeric").isNumeric(),
    body("date", "Date must be a valid date").isISO8601(),
  ],
  async (req: Request, res: Response) => {
    const collection = await getDB().collection("entries");
    const errors = validationResult(req);
    const { text, duration, date } = req.body;

    if (errors.isEmpty()) {
      const newDocument = { text, duration, date };
      const result = await collection.insertOne(newDocument);
      return res.send(result).status(204);
    }
    res.status(400).send({ errors: errors.array() });
  }
);

// Delete an entry from the collection
router.delete(
  "/:id",
  [param("id", "id must be a valid ObjectId").isMongoId()],
  async (req: Request, res: Response) => {
    const collection = getDB().collection("entries");
    const errors = validationResult(req);

    const query = { _id: new ObjectId(req.params.id) };

    if (errors.isEmpty()) {
      const result = await collection.deleteOne(query);
      let message;
      if (result.deletedCount === 1) {
        message = "Successfully deleted one document.";
      } else {
        message = `No documents matched the id: ${req.params.id}. Deleted 0 documents.`;
      }
      return res.send({ status: message }).status(200);
    }

    res.status(400).send({ errors: errors.array() });
  }
);

// Update an entry in the collection
router.put(
  "/:id",
  [
    param("id", "id must be a valid ObjectId").isMongoId(),
    body("text", "Text must be string").isString(),
  ],
  async (req: Request, res: Response) => {
    const collection = getDB().collection("entries");
    const errors = validationResult(req);

    const query = { _id: new ObjectId(req.params.id) };
    const update = { $set: { ...req.body } };

    if (errors.isEmpty()) {
      const result = await collection.updateOne(query, update);
      let message;
      if (result.modifiedCount === 1) {
        message = "Successfully updated one document.";
      } else {
        message = `No documents matched the id: ${req.params.id}. Updated 0 documents.`;
      }
      return res.send({ status: message }).status(200);
    }

    res.status(400).send({ errors: errors.array() });
  }
);

// Get a single entry from the collection
router.get(
  "/:id",
  [param("id", "id must be a valid ObjectId").isMongoId()],
  async (req: Request, res: Response) => {
    const collection = getDB().collection("entries");
    const errors = validationResult(req);

    const query = { _id: new ObjectId(req.params.id) };

    if (errors.isEmpty()) {
      const result = await collection.findOne(query);
      return res.send(result).status(200);
    }

    res.status(400).send({ errors: errors.array() });
  }
);

export default router;
