'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import { alertService } from '@/utils/alerts';

interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
  rating: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';  // Obtener el parámetro de búsqueda "q"
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;  // No hacer nada si no hay query

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`/api/movies/search?q=${query}`);  // Pasamos el parámetro 'q' a la URL
        // Verificamos si la respuesta tiene los datos correctos
        if (response.data && response.data.movies) {
          setMovies(response.data.movies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        alertService.error('Error al cargar las películas');
        setError('Error al cargar las películas');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Resultados de búsqueda para: {query}
      </h1>

      {loading && <p className="text-center">Cargando...</p>}
      
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center">No se encontraron películas</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
