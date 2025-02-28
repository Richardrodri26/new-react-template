// src/components/TablaIVA.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatCurrency } from './marcasVenta';

interface IvaData {
  Nombre: string;
  B1: number;
  B2: number;
  B3: number;
  B4: number;
  B5: number;
  B6: number;
}
function agregarIvaAComprar(data: IvaData[]): IvaData[] {
  const ivaDiferencia = data.find(item => item.Nombre === "Diferencia");
  const ivaIdeal = data.find(item => item.Nombre === "IvaIdeal");

  if (ivaDiferencia && ivaIdeal) {
    const newItem: IvaData = {
      Nombre: "IvaAComprar",
      B1: 0,
      B2: 0,
      B3: 0,
      B4: 0,
      B5: 0,
      B6: 0
    };

    // Calculando cada B por separado
    for (let i = 1; i <= 6; i++) {
      const diferenciaValue = +ivaDiferencia[`B${i}` as keyof IvaData];
      const ivaIdealValue = +ivaIdeal[`B${i}` as keyof IvaData];

      if (diferenciaValue !== null && ivaIdealValue !== null) {
        if (diferenciaValue < 0) {
          const calculatedValue = (ivaIdealValue + diferenciaValue) / 0.19;
           /*@ts-ignore*/
          newItem[`B${i}` as keyof IvaData] = calculatedValue;
        } else {
              /*@ts-ignore*/
          newItem[`B${i}` as keyof IvaData] = 0;
        }
      }
    }

    // Agregar el nuevo objeto al arreglo
    data.push(newItem);
  }

  return data;
}
const API_URL = `${import.meta.env.VITE_APP_GRAPH}fletes/getIvaIdeal`
const TablaIVA: React.FC = () => {
  const [datos, setDatos] = useState<IvaData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setDatos(agregarIvaAComprar(response.data));
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-50">
          <tr className="bg-gray-100 text-left">
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI MESTRE 1</th>
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI MESTRE 2</th>
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI MESTRE 3</th>
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI MESTRE 4</th>
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI MESTRE 5</th>
            <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI MESTRE 6</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {datos?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 text-left">
              <td className="px-6 py-4 whitespace-nowrap">{item.Nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.B1 || 0)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.B2 || 0)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.B3 || 0)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.B4 || 0)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.B5 || 0)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.B6 || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaIVA;