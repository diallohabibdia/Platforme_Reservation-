"use client";
import React from "react";
import styles from "./Equipements.module.css";
import Image from "next/image";

const Equipements = () => {
  const equipements = [
    {
      title: "Projecteur HD",
      description: "Idéal pour vos présentations et projections en haute définition.",
      image: "/images/projecteur.jpg", // ✅ Image du projecteur
    },
    {
      title: "Microphone sans fil",
      description: "Un son clair et puissant pour vos conférences et événements.",
      image: "/images/microphone.jpg", // ✅ Image du microphone
    },
    {
      title: "Système de sonorisation",
      description: "Un son professionnel pour toutes vos réunions et spectacles.",
      image: "/images/sonorisation.jpg", // ✅ Image du système de son
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explorez nos équipements à louer</h1>
      <p className={styles.subtitle}>
        Découvrez une large gamme d’équipements modernes pour vos événements et réunions.
      </p>

      <div className={styles.equipementGrid}>
        {equipements.map((equipement, index) => (
          <div key={index} className={styles.card}>
            {/* ✅ Ajout de l'image */}
            <Image 
              src={equipement.image} 
              alt={equipement.title} 
              width={300} 
              height={200} 
              className={styles.image} 
            />
            <h2>{equipement.title}</h2>
            <p>{equipement.description}</p>
            <button>Ajouter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipements;
