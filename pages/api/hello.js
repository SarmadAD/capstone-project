// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDb } from "../../utils/db";

export default async function handler(req, res) {
  try {
    connectDb();
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error(error);
  }
}
