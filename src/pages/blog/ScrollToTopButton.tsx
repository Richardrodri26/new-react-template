import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react'; // Asegúrate de tener instalado 'lucide-react'

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Cambia 300 por el valor que desees
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Volver arriba"
    >
      <ArrowUp />
    </button>
  );
};
