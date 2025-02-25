-- Suppression des tables si elles existent déjà pour éviter des conflits lors de la recréation
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS equipements CASCADE;
DROP TABLE IF EXISTS salles CASCADE;
DROP TABLE IF EXISTS utilisateurs CASCADE;

-- Création de la table des utilisateurs
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Création de la table des salles
CREATE TABLE salles (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    localisation VARCHAR(255) NOT NULL,
    capacite INT NOT NULL,
    disponibilite BOOLEAN DEFAULT TRUE
);

-- Création de la table des équipements
CREATE TABLE equipements (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    quantite_disponible INT NOT NULL,
    salle_id INT REFERENCES salles(id)
);

-- Création de la table des réservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    utilisateur_id INT REFERENCES utilisateurs(id),
    salle_id INT REFERENCES salles(id),
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente'
);
