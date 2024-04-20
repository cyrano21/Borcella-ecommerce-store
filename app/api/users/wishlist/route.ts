import User from "@/lib/models/User";
import {connectToDB} from "@/lib/mongoDB";

import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs"; // Assurez-vous d'utiliser NextRequest pour les Edge Functions ou middleware

// Utilisation de l'authentification Clerk (s'assurer que la méthode est utilisée correctement selon la doc)
export const GET = async (_: NextRequest) => {  // Remplacer 'req' par '_' pour indiquer qu'il n'est pas utilisé
  try {
    await connectToDB();

    const { userId } = auth(); // Utilisez la méthode d'authentification appropriée

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Non autorisé" }), { status: 401 });
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
