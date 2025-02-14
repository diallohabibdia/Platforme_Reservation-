"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Permet la navigation entre pages
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Pour rediriger l'utilisateur

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Mot de passe:", password);
    // Ici, tu peux envoyer les infos à ton backend pour la connexion
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connexion</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Se connecter
        </button>
      </form>

      {/* Liens pour créer un compte ou réinitialiser le mot de passe */}
      <div className={styles.links}>
        <p>
          Pas encore de compte ?{" "}
          <span onClick={() => router.push("/register")} className={styles.link}>
            Créez un compte
          </span>
        </p>
        <p>
          Mot de passe oublié ?{" "}
          <span onClick={() => router.push("/forgot-password")} className={styles.link}>
            Réinitialiser
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
