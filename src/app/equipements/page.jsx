"use client";
import React, { useState, useEffect } from "react";
import styles from "./Equipements.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Equipements = () => {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomEquipments, setRoomEquipments] = useState({});

  const equipements = [
    {
      title: "Projecteur HD",
      description: "Idéal pour vos présentations et projections en haute définition.",
      image: "/images/projecteur.png",
    },
    {
      title: "Microphone sans fil",
      description: "Un son clair et puissant pour vos conférences et événements.",
      image: "/images/micro.png",
    },
    {
      title: "Système de sonorisation",
      description: "Un son professionnel pour toutes vos réunions et spectacles.",
      image: "/images/sonorisation.png",
    },
  ];

  // 📌 Récupérer la salle sélectionnée depuis localStorage
  useEffect(() => {
    const savedRoom = localStorage.getItem("selectedRoom");
    if (savedRoom) {
      setSelectedRoom(savedRoom);
    }
  }, []);

  const handleAdd = (title) => {
    if (!selectedRoom) {
      alert("Veuillez sélectionner une salle avant d'ajouter un équipement.");
      return;
    }

    setRoomEquipments((prev) => ({
      ...prev,
      [selectedRoom]: [...(prev[selectedRoom] || []), title],
    }));

    // 📌 Stocker la réservation des équipements dans localStorage
    localStorage.setItem(
      "reservedEquipments",
      JSON.stringify({ ...roomEquipments, [selectedRoom]: [...(roomEquipments[selectedRoom] || []), title] })
    );
  };

  const goToCart = () => {
    router.push("/panier"); // 📌 Redirection vers la page du panier
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explorez nos équipements à louer</h1>
      <p className={styles.subtitle}>
        Salle sélectionnée : <strong>{selectedRoom || "Aucune sélection"}</strong>
      </p>

      <div className={styles.equipementGrid}>
        {equipements.map((equipement, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={equipement.image}
              alt={equipement.title}
              width={300}
              height={200}
              className={styles.image}
            />
            <h2>{equipement.title}</h2>
            <p>{equipement.description}</p>
            <button
              className={styles.button}
              onClick={() => handleAdd(equipement.title)}
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>

      <button className={styles.cartButton} onClick={goToCart}>
        Voir le panier 🛒
      </button>
    </div>
  );
};

export default Equipements;
