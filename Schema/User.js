import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    email: { type: String },
    friendsIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    invitationIds: [{ type: Schema.Types.ObjectId, ref: "Invitation" }],
  },
  { timestamps: true }
);

export default model("User", userSchema, "users", { overwriteModels: true });
