import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface PlanCardProps {
  image: string;
  title: string;
  description: string;
  price: string; // El precio original en formato de cadena
  discount?: number; // Porcentaje de descuento
}

// Función para calcular el precio con descuento
const calculateDiscountedPrice = (price: number, discount: number): number => {
  return parseFloat((price * (1 - discount / 100)).toFixed(2));
};

// Función para calcular el precio original basado en el precio con descuento
const calculateOriginalPrice = (price: number, discount: number): number => {
  return parseFloat((price / (1 - discount / 100)).toFixed(2));
};

export const PlanCard: React.FC<PlanCardProps> = ({ image, title, description, price, discount }) => {
  // Convertir el precio de cadena a número y manejar posibles errores
  const validPrice = !isNaN(parseFloat(price)) ? parseFloat(price) : 0;
  const validDiscount = typeof discount === 'number' && !isNaN(discount) ? discount : 0;

  // Calcular el precio con descuento y el precio original
  const discountedPrice = validDiscount ? calculateDiscountedPrice(validPrice, validDiscount) : validPrice;
  const originalPrice = validDiscount ? calculateOriginalPrice(discountedPrice, validDiscount) : null;

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {validDiscount > 0 && (
        <div className="absolute top-4 left-4 bg-red-600 text-white py-1 px-3 text-xs font-bold uppercase transform rotate-[-45deg] -translate-x-3 translate-y-3">
          <span>{validDiscount}% OFF</span>
        </div>
      )}
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          {originalPrice !== null && (
            <span className="text-gray-500 line-through text-lg">${originalPrice.toFixed(2)}</span>
          )}
          <span className="text-xl font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
          <button className="flex items-center bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
            <ShoppingCart className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
