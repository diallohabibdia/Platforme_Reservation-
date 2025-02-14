import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

const Button = ({ label, path, onClick, type = "button", variant = "primary" }) => {
  // Si un chemin (path) est fourni, utiliser <Link> pour la navigation
  if (path) {
    return (
      <Link href={path} className={`${styles.button} ${styles[variant]}`}>
        {label}
      </Link>
    );
  }

  // Sinon, c'est un bouton classique
  return (
    <button className={`${styles.button} ${styles[variant]}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
