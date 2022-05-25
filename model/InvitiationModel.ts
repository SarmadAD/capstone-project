import { Key } from "react";

export type InvitiationModel = {
  _id: Key;
  requestingUserId: String;
  requestedUserId: String;
  status: String ;
};
