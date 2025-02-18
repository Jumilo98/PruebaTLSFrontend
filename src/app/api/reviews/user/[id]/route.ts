import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { Review } from '../../../../models/Review';
import { User } from '../../../../models/User';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Asegúrate de que params esté disponible
    const { id } = await params;
    await connectToDatabase();

    // Buscar reseñas del usuario
    const reviews = await Review.find({ user: id }).populate('movie', 'title');
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener las reseñas del usuario' }, { status: 500 });
  }
}
