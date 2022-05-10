import { Schema, model } from "mongoose";

const timepointSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    picture: { url: String, publicId: String},
    date: { type: String },
    type: { type: String },
    visible: { type: Boolean },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Timepoint", timepointSchema, "timepoints", { overwriteModels: true });
