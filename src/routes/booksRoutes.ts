import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BookController.getAllBooks)
  .get("/books/query", BookController.getBookByFilter)
  .get("/books/:id", BookController.getBookById)
  .post("/books", BookController.saveBook)
  .put("/books/:id", BookController.updateBook)
  .delete("/books/:id", BookController.deleteBook);

export default router;
