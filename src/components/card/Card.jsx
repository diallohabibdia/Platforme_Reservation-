"use client";
import React from "react";
import styles from "./Card.module.css";
import Button from "../Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = ({
  title = "Titre par défaut",
  description = "Description par défaut",
  buttonLabel = "Bouton par défaut",
  buttonPath,
  onButtonClick,
  image, // ❌ Suppression de l'image par défaut
}) => {
  const router = useRouter();

  return (
    <div className={styles.card}>
      {/* ✅ L'image ne s'affiche que si elle est fournie */}
      {image && (
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className={styles.image}
        />
      )}
      
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      {buttonPath ? (
        <Button label={buttonLabel} path={buttonPath} variant="primary" />
      ) : (
        <Button label={buttonLabel} onClick={onButtonClick} variant="primary" />
      )}
    </div>
  );
};

export default Card;
