import React from 'react'
import Card from '../../components/card/Card'
import Image from 'next/image'
const PageAccueil = () => {
  return (
    <div >
    <Card
      title="Réserver une salle"
      description="Bésoin d'une salle pour vos réunions, cours ou evenement ?
Réservez facilement parmi une séléction de salles équipées et adaptées a vos besoinsé"
      buttonLabel="Voir les salles disponibles" buttonPath="/salles"
    />

    <Card
      title="Location d'équipeents"
      description="Louez des équipements modernes tels que des projecteurs, des microphones et des systemes 
de sonorisation pour vos événements ou présentations."
      buttonLabel="Explorer les équipements" buttonPath="/equipements"
    />

    {/* Ajout de l'image après les Card */}
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        marginTop: "30px",
        marginLeft: "10px",
      }}
    >
      <Image
        src="/images/salleDemo.png" // Remplace par le chemin de ton image
        alt="Salle de réunion"
        width={1200} // Ajuste la largeur selon tes besoins
        height={400} // Ajuste la hauteur selon tes besoins
      />
    </div>
    
  </div>
  )
}

export default PageAccueil