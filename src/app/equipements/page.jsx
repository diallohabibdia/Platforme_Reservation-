"use client";
import React, { useState, useEffect } from "react";
import styles from "./Equipements.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Equipements = () => {
  const router = useRouter();

  const [equipements, setEquipements] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEquipement, setSelectedEquipement] = useState(null);
  const [reservationDate, setReservationDate] = useState("");

  // 📌 Récupérer les équipements depuis l'API
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("/api/equipements");
        if (response.ok) {
          const data = await response.json();
          setEquipements(data);
        } else {
          console.error("Erreur lors de la récupération des équipements");
        }
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API", error);
      }
    };

    fetchEquipements();
  }, []);

  const handleAdd = (equipement) => {
    setSelectedEquipement(equipement);
    setShowConfirmModal(true);
  };

  const confirmAddToReservation = () => {
    if (!reservationDate) {
      alert("Veuillez sélectionner une date de réservation.");
      return;
    }

    // Logique pour ajouter l'équipement et la date à la réservation
    console.log(`Équipement ajouté à la réservation:`, selectedEquipement);
    console.log(`Date de réservation: ${reservationDate}`);
    setShowConfirmModal(false);
    // Rediriger ou mettre à jour l'état du panier ici si nécessaire
  };

  const cancelAddToReservation = () => {
    setShowConfirmModal(false);
  };

  const goToCart = () => {
    router.push("/panier");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explorez nos équipements à louer</h1>

      {/* Modal de confirmation */}
      {showConfirmModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>
              Voulez-vous ajouter{" "}
              {selectedEquipement?.name} à votre réservation ?
            </h2>
            <div className={styles.datePicker}>
              <label htmlFor="reservationDate">Sélectionner la date :</label>
              <input
                type="date"
                id="reservationDate"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <button onClick={confirmAddToReservation}>Oui</button>
            <button onClick={cancelAddToReservation}>Non</button>
          </div>
        </div>
      )}

      {/* Affichage des équipements */}
      <div className={styles.equipementGrid}>
        {equipements.map((equipement) => (
          <div key={equipement.id} className={styles.card}>
            {equipement.imageUrl ? (
              <Image
                src={equipement.imageUrl}
                alt={equipement.name}
                width={300}
                height={200}
                className={styles.image}
              />
            ) : (
              <div className={styles.noImage}>Image non disponible</div>
            )}
            <h2>{equipement.name}</h2>
            <p>{equipement.description}</p>
            <button
              className={styles.button}
              onClick={() => handleAdd(equipement)}
            >
              Réserver
            </button>
          </div>
        ))}
      </div>

      {/* Bouton pour aller au panier */}
      <button className={styles.cartButton} onClick={goToCart}>
        Voir le panier 🛒
      </button>
    </div>
  );
};

export default Equipements;
