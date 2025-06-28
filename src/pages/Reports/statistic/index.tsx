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
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importamos el idioma español
import { formatCurrency } from "../table/marcasVenta";

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
    {
      ANO: string;
      TOTAL: number;
      venta: string;
      costo: string;
      oip: string;
      flete: string;
      back: string;
      utilidad: string;
      utilidad_porcentaje: string;
      nombre_mes: string;
      numero_mes: string;
    }[]
  >([]);
  const [topClientes, setTopClientes] = useState<
    { nit: string; nombre_cliente: string; total: string; venta: string }[]
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

        const res3 = await fetch(
          `${import.meta.env.VITE_APP_GRAPH}fletes/ventasAgrupadasXmes`
        );
        const data3 = await res3.json();
        setVentasAnioActual(data3);
        const res4 = await fetch(`${import.meta.env.VITE_APP_GRAPH}ventas/top-clientes`);
        const data4 = await res4.json();
        setTopClientes(data4);
      } catch (error) {
        console.error("Error obteniendo los datos", error);
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre del mes en español
  const obtenerNombreMes = (numeroMes: string) => {
    // Usamos Day.js para obtener el nombre del mes en español
    return dayjs().locale('es').month(Number(numeroMes) - 1).format('MMMM');
  };

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
    labels: ventasAnioActual.map((v) => `${obtenerNombreMes(v.numero_mes)} (${formatCurrency(+v.venta)})`),
    datasets: [
      {
        label: "Ventas Año Actual",
        data: ventasAnioActual.map((v) => (v.venta)),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const data = ventasAnioActual[tooltipItem.dataIndex];
            const mes = obtenerNombreMes(data.numero_mes); // Usamos Day.js para el mes
            const venta = formatCurrency(+data.venta);
            const costo = formatCurrency(+data.costo);
            const utilidad = formatCurrency(+data.utilidad);
            const utilidadPorcentaje = data.utilidad_porcentaje;

            return `${mes}: \nVenta: ${venta} \nCosto: ${costo} \nUtilidad: ${utilidad} \nUtilidad %: ${utilidadPorcentaje}`;
          },
        },
      },
    },
  };
  const dataTopClientes = {
    labels: topClientes.map((c, index) => `${index + 1} - ` +c.nombre_cliente),
    datasets: [
      {
        label: "Ventas por Cliente",
        data: topClientes.map((c) => (+c.venta)),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };
  const optionsTopClientes = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const venta = topClientes[tooltipItem.dataIndex].venta;
            return `Venta: ${formatCurrency(+venta)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false, // 👈 Oculta las etiquetas del eje X
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Gráfico 1: Ventas Años Anteriores (Mismo Mes) */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Ventas Mismo Mes</h2>
        <Bar data={dataMismoMes} />
      </div>

      {/* Gráfico 2: Ventas Años Anteriores (Acumuladas) */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Ventas Acumuladas hasta ahora</h2>
        <Bar data={dataAnteriores} />
      </div>

      {/* Gráfico 3: Ventas Año Actual */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Ventas Año Actual</h2>
        <Bar data={dataActual} options={options} />
      </div>
      {/* Gráfico 4: Top Clientes por Venta */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-center mb-3">Top 20 Clientes por Venta</h2>
        <Bar data={dataTopClientes} options={optionsTopClientes} />
      </div>

    </div>
  );
};

export default VentasCharts;
