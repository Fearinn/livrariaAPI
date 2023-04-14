import mongoose from "mongoose";

const regex = new RegExp(/(?<!.)\s+(?!.)/, "i");

mongoose.Schema.Types.String.set("validate", {
  validator: (value: string) => {
    if (regex.test(value) || !value) return false;
    console.log("passou");
    return true;
  },
});
