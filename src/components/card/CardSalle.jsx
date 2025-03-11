"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MapPinIcon, UsersIcon, BuildingOffice2Icon } from "@heroicons/react/20/solid";
import styles from "./CardSalle.module.css";

const CardSalle = ({
  id,
  title,
  description,
  imageUrl,
  batiment,
  localisation,
  capacite,
}) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>

        <div className={styles.info}>
          <div><MapPinIcon className={styles.icon} /> {localisation}</div>
          <div><BuildingOffice2Icon className={styles.icon} /> {batiment}</div>
          <div><UsersIcon className={styles.icon} /> Capacité: {capacite} personnes</div>
        </div>

        {/* Bouton de réservation */}
        <button
          className={styles.buttonReserve}
          onClick={() => router.push(`/salles/reserver/${id}`)}
        >
          Réserver
        </button>
      </div>
    </div>
  );
};

export default CardSalle;
