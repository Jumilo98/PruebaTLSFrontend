import React from 'react';

interface Movie {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  description: string;
  releaseDate: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="max-w-[22rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none overflow-hidden">
      <div className="py-7 px-6">
        <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
          <img src={movie.primaryImage} alt={movie.primaryTitle} className="w-full h-full object-cover" />
        </div>
        <p className="text-primary text-xs mb-1.5 font-bold">{movie.releaseDate}</p>
        <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4 dark:text-white-light">{movie.primaryTitle}</h5>
        <p className="text-white-dark">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
