import { NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';  // Obtener parámetro 'query'

  if (!query) {
    return NextResponse.json({ message: 'Falta el parámetro de búsqueda' }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'imdb236.p.rapidapi.com',
      port: null,
      path: `/imdb/autocomplete?query=${encodeURIComponent(query)}`,  // Endpoint con el parámetro 'query'
      headers: {
        'x-rapidapi-key': '406c35f718msh84ec2e173337740p17f35fjsn949d9cde7620',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      },
    };

    const req = https.request(options, (res) => {
      const chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        
        try {
          const movies = JSON.parse(body.toString());
          
          // Verificar si la respuesta tiene una estructura válida
          if (Array.isArray(movies)) {
            return resolve(NextResponse.json({ movies }));  // Devolver la lista de películas
          } else {
            // Si no es un array de películas, devolver un error
            return reject(NextResponse.json({ message: 'No se encontraron resultados.' }, { status: 404 }));
          }
        } catch (error) {
          console.error('Error al parsear la respuesta:', error);
          return reject(NextResponse.json({ message: 'Error al procesar la respuesta de la API' }, { status: 500 }));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error al obtener las películas:', error);
      return reject(NextResponse.json({ message: 'Error al obtener las películas' }, { status: 500 }));
    });

    req.end();
  });
}
