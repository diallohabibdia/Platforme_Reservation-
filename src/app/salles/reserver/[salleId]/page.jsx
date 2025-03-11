"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./SalleDetail.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PageSalleDetail() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? null;
  const { salleId } = useParams();
  const salleIdNum = Number(salleId);

  const [salle, setSalle] = useState(null);
  const [equipements, setEquipements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: "2025-03-12",
    heure: "10:00",
    equipements: [2, 3],
  });

  useEffect(() => {
    const fetchSalleData = async () => {
      if (!salleIdNum) return;
      try {
        const response = await fetch(`${API_URL}/api/salles/${salleIdNum}`);
        if (!response.ok) throw new Error("Salle introuvable");
        const data = await response.json();
        setSalle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSalleData();
  }, [salleIdNum]);

  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch(`${API_URL}/api/equipements`);
        if (!response.ok) throw new Error("Erreur lors du chargement des équipements");
        const data = await response.json();
        setEquipements(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEquipements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.heure) {
      setFormMessage("Tous les champs doivent être remplis.");
      return;
    }

    if (!session) {
      setFormMessage("Vous devez être connecté pour réserver.");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = {
        salleId: salleIdNum,
        date: new Date(formData.date).toISOString(),
        heure: formData.heure,
        equipements: formData.equipements,
        userId,
      };

      console.log("Envoi de la requête avec :", requestBody);

      const response = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.accessToken ? `Bearer ${session.accessToken}` : "",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Statut de la réponse :", response.status);

      const responseBody = await response.text(); // Lire la réponse brute
      console.log("Réponse brute de l'API :", responseBody);

      if (!response.ok) {
        throw new Error(`Erreur lors de la soumission (${response.status})`);
      }

      if (!responseBody) {
        throw new Error("Réponse vide de l'API");
      }

      const data = JSON.parse(responseBody);
      console.log("Réponse JSON analysée :", data);

      setFormMessage("Réservation réussie !");
      setShowForm(false);
      setFormData({ date: "", heure: "", equipements: [] });
    } catch (err) {
      console.error("Erreur lors de la réservation :", err.message);
      setFormMessage("Une erreur s'est produite. Veuillez réessayer.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        equipements: checked
          ? [...prevData.equipements, Number(value)]
          : prevData.equipements.filter((id) => id !== Number(value)),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  if (loading) return <p className={styles.notFound}>Chargement...</p>;
  if (error) return <p className={styles.notFound}>Erreur : {error}</p>;

  return (
    <div className={styles.container}>
      <h1>{salle.title}</h1>
      <img src={salle.imageUrl} alt={salle.title} className={styles.image} />
      <p><strong>Bâtiment :</strong> {salle.batiment}</p>
      <p><strong>Localisation :</strong> {salle.localisation}</p>
      <p className={styles.description}>{salle.description}</p>
      <p><strong>Capacité :</strong> {salle.capacite} personnes</p>
      <button className={styles.reserveButton} onClick={() => setShowForm(true)}>
        Réserver
      </button>
      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Formulaire de Réservation</h2>
          {formMessage && <p className={styles.formMessage}>{formMessage}</p>}
          <label>Date de réservation :
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <label>Heure :
            <input type="time" name="heure" value={formData.heure} onChange={handleChange} required />
          </label>
          <fieldset>
            <legend>Équipements disponibles :</legend>
            {equipements.map((equip) => (
              <label key={equip.id}>
                <input
                  type="checkbox"
                  name="equipements"
                  value={equip.id}
                  onChange={handleChange}
                  checked={formData.equipements.includes(equip.id)}
                />
                {equip.name}
              </label>
            ))}
          </fieldset>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => setShowForm(false)}>
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}
