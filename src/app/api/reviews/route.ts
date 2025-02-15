import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../db/connect';
import { Review } from '../../models/Review';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const userId = decoded.userId;

    const { content, rating, movieId } = await request.json();

    const review = new Review({ content, rating, movie: movieId, user: userId });
    await review.save();

    return NextResponse.json({ message: 'Reseña creada exitosamente', review }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear la reseña' }, { status: 500 });
  }
}