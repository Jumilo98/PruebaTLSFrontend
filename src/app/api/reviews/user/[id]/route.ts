import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { Review } from '../../../../models/Review';
import { User } from '../../../../models/User';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    // Asegúrate de que params esté disponible
    const { userId } = await params;

    await connectToDatabase();

    // Buscar reseñas del usuario
    const reviews = await Review.find({ id: userId }).populate('movie', 'title');
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las reseñas del usuario' }, { status: 500 });
  }
}
