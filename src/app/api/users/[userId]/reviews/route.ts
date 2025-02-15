import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { Review } from '../../../../models/Review';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    await connectToDatabase();

    const reviews = await Review.find({ user: params.userId }).populate('movie', 'title');
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las reseñas del usuario' }, { status: 500 });
  }
}