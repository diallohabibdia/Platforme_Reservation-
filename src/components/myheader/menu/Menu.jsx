"use client";
import React, { useState } from "react";
import MenuItem from "./MenuItem";
import styles from "./Menu.module.css";
import Image from "next/image";

const links = [
	{ label: "Accueil", path: "/accueil" },
	{ label: "Salles et équipement reservés", path: "/panier" },
	{ label: "Deconnexion", path: "/login" },
];

const Menu = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			{" "}
			{/* On ajouter des fragments qui enveloppe tout le composant */}
			{/*Section de Menu desktop */}
			<div className={styles.menu}>
				<ul className={styles.menuList}>
					{" "}
					{/* On ajouter une classe menuList */}
					{links.map((link, index) => (
						<MenuItem key={index} label={link.label} path={link.path} />
					))}
				</ul>
			</div>
			{/* Bouton menu burger */}
			<button className={styles.menuButton} onClick={() => setOpen(!open)}>
				<Image
					src={open ? "/icons/close.png" : "/icons/menu.png"}
					alt="Menu"
					width={30}
					height={30}
				/>
			</button>
			{/* Section de Menu mobile (s'affiche uniquement si `open` est true) */}
			{open && (
				<div className={styles.mobileMenu}>
					<ul>
						{links.map((link, index) => (
							<MenuItem
								key={index}
								label={link.label}
								path={link.path}
								onClick={() => setOpen(false)} // Ferme le menu après le clic
							/>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default Menu;
