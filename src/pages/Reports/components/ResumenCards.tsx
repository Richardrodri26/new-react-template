import React, { useEffect, useState } from "react";
import { DollarSign, Calendar, ShoppingCart, Percent } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/es";
interface ResumenCardsProps {
  utilidad: number;
}
// API Base
const API_BASE_URL = `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas`;

const ResumenCards:  React.FC<ResumenCardsProps> = ({ utilidad }) => {
  const [precioDolar, setPrecioDolar] = useState<number | null>(null);
  const [totalVentas, setTotalVentas] = useState<number | null>(null);
  const [porcentajeUtilidad, setPorcentajeUtilidad] = useState<number | null>(
    null
  );

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Precio del dólar desde una API externa (Ejemplo: mindicador.cl)
        const resDolar = await fetch(`https://www.datos.gov.co/resource/mcec-87by.json?vigenciahasta=${dayjs().format('YYYY-MM-DD')}`);
        const dataDolar = await resDolar.json();
        setPrecioDolar(dataDolar?.[0].valor || 0);

        // Datos desde la API de ventas
        const resVentas = await fetch(`${API_BASE_URL}/actual`);
        const dataVentas = await resVentas.json();
        setTotalVentas(dataVentas[0].TOTAL);

        // const resUtilidad = await fetch(`${API_BASE_URL}/utilidad`);
        // const dataUtilidad = await resUtilidad.json();
        // setPorcentajeUtilidad(dataUtilidad.porcentaje);
      } catch (error) {
        console.error("Error obteniendo los datos", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      {/* Card 1: Precio del Dólar */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center">
        <DollarSign className="text-blue-500 w-10 h-10 mr-4" />
        <div>
          <h3 className="text-gray-600 text-sm">Precio del Dólar</h3>
          <p className="text-xl font-bold">{precioDolar ? `$${precioDolar}` : "Cargando..."}</p>
        </div>
      </div>

      {/* Card 2: Fecha Actual */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center">
        <Calendar className="text-green-500 w-10 h-10 mr-4" />
        <div>
          <h3 className="text-gray-600 text-sm">Fecha de Hoy</h3>
          <p className="text-xl font-bold">{dayjs().locale("es").format("dddd, D [de] MMMM YYYY")}</p>
        </div>
      </div>

      {/* Card 3: Total Ventas del Mes */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center">
        <ShoppingCart className="text-yellow-500 w-10 h-10 mr-4" />
        <div>
          <h3 className="text-gray-600 text-sm">Ventas del Mes</h3>
          <p className="text-xl font-bold">{totalVentas ? `$${totalVentas}` : "Cargando..."}</p>
        </div>
      </div>

      {/* Card 4: Porcentaje de Utilidad */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center">
        <Percent className="text-red-500 w-10 h-10 mr-4" />
        <div>
          <h3 className="text-gray-600 text-sm">Utilidad del Mes</h3>
          <p className="text-xl font-bold">{`${utilidad}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumenCards;
