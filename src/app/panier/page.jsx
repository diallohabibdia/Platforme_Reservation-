"use client";
import React, { useState, useEffect } from "react";
import styles from "./Panier.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Panier = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      if (!API_URL) {
        setError("L'URL de l'API n'est pas définie.");
        setLoading(false);
        return;
      }

      try {
        console.log(`🔍 Requête envoyée à : ${API_URL}/api/reservations`);

        const response = await fetch(`${API_URL}/api/reservations`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Erreur API (${response.status}) : ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Données reçues invalides (attendu un tableau)");
        }

        console.log("📢 Réservations récupérées :", data);
        setReservations(data);
      } catch (error) {
        console.error("🚨 Erreur API:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!API_URL) {
      setError("L'URL de l'API n'est pas définie.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression (${response.status})`);
      }

      // Mise à jour de l'état local après la suppression réussie
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.error("🚨 Erreur lors de la suppression :", error.message);
      setError("Une erreur s'est produite lors de la suppression. Veuillez réessayer.");
    }
  };

  if (loading) return <p>Chargement des réservations...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className={styles.container}>
      <h1>🛒 Mon Panier (Réservations)</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id} className={styles.reservationItem}>
              <h3>Salle : {reservation.salle.title}</h3>
              <p><strong>📍 Emplacement :</strong> {reservation.salle.location}</p>
              <p><strong>👤 Réservé par :</strong> {reservation.user.name} ({reservation.user.email})</p>
              <p><strong>📅 Date :</strong> {new Date(reservation.date).toLocaleDateString()}</p>
              <p><strong>🕙 Heure :</strong> {reservation.heure}</p>
              <p><strong>🎛️ Équipements :</strong> {reservation.equipements.map(eq => eq.equipement.name).join(", ") || "Aucun"}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(reservation.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Panier;
