import React from "react";
import Logo from "./Logo";
import Menu from "./menu/Menu";
import styles from "./Myheader.module.css";

const Myheader = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.menu}>
        <Menu />
      </div>
    </div>
  );
};

export default Myheader;
