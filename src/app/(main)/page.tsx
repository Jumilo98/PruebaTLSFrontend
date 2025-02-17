'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { alertService } from '@/utils/alerts';
import { useRouter } from 'next/navigation';  // Importamos useRouter

interface Movie {
  id: string;
  title: string;
  image: string;
  description: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();  // Inicializamos el enrutador

  useEffect(() => {
    const user = localStorage.getItem('user');  // Verificamos si el usuario existe en localStorage

    if (!user) {
      // Si no hay usuario, redirigimos a la página de login
      router.push('/login');
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies');
        setMovies(response.data);
      } catch (error) {
        alertService.error('Error al obtener las películas');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [router]);  // Añadimos router en las dependencias para que se recargue cuando cambie

  if (loading) {
    return <div>Cargando películas...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Películas Populares</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
