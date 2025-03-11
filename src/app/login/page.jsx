"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import du routeur
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Tous les champs sont requis.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Identifiants incorrects.");
      }

      // Stocker le token en local
      localStorage.setItem("token", data.token);

      // Redirection après connexion réussie
      router.replace("/accueil"); // Redirige vers l'accueil

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError(error.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connexion</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.links}>
        <p>
          Mot de passe oublié ?{" "}
          <span onClick={() => router.push("/forgot-password")} className={styles.link}>
            Réinitialiser
          </span>
        </p>
        <p>
          Pas encore de compte ?{" "}
          <span onClick={() => router.push("/register")} className={styles.link}>
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
