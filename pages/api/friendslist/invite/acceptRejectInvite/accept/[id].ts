import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectDb } from "../../../../../../utils/db";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query;
  try {
    connectDb();
    const session = await getSession({ req: request });
    switch (request.method) {
      case "PATCH":
        if (session) {
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
