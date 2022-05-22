import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../../Schema/User";
import Invitation from "../../../../../Schema/Invitation";
import { getSession } from "next-auth/react";
import { connectDb } from "../../../../../utils/db";
import { InviteStatus } from "../../../../../utils/enum/InviteStatus";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { email } = request.query;
  try {
    connectDb();
    const session = await getSession({ req: request });
    switch (request.method) {
      case "POST":
        if (session) {
          const getUserWithCurrentEmail = await User.findOne().where({
            email: email,
          });
          if (
            getUserWithCurrentEmail === undefined ||
            getUserWithCurrentEmail === null
          ) {
            response
              .status(404)
              .json({
                error:
                  "Invite not send: User with the current Email not found.",
              });
          } else {
            const createdInvitation = await Invitation.create({
              requestingUserId: session.user.id,
              requestedUserId: getUserWithCurrentEmail.id,
              status: InviteStatus.requested,
            });
            await User.updateOne(
              { _id: session.user.id },
              { $addToSet: { invitationIds: [createdInvitation._id] } }
            );
            response.status(200).json("ok");
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
