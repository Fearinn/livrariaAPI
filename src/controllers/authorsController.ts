import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";
import express, { NextFunction } from "express";

class AuthorController {
  static getAllAuthors = async (
    _: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const result = await authors.find();
      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  static getAuthorById = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const author = await authors.findById(id);

      if (!author) {
        next(new NotFound("author"));
        return;
      }
      response.status(200).send(author);
    } catch (err) {
      next(err);
    }
  };

  static saveAuthor = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      
      const author = new authors(request.body);

      const result = await author.save();

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  static updateAuthor = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const result = await authors.findByIdAndUpdate(id, {
        $set: request.body,
      });

      if (!result) {
        next(new NotFound("author"));
        return;
      }

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  static deleteAuthor = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const result = await authors.findByIdAndDelete(id);

      if (!result) {
        next(new NotFound("author"));
        return;
      }

      response.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };
}

export default AuthorController;
