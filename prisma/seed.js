const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Fonction pour hacher un mot de passe
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Fonction pour vérifier si un utilisateur existe avant de le créer
async function findOrCreateUser(data) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
  
    if (existingUser) return existingUser;
  
    // Hachage du mot de passe avant la création
    const hashedPassword = await hashPassword(data.password);
    console.log("Mot de passe haché avant insertion : ", hashedPassword);  // Affiche le mot de passe haché
    return await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

// Fonction pour vérifier si une salle existe avant de la créer
async function findOrCreateSalle(salleData) {
  const existingSalle = await prisma.salle.findUnique({
    where: { title: salleData.title },
  });

  return existingSalle || await prisma.salle.create({ data: salleData });
}

// Fonction pour vérifier si un équipement existe avant de le créer
async function findOrCreateEquipement(equipementData) {
  const existingEquipement = await prisma.equipement.findFirst({
    where: { name: equipementData.name },
  });

  return existingEquipement || await prisma.equipement.create({ data: equipementData });
}

async function main() {
  try {
    console.log("🔄 Initialisation des données...");

    // Création des utilisateurs
    const adminUser = await findOrCreateUser({
      username: 'admin',
      email: 'admin@localhost.com',
      password: 'admin123',
      role: 'ADMIN',
    });

    const etudiantUser = await findOrCreateUser({
      username: 'etudiant',
      email: 'etudiant@localhost.com',
      password: 'etudiant123',
      role: 'USER',
    });

    const professeurUser = await findOrCreateUser({
      username: 'professeur',
      email: 'professeur@localhost.com',
      password: 'professeur123',
      role: 'USER',
    });

    console.log("✅ Utilisateurs créés ou récupérés.");

    // Création des salles
    const sallesData = [
      { title: 'Salle A', capacite: 20, localisation: 'Étage 1, Bloc A', batiment: 'Bâtiment A', description: 'Salle de cours', imageUrl: '/images/salleInfo.png' },
      { title: 'Salle B', capacite: 50, localisation: 'Étage 2, Bloc B', batiment: 'Bâtiment B', description: 'Salle de TP', imageUrl: '/images/salleLabo.png' },
      { title: 'Salle C', capacite: 30, localisation: 'Étage 3, Bloc C', batiment: 'Bâtiment C', description: 'Salle de cours', imageUrl: '/images/F3120.png' },
    ];

    const salles = await Promise.all(sallesData.map(findOrCreateSalle));
    console.log("✅ Salles créées ou récupérées.");

    // Création des équipements
    const equipementsData = [
      { name: 'Projecteur', imageUrl: '/images/projecteur.png' },
      { name: 'Microphone sans fil', imageUrl: '/images/microphone.png' },
      { name: 'Tableau blanc', imageUrl: '/images/tableau.png' },
      { name: 'Table de conférence', imageUrl: '/images/table-conference.png' },
      { name: 'Ordinateur portable', imageUrl: '/images/ordinateur.png' },
    ];

    const equipements = await Promise.all(equipementsData.map(findOrCreateEquipement));
    console.log("✅ Équipements créés ou récupérés.");

    // Vérification des données avant la réservation
    if (!etudiantUser || salles.length < 3 || equipements.length < 5) {
      console.error("❌ Erreur : Pas assez de salles, d’équipements ou utilisateur inexistant.");
      return;
    }

    // Création d'une réservation
    const reservation = await prisma.reservation.create({
        data: {
          userId,
          salleId,
          date: new Date(date),
          heure,
        },
      });
      

    console.log("✅ Réservation créée avec succès.");
  } catch (e) {
    console.error("❌ Erreur dans la fonction principale :", e.message);
    console.error(e.stack);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction principale
main();
