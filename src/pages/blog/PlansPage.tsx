import React, { useState } from 'react';
import { PlanCard } from './PlanCard';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allPlans = [
  {
    image: 'https://images.pexels.com/photos/4201056/pexels-photo-4201056.jpeg',
    title: 'Plan A',
    description: 'Comprehensive plan with essential features.',
    price: '99.99',
    discount: 23
  },
  {
    image: 'https://images.pexels.com/photos/1239297/pexels-photo-1239297.jpeg',
    title: 'Plan B',
    description: 'Includes advanced features for better performance.',
    price: '149.99',
  },
  {
    image: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
    title: 'Plan C',
    description: 'Premium plan with all top features.',
    price: '199.99',
    discount: 20
  },
  {
    image: 'https://images.pexels.com/photos/1866144/pexels-photo-1866144.jpeg',
    title: 'Plan D',
    description: 'Basic plan for minimal needs.',
    price: '49.99',
  },
  {
    image: 'https://images.pexels.com/photos/1866143/pexels-photo-1866143.jpeg',
    title: 'Plan E',
    description: 'Standard plan with additional features.',
    price: '129.99',
    discount: 15
  },
  {
    image: 'https://images.pexels.com/photos/4201056/pexels-photo-4201056.jpeg',
    title: 'Plan F',
    description: 'Enhanced plan with extra benefits.',
    price: '179.99',
  },
  {
    image: 'https://images.pexels.com/photos/1239297/pexels-photo-1239297.jpeg',
    title: 'Plan G',
    description: 'Advanced plan with premium support.',
    price: '239.99',
    discount: 10
  },
  {
    image: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
    title: 'Plan H',
    description: 'Ultimate plan with all features and priority support.',
    price: '299.99',
    discount: 25
  }
];

export const PlansPage: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 4;

  // Calcula los planes a mostrar
  const displayedPlans = showAll
    ? allPlans
    : allPlans.slice(0, plansPerPage);

  // Calcula el número de páginas
  const totalPages = Math.ceil(allPlans.length / plansPerPage);

  // Función para cambiar la página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowAll(false);
  };

  // Función para mostrar todos los planes
  const handleShowAll = () => {
    setShowAll(true);
    setCurrentPage(1); // Resetea a la primera página al mostrar todos
  };

  return (
    <section id="plans" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Título de la sección */}
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Nuestros Planes</h2>
        
        <div className="flex justify-end mb-12">
          {!showAll && (
            <button
              className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
              onClick={handleShowAll}
            >
              <ArrowRight className="mr-2" />
              Ver Todos
            </button>
          )}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {displayedPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <PlanCard
                  image={plan.image}
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  discount={plan.discount}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {showAll && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-lg border ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
