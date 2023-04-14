import mongoose from "mongoose";

export type TAuthor = {
  id?: string;
  name: string;
  nationality?: string;
};

const authorSchema = new mongoose.Schema<TAuthor>(
  {
    id: { type: mongoose.Schema.Types.String },
    name: { type: mongoose.Schema.Types.String, required: true },
    nationality: { type: mongoose.Schema.Types.String },
  },
  { versionKey: false }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;
