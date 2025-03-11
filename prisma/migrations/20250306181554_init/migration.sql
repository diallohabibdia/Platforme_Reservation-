/*
  Warnings:

  - You are about to alter the column `date` on the `Disponibilite` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `salleId` on the `Equipement` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Reservation` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Made the column `imageUrl` on table `Equipement` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `heure` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Salle` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "ReservationEquipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationId" INTEGER NOT NULL,
    "equipementId" INTEGER NOT NULL,
    CONSTRAINT "ReservationEquipement_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReservationEquipement_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "Equipement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Disponibilite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "salleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "heure" TEXT NOT NULL,
    CONSTRAINT "Disponibilite_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Disponibilite" ("date", "heure", "id", "salleId") SELECT "date", "heure", "id", "salleId" FROM "Disponibilite";
DROP TABLE "Disponibilite";
ALTER TABLE "new_Disponibilite" RENAME TO "Disponibilite";
CREATE TABLE "new_Equipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Equipement" ("id", "imageUrl", "name") SELECT "id", "imageUrl", "name" FROM "Equipement";
DROP TABLE "Equipement";
ALTER TABLE "new_Equipement" RENAME TO "Equipement";
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "salleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "heure" TEXT NOT NULL,
    CONSTRAINT "Reservation_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("date", "id", "salleId", "userId") SELECT "date", "id", "salleId", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_Salle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "localisation" TEXT NOT NULL,
    "batiment" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Salle" ("batiment", "capacite", "description", "id", "imageUrl", "localisation", "title") SELECT "batiment", "capacite", "description", "id", "imageUrl", "localisation", "title" FROM "Salle";
DROP TABLE "Salle";
ALTER TABLE "new_Salle" RENAME TO "Salle";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
