import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ error: "Accès non autorisé" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Token invalide" }, { status: 403 });
  }
}
