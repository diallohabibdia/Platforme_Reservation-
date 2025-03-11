import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: "Email déjà utilisé" }, { status: 400 });
    }

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUsername = await prisma.user.findUnique({ where: { username } });

    if (existingUsername) {
      return NextResponse.json({ message: "Nom d'utilisateur déjà utilisé" }, { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: "USER", // Rôle par défaut
      },
    });

    return NextResponse.json({ message: "Utilisateur créé avec succès", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
