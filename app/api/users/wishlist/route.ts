import User from "@/lib/models/User";
import {connectToDB} from "@/lib/mongoDB";
import {auth} from "@clerk/nextjs";

import {NextApiRequest, NextApiResponse} from "next";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    await connectToDB()

    let user = await User.findOne({ clerkId: userId });

    // When the user sign-in for the 1st time, immediately create a new user for them
    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log("[users_GET]", err);
    return res.status(500).send("Internal Server Error");
  }
}
