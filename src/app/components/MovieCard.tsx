import React from 'react';
import Link from 'next/link';
import IconHeart from './IconHeart';
import IconStar from './IconStar';

interface Movie {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  description: string;
  releaseDate: string;
  numVotes: number;
  genres: string;
  contentRating: string;
  averageRating: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="max-w-[22rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none overflow-hidden">
        <div className="py-7 px-6">
          {/* Imagen */}
          <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
            <img src={movie.primaryImage} alt={movie.primaryTitle} className="w-full h-full object-cover" />
          </div>

          {/* Fecha y Título */}
          <p className="text-primary text-xs mb-1.5 font-bold">{movie.releaseDate}</p>
          <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4 dark:text-white-light">{movie.primaryTitle}</h5>
          <p className="text-white-dark">{movie.description}</p>

          {/* Sección de Autor y Métricas */}
          <div className="relative flex justify-between mt-6 pt-4 before:w-[250px] before:h-[1px] before:bg-white-light before:inset-x-0 before:top-0 before:absolute before:mx-auto dark:before:bg-[#1b2e4b]">
            {/* Autor */}
            <div className="flex items-center font-semibold">
              <div className="w-9 h-9 rounded-full overflow-hidden inline-block mr-2">
                <span className="flex w-full h-full items-center justify-center bg-[#515365] text-white-light">
                  {movie.contentRating}
                </span>
              </div>
              <div className="text-[#515365] dark:text-white-dark">{movie.genres[0]}</div>
            </div>

            {/* Likes y Vistas */}
            <div className="flex font-semibold">
              <div className="text-primary flex items-center mr-3">
                <IconHeart className="w-4 h-4 mr-1" />
                {movie.numVotes}
              </div>
              <div className="text-primary flex items-center">
                <IconStar className="w-4 h-4 mr-1" />
                {movie.averageRating}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
