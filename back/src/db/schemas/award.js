import { Schema, model } from "mongoose";

const Award = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    authority: {
      type: String, //발급기관
      required: true,
    },
    when_date: {
      type: String ,
      required: false,
      default: "0000.00.00"
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
