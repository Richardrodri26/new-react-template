import React from 'react';
import { TeamCard } from './TeamCard'; // Asegúrate de que la ruta sea correcta

const teamMembers = [
  {
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', // Imagen de ejemplo
    name: 'Ana García',
    position: 'CEO',
  },
  {
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', // Imagen de ejemplo
    name: 'Carlos Martínez',
    position: 'CTO',
  },
  {
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', // Imagen de ejemplo
    name: 'Laura Fernández',
    position: 'CMO',
  },
  {
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', // Imagen de ejemplo
    name: 'José Pérez',
    position: 'Lead Developer',
  },
  // Añadir más miembros del equipo aquí
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              photo={member.photo}
              name={member.name}
              position={member.position}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
