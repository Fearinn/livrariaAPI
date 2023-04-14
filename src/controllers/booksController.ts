import { FilterQuery, Query, Document, Types } from "mongoose";
import NotFound from "../errors/NotFound.js";
import books, { TBook } from "../models/Book.js";
import express, { NextFunction } from "express";
import authors from "../models/Author.js";
import BadRequest from "../errors/BadRequest.js";

export type TQueryRequest<DocType = unknown> = {
  data?: Query<
    (Document<unknown, any, DocType> &
      Omit<
        DocType & {
          _id: Types.ObjectId;
        },
        never
      >)[],
    Document<unknown, any, DocType> &
      Omit<
        DocType & {
          _id: Types.ObjectId;
        },
        never
      >,
    {},
    DocType
  >;
} & express.Request;

class BookController {
  static getAllBooks = async (
    request: TQueryRequest<TBook>,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      request.data = books.find();
      next();
    } catch (err) {
      next(err);
    }
  };

  static getBookById = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const book = await books.findById(id).populate("author", "name").exec();

      if (!book) {
        next(new NotFound("book"));
        return;
      }

      response.status(200).send(book);
    } catch (err) {
      next(err);
    }
  };

  static saveBook = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const book = new books(request.body);
      const result = await book.save();

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  static updateBook = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
    } catch (err) {
      next(err);
    }
    const { id } = request.params;
    const result = await books.findByIdAndUpdate(id, { $set: request.body });

    if (!result) {
      next(new NotFound("book"));
      return;
    }

    response.status(200).send(result);
  };

  static deleteBook = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
    } catch (err) {
      next(err);
    }
    const { id } = request.params;
    const result = await books.findByIdAndDelete(id);

    if (!result) {
      next(new NotFound("book"));

      return;
    }
    response.status(200).send(result);
  };

  static getBookByFilter = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const { publisher, title, minPages, maxPages, authorName } =
        request.query;

      const query: FilterQuery<TBook> = {};

      if (publisher) query.publisher = publisher;
      if (title) query.title = { $regex: title, $options: "i" };
      if (minPages) query.numberOfPages = { $gte: minPages };
      if (maxPages)
        query.numberOfPages = { ...query.numberOfPages, $lte: maxPages };

      if (authorName) {
        console.log(authorName);
        const author = await authors.findOne({ name: authorName });
        console.log(author);
        if (author) {
          query.author = author._id;
        } else {
          query.author = null;
        }
      }

      const result = await books.find({ ...query }).populate("author", "name");

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;
