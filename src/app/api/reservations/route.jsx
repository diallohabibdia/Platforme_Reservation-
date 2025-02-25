import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId, salleId, equipementId, date } = await req.json();

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        salleId,
        equipementId,
        date: new Date(date),
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la réservation" }, { status: 500 });
  }
}
