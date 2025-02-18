"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import IconSearch from "./IconSearch";
import IconUser from "./IconUser";
import IconLogout from "./IconLogout";
import { usePathname, useRouter } from "next/navigation";
import { alertService } from "@/utils/alerts";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alertService.success("Sesión cerrada correctamente");
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-black">
      <div className="relative flex w-full items-center px-4 sm:px-5 py-2.5">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="main-logo flex items-center">
            <img
              className="w-20 sm:w-24 transition-all duration-300"
              src="/images/auth/logo.png"
              alt="logo"
            />
            <span className="text-xl sm:text-2xl ml-1.5 font-semibold hidden md:inline dark:text-white-light transition-all">
              MovieReviews
            </span>
          </Link>
        </div>

        {/* Barra de Búsqueda */}
        <div className="flex-1 flex items-center justify-center">
          <form className="relative w-full max-w-md" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-input pl-9 pr-4 w-full bg-gray-100 rounded-lg placeholder:text-gray-400"
              placeholder="Buscar películas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <IconSearch />
            </button>
          </form>
        </div>

        {/* Dropdown que molestaba por dependecias :'v*/}
        <Menu as="div" className="relative">
          <Menu.Button className="block">
            <img
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full object-cover hover:opacity-80 transition-all duration-300"
              src="/images/auth/user.png"
              alt="User Profile"
            />
          </Menu.Button>

          <Menu.Items
            className="absolute right-0 mt-2 w-48 sm:w-56 bg-white dark:bg-[#1b2e4b] shadow-lg rounded-lg overflow-hidden z-50 focus:outline-none"
          >
            <div className="py-2">
              <Menu.Item>
                {({ active }) => (
                  <div className="px-4 py-3 flex items-center border-b border-gray-200 dark:border-gray-600">
                    <img
                      className="rounded-md w-9 h-9 object-cover"
                      src="/images/auth/user.png"
                      alt="User Avatar"
                    />
                    <div className="pl-3 truncate">
                      <h4 className="text-sm sm:text-base font-semibold">
                        {user?.username || "Usuario"}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {user?.email || "Sin correo"}
                      </p>
                    </div>
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={`flex items-center px-4 py-2 ${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    <IconUser className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Perfil
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center w-full px-4 py-3 text-danger ${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    <IconLogout className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
