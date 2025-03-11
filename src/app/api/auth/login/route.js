import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    // 🔥 Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Mot de passe entré:", password);
    console.log("Mot de passe stocké:", user.password);
    console.log("bcrypt.compare() retourne:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token }, { status: 200 });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}
