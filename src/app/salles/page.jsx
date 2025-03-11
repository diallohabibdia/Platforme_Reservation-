"use client";

import { useState, useEffect } from "react";
import CardSalle from "@/components/card/CardSalle";
import styles from "./Salles.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientSalles({ initialSalles = [] }) {
  const [salles, setSalles] = useState(initialSalles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les salles
  const fetchSalles = async () => {
    if (!API_URL) {
      setError("L'URL de l'API est introuvable.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/salles`);
      if (!res.ok) throw new Error("Erreur lors du chargement des salles");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Données invalides reçues.");

      setSalles(data);
    } catch (error) {
      console.error("Erreur :", error);
      setError("Impossible de charger les salles.");
    } finally {
      setLoading(false);
    }
  };

  // Charger les salles au premier rendu + rafraîchir toutes les 10 secondes
  useEffect(() => {
    fetchSalles(); // Appel initial
    const interval = setInterval(fetchSalles, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste des Salles disponibles</h1>

      {loading && <p>Chargement des salles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.cardContainer}>
        {salles.length > 0 ? (
          salles.map((salle) => (
            <div key={salle.salleId || salle.id}>
              <CardSalle {...salle} />
            </div>
          ))
        ) : (
          !loading && <p>Aucune salle disponible.</p>
        )}
      </div>
    </div>
  );
}
