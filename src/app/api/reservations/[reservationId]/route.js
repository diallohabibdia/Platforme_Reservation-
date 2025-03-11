import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET: Récupérer une reservation par son id
export async function GET(req, { params }) {
  try {
    const { reservationId } = params; // Utiliser reservationId ici
    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(reservationId) }, // Utilisation de reservationId
    });
    if (!reservation) {
      return Response.json(
        { message: "Reservation non trouvée" },
        { status: 404 }
      );
    }
    return Response.json(reservation, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une reservation
export async function DELETE(req, { params }) {
  try {
    const { reservationId } = params;
    // Vérifier si la reservation existe
    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(reservationId) },
    });
    if (!reservation) {
      return Response.json(
        { message: "reservation non trouvé" },
        { status: 404 }
      );
    }
    // Supprimer la reservation
    await prisma.reservation.delete({
      where: { id: Number(reservationId) },
    });
    return Response.json({ message: "reservation supprimé avec succès" });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}



