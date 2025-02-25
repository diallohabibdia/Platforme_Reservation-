"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import styles from "./Reservation.module.css";

const Reservation = () => {
  const router = useRouter();
  const { id } = useParams(); // Vérifie la récupération correcte de l'ID
  const [reservation, setReservation] = useState(null);
  const [equipements, setEquipements] = useState([]);

  useEffect(() => {
    if (!id) return; // Si l'ID est inexistant, ne rien faire

    console.log("ID reçu depuis useParams:", id); // Debugging

    try {
      const savedReservation = localStorage.getItem("reservation");
      console.log("Donnée brute de localStorage:", savedReservation); // Debugging

      if (savedReservation) {
        const parsedReservation = JSON.parse(savedReservation);
        console.log("Réservation récupérée:", parsedReservation); // Debugging

        // Vérification des types et conversion si nécessaire
        const salleId = String(parsedReservation?.salle);
        const paramId = String(id);

        if (salleId === paramId) {
          setReservation(parsedReservation);
          setEquipements(parsedReservation.equipements || []);
        } else {
          console.warn("Aucune correspondance entre l'ID et la salle stockée.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la réservation :", error);
    }
  }, [id]);

  const handleConfirm = async () => {
    if (!reservation) {
      alert("Aucune réservation trouvée !");
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salle: reservation.salle,
          date: reservation.date,
          heure: reservation.heure,
          equipements,
        }),
      });

      if (response.ok) {
        alert("Réservation confirmée !");
        localStorage.removeItem("reservation");
        router.push("/panier"); // Redirection après confirmation
      } else {
        alert("Erreur lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      alert("Une erreur est survenue.");
    }
  };

  // Gestion du chargement
  if (!reservation) {
    return (
      <div className={styles.container}>
        <h1>Chargement de la réservation...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Confirmation de réservation</h1>
      <p><strong>Salle:</strong> {reservation.salle}</p>
      <p><strong>Date:</strong> {reservation.date}</p>
      <p><strong>Heure:</strong> {reservation.heure}</p>

      <h2>Équipements sélectionnés :</h2>
      {equipements.length > 0 ? (
        <ul>
          {equipements.map((eq, index) => (
            <li key={index}>{eq}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun équipement ajouté.</p>
      )}

      <button onClick={handleConfirm} className={styles.button}>
        Confirmer la réservation
      </button>
      <button onClick={() => router.push("/salles")} className={styles.buttonSecondary}>
        Modifier la sélection
      </button>
    </div>
  );
};

export default Reservation;
