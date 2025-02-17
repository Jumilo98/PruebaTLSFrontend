import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../db/connect';
import { User } from '../../../../models/User';  // Asegúrate de importar el modelo User
import { Review } from '../../../../models/Review';  // Asegúrate de que Review esté importado
import jwt from 'jsonwebtoken';

export async function GET(request: Request, { params }: { params: { movieId: string } }) {
  const { movieId } = await params;  // Esperar a obtener 'movieId' desde los parámetros de la ruta

  try {
    await connectToDatabase();

    // Buscar reseñas de la película usando 'movieId'
    const reviews = await Review.find({ movie: movieId }).populate('user', 'username');
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener las reseñas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        // Manejar el error de expiración del token
        return NextResponse.json({ message: 'El token ha expirado, por favor inicie sesión nuevamente.' }, { status: 401 });
      }
      // Otro tipo de error JWT (como mal formato)
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

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
