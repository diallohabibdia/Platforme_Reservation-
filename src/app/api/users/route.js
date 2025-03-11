import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// GET: Récupérer tous les utilisateurs
export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

