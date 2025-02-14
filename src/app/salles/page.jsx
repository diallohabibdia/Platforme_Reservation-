"use client";
import { useRouter } from "next/navigation";
import styles from "./Salles.module.css";
import Card from "@/components/card/Card";

const Salles = () => {
  const router = useRouter();

  const salles = [
    { title: "Salle A", description: "Une grande salle équipée pour vos événements.", image: "/images/salleDemo.png" },
    { title: "Salle B", description: "Une salle moderne avec projecteur.", image: "/images/salleDemo.png" },
    { title: "Salle C", description: "Un espace confortable pour vos réunions.", image: "/images/salleDemo.png" },
    { title: "Salle D", description: "Une salle idéale pour les conférences.", image: "/images/salleD.png" },
    { title: "Salle E", description: "Un espace chaleureux pour vos formations.", image: "/images/salleE.png" },
    { title: "Salle F", description: "Une salle avec une capacité de 100 personnes.", image: "/images/salleF.png" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste des Salles disponibles</h1>
      <p className={styles.description}>
        Bienvenue sur notre plateforme de réservation de salles dédiée à l'université.
      </p>

      <div className={styles.cardContainer}>
        {salles.map((salle) => (
          <div key={salle.title} className={styles.card}>
            <Card
              {...salle}
              buttonLabel="Réserver"
              onButtonClick={() => router.push(`/salles/reserver/${salle.title}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Salles;
