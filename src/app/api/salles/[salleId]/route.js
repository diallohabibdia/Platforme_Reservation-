import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET: Récupérer toutes les salles par id
export async function GET(req, { params }) {
  try {
    const { salleId } = params; // Utiliser salleId ici
    const salle = await prisma.salle.findUnique({
      where: { id: Number(salleId) }, // Utilisation de salleId
    });
    if (!salle) {
      return Response.json(
        { message: "Salle non trouvée" },
        { status: 404 }
      );
    }
    return Response.json(salle, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une salle
export async function DELETE(req, { params }) {
  try {
    const { salleId } = params;
    // Vérifier si la salle existe
    const salle = await prisma.salle.findUnique({
      where: { id: Number(salleId) },
    });
    if (!salle) {
      return Response.json({ message: "Salle non trouvé" }, { status: 404 });
    }
    // Supprimer la salle
    await prisma.salle.delete({
      where: { id: Number(salleId) },
    });
    return Response.json({ message: "Salle supprimé avec succès" });
  } catch (error) {
    return Response.json(
      { message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Modifier une salle, mise a jour d'une salle

export async function PUT(req, { params }) {
    try {
    const { salleId } = params;
    const body = await req.json();
    const { title, description, capacite, location, batiment, imageUrl } = body;
    // Vérifier si la salle existe
    const salle = await prisma.salle.findUnique({
    where: { id: Number(salleId) },
    });
    if (!salle) {
    return Response.json(
    { message: "Salle non trouvé" },
    { status: 404 }
    );
    }
    // Mettre à jour d'une salle
    const updatedSalle = await prisma.salle.update({
    where: { id: Number(salleId) },
    data: { title, description, capacite, location, batiment, imageUrl },
    });
    return Response.json(updatedSalle, { status: 200 });
    } catch (error) {
    return Response.json(
    { message: "Erreur interne du serveur", error: error.message },
    { status: 500 }
    );
    }}
    
