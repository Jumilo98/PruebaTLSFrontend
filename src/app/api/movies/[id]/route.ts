import { NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const movieId = params.id;  // Obtener el 'id' directamente desde el path de la URL

  if (!movieId) {
    return NextResponse.json({ message: 'Falta el ID de la película' }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'imdb236.p.rapidapi.com',
      port: null,
      path: `/imdb/${encodeURIComponent(movieId)}`,  // Usamos el 'movieId' como el ID de la película
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
          const movie = JSON.parse(body.toString());
          console.log('Película:', movie);

          // Verificar si la respuesta es válida
          if (movie) {
            return resolve(NextResponse.json({ movie }));
          } else {
            return reject(NextResponse.json({ message: 'No se encontraron resultados para esta película.' }, { status: 404 }));
          }
        } catch (error) {
          console.error('Error al parsear la respuesta:', error);
          return reject(NextResponse.json({ message: 'Error al procesar la respuesta de la API' }, { status: 500 }));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Error al obtener los detalles de la película:', error);
      return reject(NextResponse.json({ message: 'Error al obtener los detalles de la película' }, { status: 500 }));
    });

    req.end();
  });
}
