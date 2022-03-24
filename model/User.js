import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    /*the user model*/
  },
  { timestamps: true }
);

export default model("User", userSchema, "users", { overwriteModels: true });
