import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { equipementId } = params; // Utiliser salleId ici
    const equipement = await prisma.equipement.findUnique({
      where: { id: Number(equipementId) }, // Utilisation de salleId
    });
    if (!equipement) {
      return Response.json(
        { message: "Reservation non trouvée" },
        { status: 404 }
      );
    }
    return Response.json(equipement, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}
