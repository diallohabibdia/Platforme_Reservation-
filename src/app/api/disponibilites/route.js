import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET: Récupérer toutes les disponibilitées
export async function GET(req) {
  try {
    const disponibilites = await prisma.disponibilite.findMany();
    return Response.json(disponibilites, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
