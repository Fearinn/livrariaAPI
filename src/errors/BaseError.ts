import { Response } from "express";

class BaseError extends Error {
  message: string;
  status: number;
  constructor(message = "Internal server error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  send = (response: Response) => {
    response.status(this.status).send({message: this.message, status: this.status});
  };
}

export default BaseError;
