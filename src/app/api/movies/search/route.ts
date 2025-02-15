import { NextResponse } from 'next/server';
import axios from 'axios';

const IMDB_API_KEY = process.env.IMDB_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  try {
    const response = await axios.get(`https://api.imdb.com/search?q=${query}&apikey=${IMDB_API_KEY}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al buscar películas' }, { status: 500 });
  }
}