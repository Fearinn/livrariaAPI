import express, { NextFunction, Request, Response } from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import * as dotenv from "dotenv";
import mongoose, { MongooseError, mongo } from "mongoose";

dotenv.config();

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Successfully connected");
});

const app = express();

routes(app);

app.use(
  (err: unknown, _: Request, response: Response, next: NextFunction) => {
    if (err instanceof mongoose.Error.CastError) {
      response.status(400).send({ message: err.message });
      return;
    }

    response.status(500).send({ message: "Internal server error" });
  }
);

export default app;
