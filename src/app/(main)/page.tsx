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
  const [page, setPage] = useState(1); // Estado de la página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const router = useRouter();

  // Verificar autenticación
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
    setLoading(true);
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Películas Populares</h1>

       {/* Paginación Componetizada */}
       <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No hay películas disponibles.</p>
      ) : (
        <>         
          {/* Grid de Películas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
