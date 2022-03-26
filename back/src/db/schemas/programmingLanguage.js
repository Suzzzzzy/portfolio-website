import { Schema, model } from "mongoose";

const ProgrammingLanguage_Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: { 
      type: String, 
      required: true
    },
    position: {
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
