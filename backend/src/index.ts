import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { executeUserCrudOperations } from "./usersCrud";

dotenv.config();

const initiateDB = async () => {
  await executeUserCrudOperations();
}

initiateDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server, there is TS now... DB_URI: ${process.env.DB_URI}`);
});

type Entry = {
  date: string;
  duration: number;
  id: string;
  text?: string;
}

const exampleEntries: Entry[] = [
  {
    date: "2021-09-01",
    duration: 120,
    id: "1",
    text: "This is an example entry",
  },
  {
    date: "2021-09-02T12:00:00.000Z",
    duration: 120000,
    id: "2",
    text: "This is another example entry",
  },
]

app.get("/entries", (req: Request, res: Response) => {
  res.json(exampleEntries);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
