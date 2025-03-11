"use client";
import Image from "next/image";
import styles from "./globals.css"
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <header className="header">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-2">
          <span className="text-5xl"></span> Bienvenue sur votre platforme de reservation
        </h1>
        <p className="text-gray-600 mt-2 text-lg">La platforme  vous offre la simplicité de réserver vos <span className="text-blue-500 font-semibold">salles </span> </p>
      </header>

      {/* Steps Section */}
      <div className="steps mt-6">
        <div className="step">
          <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">1</span>
          <p className="text-sm mt-2">Créer un compte</p>
        </div>
        <div className="line h-1 w-10 bg-blue-300"></div>
        <div className="step">
          <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">2</span>
          <p className="text-sm mt-2">Réservez votre salle</p>
        </div>
        <div className="line h-1 w-10 bg-blue-300"></div>
        <div className="step">
          <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">3</span>
          <p className="text-sm mt-2">Gérez vos réservations</p>
        </div>
      </div>

      {/* Buttons */}
      <div className={"mt-6 flex gap-8 steps "} >
        <Link href="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 ">Se connecter</button>
        </Link>
        <Link href="/register">
          <button className="border-blue-500 text-blue-500 px-6 py-2 rounded-lg shadow hover:bg-blue-500 hover:text-white">Sinscrire</button>
        </Link>
      </div>
    </div>
  );
}
