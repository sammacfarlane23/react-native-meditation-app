import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import entries from "./routes/entries";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app: Express = express();

app.use(cors());
app.use(express.json());


// Load the /posts routes
app.use("/entries", entries);

// Global error handling
app.use((err, req: Request, res: Response) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
