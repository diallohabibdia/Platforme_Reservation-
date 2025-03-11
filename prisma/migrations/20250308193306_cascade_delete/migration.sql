-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Disponibilite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "salleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "heure" TEXT NOT NULL,
    CONSTRAINT "Disponibilite_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Disponibilite" ("date", "heure", "id", "salleId") SELECT "date", "heure", "id", "salleId" FROM "Disponibilite";
DROP TABLE "Disponibilite";
ALTER TABLE "new_Disponibilite" RENAME TO "Disponibilite";
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "salleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "heure" TEXT NOT NULL,
    CONSTRAINT "Reservation_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("date", "heure", "id", "salleId", "userId") SELECT "date", "heure", "id", "salleId", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_ReservationEquipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationId" INTEGER NOT NULL,
    "equipementId" INTEGER NOT NULL,
    CONSTRAINT "ReservationEquipement_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReservationEquipement_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "Equipement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReservationEquipement" ("equipementId", "id", "reservationId") SELECT "equipementId", "id", "reservationId" FROM "ReservationEquipement";
DROP TABLE "ReservationEquipement";
ALTER TABLE "new_ReservationEquipement" RENAME TO "ReservationEquipement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
