import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Importer NextResponse

const prisma = new PrismaClient();

// GET: Récupérer toutes les réservations
export async function GET(req) {
  try {
    const reservations = await prisma.reservation.findMany({
        include: {
          user: { 
            select: { id: true, username: true, email: true } 
          },
          salle: { 
            select: { id: true, title: true, localisation: true } 
          },
          equipements: {
            include: { 
              equipement: { select: { id: true, name: true } } 
            },
          },
        },
      });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST: Créer une nouvelle réservation
export async function POST(req) {
    try {
      // Lire les données envoyées
      const data = await req.json();
      console.log("Données reçues:", data);
  
      const { userId, salleId, date, heure, equipements } = data;
  
      // Vérification des champs obligatoires
      if (!userId || !salleId || !date || !heure) {
        return NextResponse.json(
          { message: "Champs manquants (userId, salleId, date, heure sont requis)" },
          { status: 400 }
        );
      }
  
      // Vérifier si l'utilisateur et la salle existent
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const salle = await prisma.salle.findUnique({ where: { id: salleId } });
  
      if (!user || !salle) {
        return NextResponse.json(
          { message: "Utilisateur ou salle non trouvé" },
          { status: 404 }
        );
      }
  
      // Création de la réservation avec connexion des équipements
      const reservation = await prisma.reservation.create({
        data: {
          userId,
          salleId,
          date: new Date(date), // Conversion en Date
          heure,
          equipements: {
            create: equipements?.map(equipementId => ({
              equipement: { connect: { id: equipementId } }
            })) || [],
          },
        },
        include: {
          user: { select: { id: true, username: true, email: true } },
          salle: { select: { id: true, title: true, localisation: true } },
          equipements: {
            include: { equipement: { select: { id: true, name: true } } },
          },
        },
      });
  
      return NextResponse.json(
        { message: "Réservation créée avec succès", reservation },
        { status: 201 }
      );
    } catch (error) {
      console.error("Erreur serveur:", error);
      return NextResponse.json(
        { message: "Erreur interne du serveur" },
        { status: 500 }
      );
    }
  }