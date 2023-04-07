import { NextFunction } from "express";
import NotFound from "../errors/NotFound.js";

function page404Handler (next: NextFunction) {
  next(new NotFound());
}

export default page404Handler;
