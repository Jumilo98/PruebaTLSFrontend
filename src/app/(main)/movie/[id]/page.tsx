"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { alertService } from "@/utils/alerts";
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
  user: { username: string } | null;
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
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      alertService.error("No se encontró el ID de la película.");
      return;
    }

    // Obtener usuario actual de localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user.username);
      } catch (error) {
        alertService.error("Error al obtener el usuario actual.");
      }
    }

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data.movie);
      } catch (error) {
        alertService.error("Error al obtener la información de la película.");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/movie/${id}`);
        setReviews(res.data || []);
      } catch (error) {
        alertService.error("Error al obtener las reseñas.");
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMovie(), fetchReviews()]);
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
        alertService.success("Reseña enviada correctamente.");
        setReviews((prevReviews) => [...prevReviews, res.data.review]);
        setComment("");
        setRating(5);
      } else {
        alertService.error("Error al enviar la reseña.");
      }
    } catch (error) {
      alertService.error("No se pudo enviar la reseña.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Cargando...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error al cargar la película.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          {movie.primaryTitle}
        </h1>

        {/* GRID RESPONSIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 🎬 SECCIÓN IZQUIERDA - Información de la Película */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            {/* 📸 Imagen (Se adapta en móviles) */}
            <img
              src={movie.primaryImage}
              alt={movie.primaryTitle}
              className="w-full max-w-sm md:max-w-[350px] max-h-[400px] object-contain rounded-lg shadow-md"
            />

            {/* 📖 Detalles */}
            <p className="text-lg text-gray-700 dark:text-gray-300">{movie.description}</p>
            <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>🎭 Géneros:</strong> {movie.genres.join(", ")}</li>
              <li><strong>⭐ Calificación promedio:</strong> {movie.averageRating}</li>
              <li><strong>📊 Votos:</strong> {movie.numVotes}</li>
              <li><strong>🔞 Clasificación:</strong> {movie.contentRating}</li>
              <li><strong>📅 Fecha de estreno:</strong> {movie.releaseDate}</li>
            </ul>

            {/* 🔗 Enlaces Externos */}
            {movie.externalLinks?.length > 0 && (
  <div className="mt-4">
    <h4 className="text-lg font-semibold mb-2">📌 Enlaces externos</h4>
    
    {/* Contenedor con Scroll horizontal si es necesario */}
    <div className="overflow-x-auto">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {movie.externalLinks.map((link, index) => (
          <li key={index} className="w-full">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words truncate block text-sm md:text-base p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

          </div>

          {/* 📝 SECCIÓN DERECHA - Reseñas */}
          <div className="flex flex-col space-y-6">
            {/* ✍️ Formulario de Reseña */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Deja tu reseña</h2>
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
                className="mt-3 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 w-full rounded"
              >
                Publicar Reseña
              </button>
            </div>

            {/* 📜 Lista de Reseñas (Adaptable en móviles) */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow overflow-y-auto max-h-[500px]">
              <h2 className="text-xl font-bold">📖 Reseñas</h2>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="border-b py-3">
                    <p><strong>{review.user?.username || currentUser || "Usuario anónimo"}</strong> - {review.rating}⭐</p>
                    <p className="text-gray-600 dark:text-gray-300">{review.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">Aún no hay reseñas. ¡Sé el primero en escribir una!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
