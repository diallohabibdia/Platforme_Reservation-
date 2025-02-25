"use client";
import React, { useState, useEffect } from "react";
import { MapPinIcon, UsersIcon, BuildingOffice2Icon } from "@heroicons/react/20/solid";
import styles from "./CardSalle.module.css";

const CardSalle = ({ title, description, imageUrl, batiment, localisation, capacite, disponibilites, onReserve }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  // Vérification automatique dès qu'on sélectionne une date ou une heure
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const available = disponibilites.some(
        (slot) => slot.date === selectedDate && slot.heure === selectedTime
      );
      setIsAvailable(available);
    }
  }, [selectedDate, selectedTime, disponibilites]);

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>

        <div className={styles.info}>
          <div><MapPinIcon className={styles.icon} /> {localisation}</div>
          <div><BuildingOffice2Icon className={styles.icon} /> {batiment}</div>
          <div><UsersIcon className={styles.icon} /> Capacité: {capacite} personnes</div>
        </div>

        {/* Sélection de la date et de l'heure */}
        <div className={styles.dateSelection}>
          <label>Date :</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <label>Heure :</label>
          <input 
            type="time" 
            value={selectedTime} 
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        {/* Bouton réserver désactivé si la salle n'est pas dispo */}
        <button onClick={onReserve} disabled={!isAvailable}>
          {isAvailable ? "Réserver" : "Indisponible"}
        </button>
      </div>
    </div>
  );
};

export default CardSalle;
