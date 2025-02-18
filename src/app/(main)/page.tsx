'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { alertService } from '@/utils/alerts';
import { useRouter } from 'next/navigation';

interface Movie {
  id: string;
  title: string;
  image: string;
  description: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);
  const router = useRouter();

  // Verificar autenticación solo al inicio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/login');
      }
    }
  }, [router]);

  // Obtener películas con paginación
  const fetchMovies = useCallback(async () => {
    if (page > 1) setIsPaginating(true);

    try {
      const { data } = await axios.get(`/api/movies?page=${page}&limit=12`);

      if (!Array.isArray(data.movies)) {
        throw new Error("La API no devolvió una lista de películas");
      }

      setMovies(data.movies);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      alertService.error(error.response?.data?.message || 'Error al obtener las películas');
    } finally {
      setLoading(false);
      setIsPaginating(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Panel del Encabezado */}
      <div className="panel mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">Películas Populares</h1>
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
          {movies.length === 0 ? (
            <p className="text-center text-gray-500">No hay películas disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
