
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { reservationEquipementId } = params; // Utiliser salleId ici
    const reservationEquipement = await prisma.reservationEquipement.findUnique({
      where: { id: Number(reservationEquipementId) }, // Utilisation de salleId
    });
    if (!reservationEquipement) {
      return Response.json(
        { message: "Reservation d'equipement non trouvée" },
        { status: 404 }
      );
    }
    return Response.json(reservationEquipement, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}


// DELETE: Supprimer une reservationEquipement
export async function DELETE(req, { params }) {
  try {
    const { reservationEquipementId } = params;
    // Vérifier si la reservation existe
    const reservationEquipement = await prisma.reservationEquipement.findUnique({
      where: { id: Number(reservationEquipementId) },
    });
    if (!reservationEquipement) {
      return Response.json(
        { message: "Reservation de l'Equipement non trouvé" },
        { status: 404 }
      );
    }
    // Supprimer la reservation
    await prisma.reservationEquipement.delete({
      where: { id: Number(reservationEquipementId) },
    });
    return Response.json({ message: "Reservation de l'Equipement supprimé avec succès" });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}
