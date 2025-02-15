import { connectToDatabase } from '../../../db/connect';
import { Review } from '../../models/Review';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { content, rating, movieId, userId } = req.body;

    const review = new Review({ content, rating, movie: movieId, user: userId });
    await review.save();

    res.status(201).json({ message: 'Reseña creada exitosamente', review });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}