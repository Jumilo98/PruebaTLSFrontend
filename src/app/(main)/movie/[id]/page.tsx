'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { alertService } from '@/utils/alerts';
import axios from "axios";

interface Movie {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  description: string;
  releaseDate: string;
  genres: string[];
  averageRating: number;
  numVotes: number;
  contentRating: string;
  externalLinks: string[];
}

interface Review {
  user: string;
  content: string;
  rating: number;
}

export default function MovieDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        console.log("Obteniendo detalles de la película...", id);
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data.movie);  // Asumimos que la respuesta contiene la clave `movie`
      } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/movie/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error al obtener reseñas:", error);
      }
    };

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMovie(), fetchReviews()]);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alertService.error("Debes iniciar sesión para publicar una reseña.");
      return;
    }

    const newReview = { content: comment, rating, movieId: id };

    try {
      const res = await axios.post(`/api/reviews/movie/${id}`, newReview, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        setReviews((prevReviews) => [...prevReviews, res.data.review]);
        setComment("");
        setRating(5);
      } else {
        alert("Error al publicar la reseña.");
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!movie) return <p>Error al cargar la película.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{movie.primaryTitle}</h1>
      <img src={movie.primaryImage} alt={movie.primaryTitle} className="w-full h-96 object-cover my-4" />
      <p>{movie.description}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Información adicional</h3>
        <ul className="list-none">
          <li><strong>Géneros:</strong> {movie.genres.join(", ")}</li>
          <li><strong>Calificación promedio:</strong> {movie.averageRating} ⭐</li>
          <li><strong>Votos:</strong> {movie.numVotes}</li>
          <li><strong>Clasificación de contenido:</strong> {movie.contentRating}</li>
          <li><strong>Fecha de estreno:</strong> {movie.releaseDate}</li>
        </ul>

        {movie.externalLinks && movie.externalLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">Enlaces externos</h4>
            <ul className="list-none">
              {movie.externalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Reseñas</h2>

        <div className="my-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Escribe tu reseña..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex items-center mt-2">
            <label className="mr-2">Calificación:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-1 w-16"
            />
          </div>
          <button
            onClick={handleReviewSubmit}
            className="mt-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Publicar Reseña
          </button>
        </div>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <p>
                <strong>{review.user || "Usuario anónimo"}</strong> - {review.rating}⭐
              </p>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>Aún no hay reseñas. ¡Sé el primero en escribir una!</p>
        )}
      </div>
    </div>
  );
}
