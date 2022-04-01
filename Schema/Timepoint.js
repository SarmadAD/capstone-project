import { Schema, model } from "mongoose";

const timepointSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    picture: { type: String },
    date: { type: String },
    type: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Timepoint", timepointSchema, "timepoints", { overwriteModels: true });
