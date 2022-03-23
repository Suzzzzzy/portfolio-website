import { Schema, model } from "mongoose";

const ProgrammingLanguage_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    proficiency: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProgrammingLanguage_Model = model("ProgrammingLanguage", ProgrammingLanguage_Schema);

export { ProgrammingLanguage_Model };
