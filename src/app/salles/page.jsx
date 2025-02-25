
"use client"
import { useRouter } from "next/navigation";
import CardSalle from "@/components/card/CardSalle";
import styles from "./Salles.module.css";


const Salles = () => {
  const router = useRouter();

  const salles = [

    {
      title: "F3120",
      description: "Grande salle équipée.",
      imageUrl: "/images/F3120.png",
      batiment: "Bâtiment F",
      localisation: "Université XYZ",
      capacite: 50,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    },
    {
      title: "G2030",
      description: "Une salle moderne avec projecteur.",
      imageUrl: "/images/G2030.png",
      batiment: "Bâtiment G",
      localisation: "Université XYZ",
      capacite: 30,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    },
    {
      title: "Amphi F1010",
      description: "Une grande salle équipée pour vos événements.",
      imageUrl: "/images/salleEvents.png",
      batiment: "Amphitheatre F",
      localisation: "Université XYZ",
      capacite: 50,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    },
    {
      title: "H3130",
      description: "Une salle moderne avec projecteur.",
      imageUrl: "/images/salleinfo.png",
      batiment: "Bâtiment H",
      localisation: "Université XYZ",
      capacite: 30,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    },
    {
      title: "A2010",
      description: "Une salle moderne avec projecteur.",
      imageUrl: "/images/salleReunions.png",
      batiment: "Bâtiment A",
      localisation: "Université XYZ",
      capacite: 30,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    },
    {
      title: "B2120",
      description: "Une salle moderne avec projecteur.",
      imageUrl: "/images/salleLabo.png",
      batiment: "Bâtiment B",
      localisation: "Université XYZ",
      capacite: 30,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    },
    {
      title: "C3120",
      description: "Une salle moderne avec projecteur.",
      imageUrl: "/images/explesalle.png",
      batiment: "Bâtiment C",
      localisation: "Université XYZ",
      capacite: 30,
      disponibilites: [
        { date: "2025-02-12", heure: "15:00" },
        { date: "2025-02-13", heure: "10:00" },
      ],
    }

  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Liste des Salles disponibles</h1>

      <div className={styles.cardContainer}>
        {salles.map((salle) => (
          <CardSalle
            key={salle.title}
            {...salle}
            onReserve={() => router.push(`/salles/reserver/${encodeURIComponent(salle.title)}`)}
          />

        ))}
      </div>
    </div>
  );
};

export default Salles;
