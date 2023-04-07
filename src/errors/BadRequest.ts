import { Response } from "express";
import BaseError from "./BaseError.js";

class BadRequest extends BaseError {
  constructor(message = "Invalid data was provided") {
    super(message, 400);
  }
}

export default BadRequest;
