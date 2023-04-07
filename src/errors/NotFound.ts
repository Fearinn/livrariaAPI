import { Response } from "express";
import BaseError from "./BaseError.js";

class NotFound extends BaseError {
  constructor(item = "page", message?: string) {
    super(message || `${item} not found`, 404);
  }
}

export default NotFound;
