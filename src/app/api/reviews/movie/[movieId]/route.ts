import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { Review } from '../../../../models/Review';  // Asegúrate de que Review esté importado

export async function GET(request: Request, { params }: { params: { movieId: string } }) {
  try {
    // Esperar para asegurar que los parámetros se obtienen correctamente
    const { movieId } = params;  // Usar destructuring para extraer el 'movieId'

    // Conectar a la base de datos
    await connectToDatabase();

    // Buscar reseñas de la película usando 'movieId'
    const reviews = await Review.find({ movie: movieId }).populate('user', 'username');

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las reseñas' }, { status: 500 });
  }
}
