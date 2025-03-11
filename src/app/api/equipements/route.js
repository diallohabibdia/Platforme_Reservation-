import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET: Récupérer tous les equipements
export async function GET(req) {
  try {
    const equipements = await prisma.equipement.findMany();
    return Response.json(equipements, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
