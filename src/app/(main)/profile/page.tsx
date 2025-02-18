'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IconCoffee from '../../components/IconCoffee';
import IconCalendar from '../../components/IconCalendar';
import IconMapPin from '../../components/IconMapPin';
import IconMail from '../../components/IconMail';
import IconPhone from '../../components/IconPhone';
import IconTwitter from '../../components/IconTwitter';
import IconGithub from '../../components/IconGithub';
import axios from 'axios';
import { alertService } from '@/utils/alerts';

interface User {
    _id: number
    username: string;
    email: string;
}

interface Review {
    content: string;
    rating: number;
    movie: string;
    createdAt: string;
}

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoaded, setReviewsLoaded] = useState(false); // Nueva variable de estado para controlar la carga de reseñas
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // Si no hay usuario en el localStorage, redirigir a login
            router.push('/login');
        } else {
            const userData = JSON.parse(storedUser);
            setUser(userData);
        }
    }, [router]);

     useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/reviews/user/${user?._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReviews(response.data); // Asumimos que la respuesta contiene las reseñas del usuario
                setReviewsLoaded(true); // Marcar como cargadas las reseñas
            } catch (error) {
               alertService.error('Error al cargar las reseñas');
            }
        };

        if (user && !reviewsLoaded) {
            fetchReviews();
        }
    }, [user, reviewsLoaded]);

    if (!user) {
        return <div>Cargando...</div>; // Aseguramos que no se renderice el contenido hasta que haya un usuario
    }

    return (
        <div>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/images/auth/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">{user.username}</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <IconCoffee className="shrink-0" />
                                    {user.work ?? 'undefined'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconCalendar className="shrink-0" />
                                    {user.birthdate ?? 'undefined'}
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconMapPin className="shrink-0" />
                                    {user.location ?? 'undefined'}
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">{user.email}</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IconPhone />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        {user.phone ?? 'undefined'}
                                    </span>
                                </li>
                            </ul>
                            <ul className="mt-7 flex items-center justify-center gap-2">
                                <li>
                                    <button className="btn btn-info flex items-center justify-center rounded-full w-10 h-10 p-0">
                                        <IconTwitter className="w-5 h-5" />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-dark flex items-center justify-center rounded-full w-10 h-10 p-0">
                                        <IconGithub />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        {/* Título Centrado en Móvil y Pantallas Grandes */}
                        <div className="flex justify-center mb-5">
                            <h5 className="font-bold text-lg dark:text-white-light text-center w-full">
                                Historial de Reseñas
                            </h5>
                        </div>

                        {/* Contenedor de Reseñas en Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reviews.length === 0 ? (
                                <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                                    No tienes reseñas realizadas.
                                </p>
                            ) : (
                                reviews.map((review) => (
                                    <div 
                                        key={review._id} 
                                        className="border border-[#ebedf2] dark:border-[#1b2e4b] p-4 bg-white dark:bg-[#1b2e4b] shadow-md rounded-lg"
                                    >
                                        <h6 className="text-[#515365] font-semibold dark:text-white-dark truncate">
                                            🎬 Película: {review.movie}
                                        </h6>
                                        <p className="text-yellow-500 font-medium">⭐ {review.rating}/5</p>
                                        <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
                                        <p className="text-xs text-[#6c757d] mt-2">
                                            🕒 Publicado el: {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
