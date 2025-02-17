'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Dropdown from './Dropdown';
import IconSearch from './IconSearch';
import IconXCircle from './IconXCircle';
import IconUser from './IconUser';
import IconLogout from './IconLogout';
import { usePathname } from 'next/navigation';
import {useRouter} from 'next/navigation';

interface User {
    username: string;
    email: string;
}

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [search, setSearch] = useState(false);
    const dropdownRef = useRef(null);
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/search?q=${query}`);
    }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <header className="z-40">
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    {/* Logo */}
                    <div className="horizontal-logo flex lg:flex hidden justify-between items-center ml-2">
                        <Link href="/" className="main-logo flex items-center shrink-0">
                            <img className="w-24 -ml-1 inline" src="/images/auth/logo.png" alt="logo" />
                            <span className="text-2xl ml-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-3000">
                                MovieReviews
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="sm:flex-1 ml-auto flex items-center space-x-1.5 lg:space-x-2 dark:text-[#d0d2d6]">
                        <div className="sm:mr-auto">
                            <form className={`${search ? 'block' : 'hidden'} sm:block relative flex-1`} onSubmit={handleSearch}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="form-input pl-9 sm:pr-4 pr-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                        placeholder="Buscar..."
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute w-9 h-9 inset-0 right-auto appearance-none peer-focus:text-primary"
                                    >
                                        <IconSearch className="mx-auto" />
                                    </button>
                                    <button
                                        type="button"
                                        className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 right-2"
                                        onClick={() => setSearch(false)}
                                    >
                                        <IconXCircle />
                                    </button>
                                </div>
                            </form>
                            <button
                                type="button"
                                onClick={() => setSearch(!search)}
                                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                            </button>
                        </div>

                        {/* User Dropdown */}
                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                ref={dropdownRef}
                                offset={[0, 8]}
                                placement="bottom-end"
                                btnClassName="relative group block"
                                button={
                                    <img
                                        className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        src="/images/auth/user.png"
                                        alt="User Profile"
                                    />
                                }
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold bg-white dark:bg-[#1b2e4b] shadow-[0_0_4px_0_rgb(0_0_0_/_10%)] rounded-lg">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img
                                                className="rounded-md w-10 h-10 object-cover"
                                                src="/images/auth/user.png"
                                                alt="User Avatar"
                                            />
                                            <div className="pl-4 truncate">
                                                <h4 className="text-base">
                                                    {user?.username}
                                                </h4>
                                                <button
                                                    type="button"
                                                    className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                >
                                                    {user?.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            href="/usuario"
                                            className="flex items-center px-4 py-2 hover:text-primary dark:hover:text-white"
                                        >
                                            <IconUser className="w-4.5 h-4.5 mr-2 shrink-0" />
                                            Perfil
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link
                                            href="/login"
                                            className="flex items-center px-4 py-3 text-danger hover:text-danger"
                                        >
                                            <IconLogout className="w-4.5 h-4.5 mr-2 rotate-90 shrink-0" />
                                            Cerrar Sesión
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}