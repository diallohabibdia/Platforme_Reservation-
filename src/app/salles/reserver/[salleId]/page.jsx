"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";


const ReserverSalle = () => {
  const { salleId } = useParams() || { salleId: "Salle inconnue" };
  const [formData, setFormData] = useState({
    date: "",
    heureDebut: "",
    heureFin: "",
  });

  const [disponible, setDisponible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Efface l'erreur une fois corrigée
  };

  // Vérifier la disponibilité de la salle
  const verifierDisponibilite = async () => {
    let newErrors = {};

    if (!formData.date) newErrors.date = "Veuillez choisir une date.";
    if (!formData.heureDebut) newErrors.heureDebut = "Veuillez indiquer l'heure de début.";
    if (!formData.heureFin) newErrors.heureFin = "Veuillez indiquer l'heure de fin.";
    if (formData.heureDebut && formData.heureFin && formData.heureDebut >= formData.heureFin) {
      newErrors.heureDebut = "L'heure de début doit être avant l'heure de fin.";
      newErrors.heureFin = "L'heure de fin doit être après l'heure de début.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage(""); // Effacer le message précédent
      return;
    }

    setLoading(true);
    setMessage("");

    // Simulation d'un appel API avec un délai
    setTimeout(() => {
      const estDispo = Math.random() > 0.3; // 70% de chances que la salle soit disponible
      setDisponible(estDispo);
      setMessage(estDispo ? "Salle disponible !" : "Salle indisponible.");
      setLoading(false);
    }, 1000);
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (disponible) {
      setMessage(`✅ Réservation confirmée pour la salle ${salleId} !`);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Réserver la {salleId}</h1>
  
        {message && (
          <div className={`message ${disponible ? "success" : "error"}`}>
            {message}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Date :</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </div>
  
          <div className="form-group">
            <label>Heure de début :</label>
            <input
              type="time"
              name="heureDebut"
              value={formData.heureDebut}
              onChange={handleChange}
            />
            {errors.heureDebut && <p className="error">{errors.heureDebut}</p>}
          </div>
  
          <div className="form-group">
            <label>Heure de fin :</label>
            <input
              type="time"
              name="heureFin"
              value={formData.heureFin}
              onChange={handleChange}
            />
            {errors.heureFin && <p className="error">{errors.heureFin}</p>}
          </div>
  
          <button
            type="button"
            onClick={verifierDisponibilite}
            className={`button button-primary ${
              !formData.date || !formData.heureDebut || !formData.heureFin ? "button-disabled" : ""
            }`}
            disabled={!formData.date || !formData.heureDebut || !formData.heureFin}
          >
            {loading ? "Vérification..." : "Vérifier disponibilité"}
          </button>
  
          {disponible !== null && (
            <div className={`availability ${disponible ? "available" : "unavailable"}`}>
              {disponible ? <CheckCircleIcon className="icon" /> : <XCircleIcon className="icon" />}
              <span>{disponible ? "✅ Disponible" : "❌ Indisponible"}</span>
            </div>
          )}
  
          <button
            type="submit"
            disabled={disponible === false || loading}
            className={`button ${
              disponible === false || loading ? "button-disabled" : "button-success"
            }`}
          >
            {loading ? "Réservation..." : "Confirmer la réservation"}
          </button>
        </form>
      </div>
    </div>
  );
}  

export default ReserverSalle;
