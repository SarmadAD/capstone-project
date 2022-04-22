import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const session = await getSession({ req: request });
    switch (request.method) {
      case "POST":
        if (session) {
          const imageData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDNAME}/upload`, {
            method: "POST",
            body: request.body,
          });
          response.status(200).json({
            success: true,
            data: imageData,
          });
        } else {
          response.status(401).json({ error: "Not authenticated" });
        }
        break;
      default:
        console.log("request method was not POST");
        response.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
