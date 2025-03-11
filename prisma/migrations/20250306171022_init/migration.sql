-- CreateTable
CREATE TABLE "Salle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "localisation" TEXT NOT NULL,
    "batiment" TEXT NOT NULL,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "Disponibilite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "heure" TEXT NOT NULL,
    "salleId" INTEGER NOT NULL,
    CONSTRAINT "Disponibilite_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "salleId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    CONSTRAINT "Equipement_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "salleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    CONSTRAINT "Reservation_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
