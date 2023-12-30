import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server, there is TS now...");
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
  }
]

app.get("/entries", (req: Request, res: Response) => {
  res.json(exampleEntries);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
