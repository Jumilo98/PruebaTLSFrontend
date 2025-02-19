import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  try {
    // Extraer parámetros de la URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || ""; // Parámetro de búsqueda
    const page = parseInt(searchParams.get("page") || "1", 10); // Página actual
    const limit = parseInt(searchParams.get("limit") || "12", 10); // Resultados por página

    if (!query) {
      return NextResponse.json({ message: "Falta el parámetro de búsqueda" }, { status: 400 });
    }
    
    // Llamada a la API de IMDB con Axios
    const response = await axios.get("https://imdb236.p.rapidapi.com/imdb/autocomplete", {
      params: { query },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    });

    // **Siempre devuelve un array**, así que lo tomamos directamente
    const movies = response.data.map((movie: any) => ({
      id: movie.id || "", 
      primaryTitle: movie.primaryTitle || "", 
      year: movie.year || "", 
      primaryImage: movie.primaryImage ? movie.primaryImage : null, // 
      type: movie.type || "", 
      releaseDate: movie.releaseDate || "", 
      contentRating: movie.contentRating || "", 
      genres: movie.genres || "", 
      numVotes: movie.numVotes || "", 
      averageRating: movie.averageRating || 0, 
      description: movie.description || "",
    }));
    
    
    // Aplicar paginación manualmente
    const totalMovies = movies.length;
    const totalPages = Math.ceil(totalMovies / limit);
    const paginatedMovies = movies.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      movies: paginatedMovies,
      totalMovies,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener las películas" }, { status: 500 });
  }
}
