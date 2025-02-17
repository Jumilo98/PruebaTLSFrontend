import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { Review } from '../../../../models/Review';  // Asegúrate de que Review esté importado

export async function GET(request: Request, { params }: { params: { movieId: string } }) {
  // Debes esperar a que los parámetros se extraigan correctamente
  const { movieId } = await params;  // Esperar a obtener 'movieId' desde los parámetros de la ruta

  try {
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
