import authors, { TAuthor } from "../models/Author.js";
import express from "express";
import mongoose, { CallbackError } from "mongoose";

class AuthorController {
  static getAllAuthors = (_: express.Request, response: express.Response) => {
    authors.find((_, authors) => {
      response.status(200).json(authors);
    });
  };

  static getAuthorById = (
    request: express.Request,
    response: express.Response
  ) => {
    const { id } = request.params;
    authors.findById(id, (error: CallbackError, author: TAuthor) => {
      if (error) {
        response.status(500).send({
          message: `${error.message} [The author couldn't be fetched]`,
        });
      } else if (!author) {
        response
          .status(400)
          .send({ message: `No author with the given id was found` });
      } else {
        response.status(200).send(author);
      }
    });
  };

  static saveAuthor = (
    request: express.Request,
    response: express.Response
  ) => {
    const author = new authors(request.body);
    author.save((error) => {
      if (error) {
        response
          .status(500)
          .send({ message: `${error.message} [Failed to save the author]` });
      } else {
        response.status(200).send("Author successfully saved");
      }
    });
  };

  static updateAuthor = (
    request: express.Request,
    response: express.Response
  ) => {
    const { id } = request.params;

    authors.findByIdAndUpdate(
      id,
      { $set: request.body },
      (error: CallbackError) => {
        if (!error) {
          response.status(200).send({ message: "Author successfully updated" });
        } else {
          response
            .status(200)
            .send({ message: `${error.message} [author id not found]` });
        }
      }
    );
  };

  static deleteAuthor = (
    request: express.Request,
    response: express.Response
  ) => {
    const { id } = request.params;

    authors.findByIdAndDelete(id, (error: CallbackError) => {
      if (!error) {
        response.status(200).send({ message: "author successfully deleted" });
      } else {
        response.status(500).send({
          message: `${error.message} [The author couldn't be deleted]`,
        });
      }
    });
  };
}

export default AuthorController;
