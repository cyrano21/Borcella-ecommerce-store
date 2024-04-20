import User from "@/lib/models/User";
import {connectToDB} from "@/lib/mongoDB";
import {NextRequest, NextResponse} from "next/server";
import {withEdgeMiddlewareAuth} from "@clerk/nextjs/edge-middleware"; // Import correct pour auth en Edge

// Configuration de l'authentification Clerk pour fonctionner avec Edge Middleware
export const middleware = withEdgeMiddlewareAuth({
  loadUser: true, // Charge les données utilisateur si nécessaire
});

// Fonction asynchrone gérant la requête GET
export async function GET(request: NextRequest) {
  try {
    await connectToDB(); // Connexion à la base de données

    const user = request.user; // Accès à l'utilisateur à partir de la requête

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "Non autorisé" }), { status: 401 });
    }

    let dbUser = await User.findOne({ clerkId: user.id });

    if (!dbUser) {
      dbUser = await User.create({ clerkId: user.id });
      await dbUser.save();
    }

    return new NextResponse(JSON.stringify(dbUser), { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
