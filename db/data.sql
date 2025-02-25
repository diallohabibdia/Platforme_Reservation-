-- Insertions pour la table des utilisateurs
INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES
('Admin Universitaire', 'admin@univ.edu', 'hashed_password', 'admin'),
('Professeur Martin', 'martin@univ.edu', 'hashed_password', 'professeur'),
('Étudiant Dupont', 'dupont@univ.edu', 'hashed_password', 'etudiant');

-- Insertions pour la table des salles
INSERT INTO salles (nom, localisation, capacite, disponibilite) VALUES
('Salle 101', 'Bâtiment A', 30, TRUE),
('Salle 102', 'Bâtiment B', 20, TRUE),
('Salle 103', 'Bâtiment C', 25, FALSE);

-- Insertions pour la table des équipements
INSERT INTO equipements (nom, quantite_disponible, salle_id) VALUES
('Projecteur', 3, 1),
('Tableau blanc', 5, 1),
('Haut-parleur', 2, 2);

-- Insertions pour la table des réservations
INSERT INTO reservations (utilisateur_id, salle_id, date_debut, date_fin, statut) VALUES
(1, 1, '2023-01-15 08:00:00', '2023-01-15 12:00:00', 'confirmée'),
(2, 2, '2023-01-16 09:00:00', '2023-01-16 11:00:00', 'confirmée'),
(3, 1, '2023-01-17 14:00:00', '2023-01-17 16:00:00', 'en_attente');
