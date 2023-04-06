import mongoose from "mongoose";

export type TAuthor = {
  id?: string;
  name: string;
  nationality?: string;
};

const authorSchema = new mongoose.Schema<TAuthor>(
  {
    id: { type: String },
    name: { type: String, required: true },
    nationality: { type: String },
  },
  { versionKey: false }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;
