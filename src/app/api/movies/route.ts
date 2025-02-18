import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  try {
    // Obtener parámetros de la URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    // Llamada a la API externa
    const response = await axios.get('https://imdb236.p.rapidapi.com/imdb/top250-movies', {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      },
    });

    const movies = Array.isArray(response.data) ? response.data : [];

    // Calcular paginación manualmente
    const startIndex = (page - 1) * limit;
    const paginatedMovies = movies.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      movies: paginatedMovies,
      totalMovies: movies.length,
      currentPage: page,
      totalPages: Math.ceil(movies.length / limit),
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener las películas' }, { status: 500 });
  }
}
