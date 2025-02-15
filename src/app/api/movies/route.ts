import { connectToDatabase } from '../../../db/connect';
import { Movie } from '../../models/Movie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}