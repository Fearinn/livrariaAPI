import express, { NextFunction } from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import * as dotenv from "dotenv";

dotenv.config();

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Successfully connected");
});

const app = express();

routes(app);

export default app;
