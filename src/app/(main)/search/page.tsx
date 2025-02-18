'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import { alertService } from '@/utils/alerts';

interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
  rating: string;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';  // Obtener el parámetro de búsqueda "q"
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);

  // Función para buscar películas con paginación
  const fetchMovies = useCallback(async () => {
    if (!query) return;

    setIsPaginating(true);
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.get(`/api/movies/search?q=${query}&page=${page}&limit=12`);

      if (data && data.movies) {
        setMovies(data.movies);
        setTotalPages(data.totalPages || 1);
      } else {
        setMovies([]);
      }
    } catch (error) {
      alertService.error('Error al cargar las películas');
      setError('Error al cargar las películas');
    } finally {
      setLoading(false);
      setIsPaginating(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Panel del Encabezado */}
      <div className="panel mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Resultados para: "{query}"
        </h1>
      </div>

      {/* Paginación Arriba (Ahora con scroll horizontal en móviles) */}
      <div className="flex justify-center">
        <div className="overflow-x-auto w-full">
          <Pagination page={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
        </div>
      </div>

      {/* Panel de Películas */}
      <div className="panel">        
        <div className={`transition-opacity ${isPaginating ? 'opacity-50' : 'opacity-100'}`}>
          {loading && <p className="text-center text-gray-500">Cargando...</p>}

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          {!loading && !error && movies.length === 0 && (
            <p className="text-center text-gray-500">No se encontraron películas.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="text-center">Cargando...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
