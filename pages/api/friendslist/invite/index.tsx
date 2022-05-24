import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { InvitiationModel } from "../../../../model/InvitiationModel";
import Invitation from "../../../../Schema/Invitation";
import User from "../../../../Schema/User";
import { connectDb } from "../../../../utils/db";
import { InviteStatus } from "../../../../utils/enum/InviteStatus";

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

          const invitedUserDataList = getInvitations
            .filter((invite) => invite.status === InviteStatus.requested)
            .map((invite: InvitiationModel) => ({
              inviteId: invite._id,
              requestedUserId: invite.requestedUserId,
              requestingUserId: invite.requestingUserId,
              status: invite.status,
            }));

          let users = await Promise.all(
            invitedUserDataList.map(async (invitedUserData) => ({
              inviteId: invitedUserData.inviteId,
              requestedUser: await User.findById({ _id: invitedUserData.requestedUserId }),
              requestingUser: await User.findById({ _id: invitedUserData.requestingUserId }),
              // requestingUserId: invitedUserData.requestingUserId,
              status: invitedUserData.status,
            }))
          );
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
