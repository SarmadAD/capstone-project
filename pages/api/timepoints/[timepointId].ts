import { NextApiRequest, NextApiResponse } from "next";
import { TimepointModel } from "../../../model/TimepointModel";
import Timepoint from "../../../Schema/Timepoint";
import { connectDb } from "../../../utils/db";
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

function deleteImageFromCloudinary(deletedTimepoint: TimepointModel) {
  cloudinary.uploader
    .destroy(deletedTimepoint.picture.publicId, function (error, result) {
      console.log(result, error);
    })
    .then((resp) => console.log(resp))
    .catch((_err) =>
      console.log("Something went wrong, please try again later.")
    );
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { timepointId } = request.query;
    connectDb();
    switch (request.method) {
      case "PATCH":
        if(request.body.timepoint.picture.url === "" && request.body.timepoint.picture.publicId !== ""){
          deleteImageFromCloudinary(request.body.timepoint);
          request.body.timepoint.picture.publicId = "";
        }
        const updatedTimepoint = await Timepoint.findByIdAndUpdate(
          timepointId,
          {
            $set: {
              ...request.body.timepoint,
              picture: {
                url: request.body.imageData.url,
                publicId: request.body.imageData.publicId,
              },
            },
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
      case "DELETE":
        const deletedTimepoint = await Timepoint.findOneAndDelete(
          { _id: timepointId },
          { returnDocument: "after", runValidators: true }
        );
        if (deletedTimepoint) {
          response.status(200).json({
            success: true,
            data: deletedTimepoint,
          });
          deleteImageFromCloudinary(deletedTimepoint);
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
