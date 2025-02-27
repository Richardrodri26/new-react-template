import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los módulos de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas`;

const VentasCharts: React.FC = () => {
  const [ventasAnterioresMismoMes, setVentasAnterioresMismoMes] = useState<
    { ANO: string; TOTAL: number }[]
  >([]);
  const [ventasAnteriores, setVentasAnteriores] = useState<
    { ANO: string; TOTAL: number }[]
  >([]);
  const [ventasAnioActual, setVentasAnioActual] = useState<
    { MES: string; TOTAL: number }[]
  >([]);

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(`${API_BASE_URL}/anteriores-mismo-mes`);
        const data1 = await res1.json();
        setVentasAnterioresMismoMes(data1);

        const res2 = await fetch(`${API_BASE_URL}/anteriores`);
        const data2 = await res2.json();
        setVentasAnteriores(data2);

        const res3 = await fetch(`${API_BASE_URL}/mes-actual`);
        const data3 = await res3.json();
        setVentasAnioActual(data3);
      } catch (error) {
        console.error("Error obteniendo los datos", error);
      }
    };

    fetchData();
  }, []);

  // Datos para los gráficos
  const years = ventasAnterioresMismoMes.map((v) => v.ANO);
  
  // Gráfico 1: Ventas Años Anteriores (Mismo Mes)
  const dataMismoMes = {
    labels: years,
    datasets: [
      {
        label: "Ventas (Mismo Mes)",
        data: ventasAnterioresMismoMes.map((v) => v.TOTAL),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Gráfico 2: Ventas Años Anteriores (Acumuladas)
  const dataAnteriores = {
    labels: ventasAnteriores.map((v) => v.ANO),
    datasets: [
      {
        label: "Ventas Anuales",
        data: ventasAnteriores.map((v) => v.TOTAL),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Gráfico 3: Ventas Año Actual
  const dataActual = {
    labels: ventasAnioActual.map((v) => v.MES),
    datasets: [
      {
        label: "Ventas Año Actual",
        data: ventasAnioActual.map((v) => v.TOTAL),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Gráfico 1: Ventas Años Anteriores (Mismo Mes) */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Ventas Mismo Mes</h2>
        <Line data={dataMismoMes} />
      </div>

      {/* Gráfico 2: Ventas Años Anteriores (Acumuladas) */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Ventas Anteriores</h2>
        <Bar data={dataAnteriores} />
      </div>

      {/* Gráfico 3: Ventas Año Actual */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Ventas Año Actual</h2>
        <Bar data={dataActual} />
      </div>
    </div>
  );
};

export default VentasCharts;
