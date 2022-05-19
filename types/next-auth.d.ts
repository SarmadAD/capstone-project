import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: Key;
      friendsIds: [{ type: Schema.Types.ObjectId; ref: "User" }];
      invitationIds: [{ type: Schema.Types.ObjectId, ref: "Invitation" }];
    } & DefaultSession["user"];
  }
}
