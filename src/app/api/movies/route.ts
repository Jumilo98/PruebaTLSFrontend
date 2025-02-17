import { NextResponse } from 'next/server';
import https from 'https';

export async function GET() {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'imdb236.p.rapidapi.com',
      port: null,
      path: '/imdb/top250-movies',
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
        const movies = JSON.parse(body.toString());
        resolve(NextResponse.json(movies));
      });
    });

    req.on('error', (error) => {
      reject(NextResponse.json({ message: 'Error al obtener las películas' }, { status: 500 }));
    });

    req.end();
  });
}