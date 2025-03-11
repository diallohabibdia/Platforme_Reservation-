import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET: Récupérer toutes les reservations d'equipements
export async function GET(req) {
  try {
    const reservationEquipements = await prisma.reservationEquipement.findMany();
    return Response.json(reservationEquipements, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST: Ajouter une nouvelle réservation d'équipement
export async function POST(req) {
      try {
        const body = await req.json();
        const { reservationId, equipementId } = body;
        const reservationEquipement = await prisma.reservationEquipement.create({
          data: { reservationId, equipementId  },
        });
        return NextResponse.json(reservationEquipement, { status: 201 });
      } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
          { message: "Erreur interne du serveur" },
          { status: 500 }
        );
      }
    }

