import express, { NextFunction, Request, Response } from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import * as dotenv from "dotenv";
import page404Handler from "./middlewares/404.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Successfully connected");
});

const app = express();

routes(app);

app.use((_, __, next) => page404Handler(next));

app.use((err: unknown, _: Request, res: Response, next: NextFunction) =>
  errorHandler(err, res, next)
);

export default app;
