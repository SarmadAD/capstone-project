import { Key } from "react";

export type TimepointModel = {
  _id: Key;
  title: String;
  content: String;
  date: String;
  picture: { url: String, publicId: String},
  visible: Boolean;
  type: String;
  userId: String;
};
