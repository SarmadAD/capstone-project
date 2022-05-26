import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Invitation from "../../../../../../Schema/Invitation";
import User from "../../../../../../Schema/User";
import { connectDb } from "../../../../../../utils/db";
import { InviteStatus } from "../../../../../../utils/enum/InviteStatus";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { inviteId } = request.query;
  try {
    connectDb();
    const session = await getSession({ req: request });
    switch (request.method) {
      case "PATCH":
        if (session) {
          const acceptedInvition = await Invitation.findByIdAndUpdate(
            { _id: inviteId },
            {
              status: InviteStatus.accepted,
            },
            { returnDocument: "after", runValidators: true }
          );
          await User.updateOne({ _id: acceptedInvition.requestingUserId }, { $addToSet: { friendsIds: [acceptedInvition.requestedUserId] } });
          await User.updateOne({ _id: acceptedInvition.requestedUserId }, { $addToSet: { friendsIds: [acceptedInvition.requestingUserId] } });
          response.status(200).json("ok");
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
