import React from "react";
import styles from "./Myfooter.module.css"; // Import du fichier CSS

const Footer = () => {
  return (

    <footer className={styles.footer}>

      <div className={styles.container}>
        {/* Texte du footer */}
        <p>© {new Date().getFullYear()} Réservation Universitaire. Tous droits réservés.</p>

        {/* Liens utiles */}
        <nav className={styles.links}>
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/confidentialite">Politique de confidentialité</a>
          <a href="/contact">Contact</a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
