import { Key } from "react";

export type TimepointModel = {
  _id: Key;
  title: String;
  content: String;
  date: String;
  picture: String;
  visible: Boolean;
  type: String;
  userId: String;
};
