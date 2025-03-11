"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Utilisation de next/navigation pour éviter l'erreur
import Image from 'next/image';
import styles from './Register.module.css'; // Inclure le CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    // Envoi des données (simulation d'une inscription réussie)
    setError('');
    // Redirection vers la page de connexion après l'inscription réussie
    router.push('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>S'inscrire</h2>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            S'inscrire
          </button>
        </form>

        <p className={styles.redirect}>
          Vous avez déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>

     
    </div>
  );
};

export default Register;
