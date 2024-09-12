import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin  as LinkedIn} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Redes Sociales */}
          <div className="flex gap-4 mb-8 lg:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <LinkedIn size={24} />
            </a>
          </div>

          {/* Derechos de Autor */}
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <p>&copy; {new Date().getFullYear()} [Nombre de la Empresa]. Todos los derechos reservados.</p>
          </div>

          {/* Enlaces */}
          <div className="flex flex-col lg:flex-row gap-8 text-center lg:text-right">
            <a href="#aboutus" className="hover:text-gray-400">¿Quiénes Somos?</a>
            <a href="#plans" className="hover:text-gray-400">Nuestros Planes</a>
            <a href="#contactus" className="hover:text-gray-400">Contáctanos</a>
            <a href="#team" className="hover:text-gray-400">Equipo</a>
            <a href="/privacy-policy" className="hover:text-gray-400">Política de Privacidad</a>
            <a href="/terms-of-service" className="hover:text-gray-400">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
