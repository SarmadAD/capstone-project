import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { InvitiationModel } from "../../../../model/InvitiationModel";
import Invitation from "../../../../Schema/Invitation";
import User from "../../../../Schema/User";
import { connectDb } from "../../../../utils/db";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    connectDb();
    const session = await getSession({ req: request });
    switch (request.method) {
      case "GET":
        if (session) {
          const getInvitations = await Invitation.find({
            _id: {
              $in: session.user.invitationIds,
            },
          });

          const invitedUserIdAndStatusList = getInvitations.map((invite: InvitiationModel) => ({
            id: invite.requestedUserId,
            status: invite.status,
          }));
          
          let users = await Promise.all(invitedUserIdAndStatusList.map(async(invitedUserIdAndStatus) => ({ 
            user: await User.findById({ _id: invitedUserIdAndStatus.id }),
            status: invitedUserIdAndStatus.status,
          })));
          response.status(200).json(users);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;
      default:
        break;
    }
  } catch (error) {}
}