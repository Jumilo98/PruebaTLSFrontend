import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://imdb236.p.rapidapi.com/imdb/top250-movies', {
      headers: {
        'x-rapidapi-key': '406c35f718msh84ec2e173337740p17f35fjsn949d9cde7620',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      },
    });
    
    // Verificar si la API devuelve un array
    if (!Array.isArray(response.data)) {
      return NextResponse.json({ message: "Error: La API no devolvió una lista de películas" }, { status: 500 });
    }

    // Tomar solo las primeras 12 películas
    const movies = response.data.slice(0, 12);

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({
      message: 'Error interno del servidor',
      error: error.message || error.toString(),
    }, { status: 500 });
  }
}
