"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MenuItem.module.css";

const MenuItem = ({ label, path, onClick }) => {
	const pathname = usePathname();
	const isActive = pathname === path; // Vérifie si le lien est actif

	return (
		<li
			className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
			onClick={onClick}
		>
			<Link href={path}>{label}</Link>
		</li>
	);
};

export default MenuItem;
