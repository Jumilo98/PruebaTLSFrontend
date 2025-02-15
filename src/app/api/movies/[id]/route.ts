import { NextResponse } from 'next/server';
import axios from 'axios';

const IMDB_API_KEY = process.env.IMDB_API_KEY;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await axios.get(`https://api.imdb.com/movie/${params.id}?apikey=${IMDB_API_KEY}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener detalles de la película' }, { status: 500 });
  }
}