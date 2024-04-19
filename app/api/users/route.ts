import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

import NextCors from 'nextjs-cors';

export const GET = async (req: NextRequest) => {


    await NextCors(req, res, {
    // Méthodes que vous souhaitez autoriser
    methods: ['GET'],
    // L'URL du client autorisé
    origin: 'http://localhost:3001',  // Assurez-vous que cette URL correspond à l'URL de votre client
    // Autoriser les en-têtes suivants
    allowHeaders: ['Content-Type', 'Authorization'],
    // Permettre les cookies et les informations d'authentification
    credentials: true,
    // Success Status pour les requêtes OPTIONS
    optionsSuccessStatus: 200
  });
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Non autorisé" }), { status: 401 })
    }

    await connectToDB()

    let user = await User.findOne({ clerkId: userId })

    // When the user sign-in for the 1st, immediately we will create a new user for them
    if (!user) {
      user = await User.create({ clerkId: userId })
      await user.save()
    }

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[users_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}