import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// GET: Récupérer toutes les salles
export async function GET(req) {
  try {
    const salles = await prisma.salle.findMany();
    return Response.json(salles, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST: Ajouter une nouvel salle
export async function POST(req) {
  try {
    const body = await req.json();
    const { capacite, title, location, description, batiment, imageUrl } = body;
    const salle = await prisma.salle.create({
      data: { title, description, capacite, location, batiment, imageUrl },
    });
    return NextResponse.json(salle, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

