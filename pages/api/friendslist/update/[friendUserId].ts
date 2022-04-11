import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../../utils/db";
import User from "../../../../Schema/User";
import { getSession } from "next-auth/react";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { friendUserId } = request.query;
  const session = await getSession({ req: request });

  try {
    connectDb();
    switch (request.method) {
      case "PATCH":
        const deletedFriend = await User.findByIdAndUpdate(
          { _id: session.user.id },
          {
            $pull: {
              friendsIds: friendUserId,
            },
          },
          { returnDocument: "after", runValidators: true }
        );
        if (deletedFriend) {
          response.status(200).json({
            success: true,
            data: deletedFriend,
          });
        } else {
          response.status(404).json({ error: "Not found" });
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.error();
  }
}
