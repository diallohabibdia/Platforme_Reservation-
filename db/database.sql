-- Crée la base de données avec les paramètres appropriés
CREATE DATABASE ReservationSalle
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_CA.UTF-8'
    LC_CTYPE = 'fr_CA.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
