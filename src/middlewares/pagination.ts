import express from "express";
import BadRequest from "../errors/BadRequest.js";
import { TQueryRequest } from "../controllers/booksController.js";
import BaseError from "../errors/BaseError.js";

async function pagination(
  request: TQueryRequest,
  response: express.Response,
  next: express.NextFunction
) {
  try {
    const query = request.data;

    const {
      limit = 5,
      page = 1,
      sortingField = "_id",
      order = 1,
    } = request.query;
    const parsedLimit = Number(limit) || 5;
    const parsedPage = Number(page) || 1;

    if (!query) {
      throw new BaseError();
    }

    if (
      (parsedLimit < 0 && parsedPage < 0) ||
      typeof sortingField !== "string" ||
      typeof order !== "number"
    ) {
      throw new BadRequest();
    }

    const results = await query
      .sort({ [sortingField]: order })
      .skip(parsedLimit * (parsedPage - 1))
      .limit(parsedLimit)
      .populate("author")
      .exec();
    response.status(200).json(results);
  } catch (err) {
    next(err);
  }
}

export default pagination;
