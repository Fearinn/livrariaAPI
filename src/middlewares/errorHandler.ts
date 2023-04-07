import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import BadRequest from "../errors/BadRequest.js";
import BadValidation from "../errors/BadValidation.js";
import BaseError from "../errors/BaseError.js";
import NotFound from "../errors/NotFound.js";

function errorHandler(err: unknown, response: Response, next: NextFunction) {
  if (err instanceof mongoose.Error.CastError) {
    new BadRequest().send(response);
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    new BadValidation().send(response);
  }

  if (err instanceof NotFound) {
    err.send(response);
  }

  new BaseError().send(response);
}

export default errorHandler