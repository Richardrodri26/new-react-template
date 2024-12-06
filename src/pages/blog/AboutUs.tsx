import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <section id="aboutus" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">¿Quiénes Somos?</h2>
        
        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {/* Información de la empresa */}
          <div className="flex-1 rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">Nuestra Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              En [Nombre de la Empresa], nuestra misión es proporcionar soluciones de energía limpia y sostenible que promuevan un futuro más verde y saludable. Estamos comprometidos con la innovación y la eficiencia para satisfacer las necesidades energéticas de nuestros clientes mientras cuidamos del medio ambiente.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-8 mt-12">
          <div className="flex-1 rounded-lg shadow-lg p-8 transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">Visión a Futuro</h3>
            <p className="text-gray-700 leading-relaxed">
              Nuestra visión es ser líderes en el sector de energías renovables, contribuyendo a la creación de un mundo más sostenible. A través de la investigación y el desarrollo, buscamos avanzar en tecnologías limpias que optimicen el uso de los recursos naturales y reduzcan el impacto ambiental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
