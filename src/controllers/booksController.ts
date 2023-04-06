import { CallbackError } from "mongoose";
import books, { TBook } from "../models/Book.js";
import express from "express";

class BookController {
  static getAllBooks = (_: express.Request, response: express.Response) => {
    books
      .find()
      .populate("author")
      .exec((_, books) => {
        response.status(200).json(books);
      });
  };

  static getBookById = (
    request: express.Request,
    response: express.Response
  ) => {
    const { id } = request.params;
    books
      .findById(id)
      .populate("author", "name")
      .exec((error, book) => {
        if (error) {
          response.status(500).send({
            message: `${error.message} [The book couldn't be fetched]`,
          });
        } else if (!book) {
          response
            .status(400)
            .send({ message: `No book with the given id was found` });
        } else {
          response.status(200).send(book);
        }
      });
  };

  static saveBook = (request: express.Request, response: express.Response) => {
    const book = new books(request.body);
    book.save((error: CallbackError) => {
      if (error) {
        response
          .status(500)
          .send({ message: `${error.message} [Failed to save the book]` });
      } else {
        response.status(200).send("Book successfully saved");
      }
    });
  };

  static updateBook = (
    request: express.Request,
    response: express.Response
  ) => {
    const { id } = request.params;

    books.findByIdAndUpdate(
      id,
      { $set: request.body },
      (error: CallbackError) => {
        if (!error) {
          response.status(200).send({ message: "Book successfully updated" });
        } else {
          response
            .status(200)
            .send({ message: `${error.message} [Book id not found]` });
        }
      }
    );
  };

  static deleteBook = (
    request: express.Request,
    response: express.Response
  ) => {
    const { id } = request.params;

    books.findByIdAndDelete(id, (error: CallbackError, book: TBook) => {
      if (!error) {
        response.status(200).send({ message: "Book successfully deleted" });
      } else {
        response
          .status(500)
          .send({ message: `${error.message} [The book couldn't be deleted]` });
      }
    });
  };

  static getBookByPublisher = (
    request: express.Request,
    response: express.Response
  ) => {
    const { publisher } = request.query;

    books.find({ publisher: publisher }, {}, (error, books) => {
      if (error) {
        response.status(500).send(error.message);
      } else if (!books.length) {
        response.status(400).send("No book from the given publisher was found");
      } else {
        response.status(200).send(books);
      }
    });
  };
}

export default BookController;
