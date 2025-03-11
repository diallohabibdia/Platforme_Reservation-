import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { userId } = params; // Utiliser salleId ici
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }, // Utilisation de salleId
    });
    if (!user) {
      return Response.json(
        { message: "Utilisateur non trouvée" },
        { status: 404 }
      );
    }
    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}
