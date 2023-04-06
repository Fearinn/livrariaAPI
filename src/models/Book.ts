import mongoose from "mongoose";
import { TAuthor } from "./Author.js";

export type TBook = {
  id?: string;
  title: string;
  author: TAuthor;
  publisher: string;
  numberOfPages?: number;
};

const bookSchema = new mongoose.Schema<TBook>({
  id: { type: String },
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  publisher: { type: String, required: true },
  numberOfPages: { type: Number },
});

const books = mongoose.model("books", bookSchema);

export default books;
