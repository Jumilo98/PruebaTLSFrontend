import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  // Validar si el ID de la película existe
  if (!id) {
    return NextResponse.json({ message: 'Falta el ID de la película' }, { status: 400 });
  }

  try {
    // Llamada a la API externa con `axios`
    const response = await axios.get(`https://imdb236.p.rapidapi.com/imdb/${encodeURIComponent(id)}`, {
      headers: {
        'x-rapidapi-key': '406c35f718msh84ec2e173337740p17f35fjsn949d9cde7620',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      },
    });

    // Extraer datos de la respuesta
    const movie = response.data;

    // Verificar si hay datos
    if (!movie) {
      return NextResponse.json({ message: 'No se encontraron resultados para esta película.' }, { status: 404 });
    }

    // Devolver respuesta en formato JSON
    return NextResponse.json({ movie });

  } catch (error: any) {
    // Manejo de errores con `axios`
    const errorMessage = error.response?.data?.message || 'Error al obtener los detalles de la película';
    return NextResponse.json({ message: errorMessage }, { status: error.response?.status || 500 });
  }
}
