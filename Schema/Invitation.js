import { Schema, model } from "mongoose";

const invitationSchema = new Schema(
  {
    requestingUserId: { type: Schema.Types.ObjectId, ref: "User" },
    requestedUserId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String }, 
  },
  { timestamps: true }
);

export default model("Invitation", invitationSchema, "invitation", { overwriteModels: true });
