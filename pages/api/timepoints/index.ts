import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Timepoint from "../../../Schema/Timepoint";
import { connectDb } from "../../../utils/db";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    connectDb();
    const session = await getSession({ req: request });
    switch (request.method) {
      case "GET":
        if (session) {
          const timepoints = await Timepoint.find().where({ userId: session.user.id });
          response.status(200).json(timepoints);
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;
      case "POST":
        if (session) {
          const createdTimepoint = await Timepoint.create({
            ...request.body,
            userId: session.user.id,
          });
          response.status(200).json({ success: true, data: createdTimepoint });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;

      default:
        console.log("request method was neither GET or POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
