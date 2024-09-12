import React from 'react';

interface TeamCardProps {
  photo: string;
  name: string;
  position: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ photo, name, position }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={photo} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-600">{position}</p>
      </div>
    </div>
  );
};
