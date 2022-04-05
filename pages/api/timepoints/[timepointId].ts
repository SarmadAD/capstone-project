import { NextApiRequest, NextApiResponse } from "next";
import Timepoint from "../../../Schema/Timepoint";
import { connectDb } from "../../../utils/db";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { timepointId } = request.query;

  try {
    connectDb();
    switch (request.method) {
      case "PATCH":
        const updatedTimepoint = await Timepoint.findByIdAndUpdate(
          timepointId,
          {
            $set: request.body,
          },
          { returnDocument: "after", runValidators: true }
        );
        if (updatedTimepoint) {
          response.status(200).json({
            success: true,
            data: updatedTimepoint,
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
