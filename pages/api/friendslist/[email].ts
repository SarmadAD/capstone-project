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
      case "GET":
        if (session) {
          const getFriends = await User.find({
            _id: {
              $in: session.user.friendsIds,
            },
          });
          response.status(200).json(getFriends);
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
