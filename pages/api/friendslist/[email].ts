import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../Schema/User";
import { getSession } from "next-auth/react";
import { connectDb } from "../../../utils/db";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { email } = request.query;
  try {
    connectDb();
    const session = await getSession({ req: request });
    switch (request.method) {
      case "POST":
        if (session) {
          const getUserWithCurrentEmail = await User.findOne().where({ email: email });
          if (getUserWithCurrentEmail === undefined || getUserWithCurrentEmail === null) {
            response.status(404).json({ error: "User with the current Email not found." });
          } else {
            await User.updateOne({ _id: getUserWithCurrentEmail._id }, { $push: { friendsIds: [getUserWithCurrentEmail._id] } });
            // console.log(updatedUser);
            response.status(200).json(getUserWithCurrentEmail);
          }
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.error();
  }
}
