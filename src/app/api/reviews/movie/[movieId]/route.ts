import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { Review } from '../../../../models/Review';
import { validateObjectId } from '../../../../../utils/validateObjectId';

export async function GET(request: Request, { params }: { params: { movieId: string } }) {
  try {
    await connectToDatabase();

    if (!validateObjectId(params.movieId)) {
      return NextResponse.json({ message: 'ID de película no válido' }, { status: 400 });
    }

    const reviews = await Review.find({ movie: params.movieId }).populate('user', 'username');
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las reseñas' }, { status: 500 });
  }
}