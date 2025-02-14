"use client";
import React from "react";
import styles from "./Panier.module.css";

const Panier = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mon panier de réservation</h1>
      <p className={styles.description}>Retrouvez ici toutes vos salles et équipements réservés.</p>
      
      {/* Zone pour afficher les réservations */}
      <div className={styles.reservations}>
        <p>Votre panier est vide pour le moment.</p>
      </div>
    </div>
  );
};

export default Panier;
