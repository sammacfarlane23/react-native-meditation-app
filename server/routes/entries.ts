import express, { Request, Response } from "express";
import { validationResult, body, query, param } from "express-validator";

import getDB from "../db/connect";
import { ObjectId } from "mongodb";

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
      console.log("successfully added entry to db", { result });
      return res.send(result).status(204);
    }
    res.status(400).send({ errors: errors.array() });
  }
);

// Delete an entry from the collection
router.delete(
  "/:id",
  // @TODO: Get this working...
  [param("id", "id must be a valid ObjectId").custom((input) => console.log({input})).isMongoId()],
  async (req: Request, res: Response) => {
    const collection = getDB().collection("posts");
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      let result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      return res.send(result).status(200);
    }

    res.status(400).send({ errors: errors.array() });
  }
);

export default router;
