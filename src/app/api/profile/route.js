import { verifyToken } from '../../utils/auth';

export default async function handler(req, res) {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Accès non autorisé' });

  res.status(200).json({ message: 'Données protégées', user });
}
