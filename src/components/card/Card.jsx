"use client";
import React from "react";
import styles from "./Card.module.css";
import Button from "../Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = ({
  title = "Titre par défaut",
  description = "Description par défaut",
  batiment,
  buttonLabel = "Bouton par défaut",
  buttonPath,
  onButtonClick,
  imageUrl, // ❌ Suppression de l'image par défaut
}) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      {/* ✅ L'image ne s'affiche que si elle est fournie */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={200}
          className={styles.image}
        />
      )}
      <div>
       
      </div>
      
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <p className={styles.batiment}>{batiment}</p>

      {buttonPath ? (
        <Button label={buttonLabel} path={buttonPath} variant="primary" />
      ) : (
        <Button label={buttonLabel} onClick={onButtonClick} variant="primary" />
      )}
    </div>
  );
};

export default Card;
