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
// app.use((err, _req, res, next) => {
//   res.status(500).send("Uh oh! An unexpected error occured.")
// })

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send(
//     `Express + TypeScript Server, there is TS now... DB_URI: ${process.env.DB_URI}`
//   );
// });

// type Entry = {
//   date: string;
//   duration: number;
//   id: string;
//   text?: string;
// };

// const exampleEntries: Entry[] = [
//   {
//     date: "2021-09-02T12:00:00.000Z",
//     duration: 2304,
//     id: "1",
//     text: "This meditation sit was difficult, the mind was very agitated",
//   },
//   {
//     date: "2021-09-01T14:15:00.000Z",
//     duration: 1200,
//     id: "2",
//     text: "This meditation sit was very insightful",
//   },
// ];

// app.get("/entries", (req: Request, res: Response) => {
//   res.json(exampleEntries);
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
