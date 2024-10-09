import React from 'react';

export const NavbarPage: React.FC = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src="image.png" alt="Logo" className="h-10" />
          <span className="text-2xl font-bold text-gray-900">Mi Página</span>
        </div>

        {/* Buscador */}
        <div className="flex flex-grow mt-4 md:mt-0 md:max-w-md">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="ml-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black">
            Buscar
          </button>
        </div>

        {/* Opciones de navegación */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center mt-4 md:mt-0">
          <a href="#plans" className="text-gray-900 hover:text-black">Planes</a>
          <a href="#aboutus" className="text-gray-900 hover:text-black">Conocemos</a>
          <a href="#team" className="text-gray-900 hover:text-black">Equipo</a>
          <a href="#contactus" className="text-gray-900 hover:text-black">Contáctanos</a>
          <a href="/signin">
            <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black">
              Sign In
            </button>
          </a>
          <a href="/login">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Login
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};
