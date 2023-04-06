import books from "../models/Book.js";
import express, { NextFunction } from "express";

class BookController {
  static getAllBooks = async (
    _: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const book = await books.find().populate("author").exec();
      response.status(200).json(book);
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
    response.status(200).send(result);
  };

  static getBookByPublisher = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const { publisher } = request.query;
      const result = await books.find({ publisher: publisher });

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;
