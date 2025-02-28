import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Bar, Line } from "react-chartjs-2";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Importar el componente Checkbox
import { Button } from "@/components/ui/button";

// Registrar módulos de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface Venta {
  departamento: string;
  venta: string;
  vendedor: string;
  name: string;
  lastName: string;
}

export default function EstadisticasVentas() {
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [zonasSeleccionadas, setZonasSeleccionadas] = useState<string[]>([]); // Estado para las zonas seleccionadas

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_GRAPH}fletes/getVentasXZonaYvendedor/${startDate}/${endDate}`;
        const { data } = await axios.get<Venta[]>(url);
        setVentas(data);
      } catch (error) {
        console.error("Error al obtener ventas:", error);
      }
    };

    fetchVentas();
  }, [endDate]); // Solo se ejecuta cuando cambia la fecha final

  // 1️⃣ Agrupar ventas por zona
  const ventasPorZona = ventas.reduce<Record<string, number>>((acc, venta) => {
    const departamento = venta.departamento;
    const ventaNumero = parseFloat(venta.venta); // Convertir la venta a número

    if (!acc[departamento]) {
      acc[departamento] = 0; // Inicializar el acumulador si no existe
    }

    acc[departamento] += ventaNumero; // Sumar la venta al acumulador
    return acc;
  }, {});

  // 2️⃣ Agrupar ventas por trabajador y zona
  const ventasPorZonaYTrabajador = ventas.reduce<Record<string, Record<string, number>>>((acc, venta) => {
    if (!acc[venta.departamento]) acc[venta.departamento] = {};
    const trabajador = venta.name ? `${venta.name} ${venta.lastName}` : 'No esta en seller';
    acc[venta.departamento][trabajador] = (acc[venta.departamento][trabajador] || 0) + Number(venta.venta);
    return acc;
  }, {});

  // 🎨 Generar colores aleatorios
  const getRandomColor = (blueOnly = true) => {
    const red = blueOnly ? Math.floor(Math.random() * 64) : Math.floor(Math.random() * 256);
    const green = blueOnly ? Math.floor(Math.random() * 64) : Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convertir a hexadecimal y asegurar dos dígitos por componente
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  };

  // 🗂️ Filtrar datos según las zonas seleccionadas
  const zonasDisponibles = Object.keys(ventasPorZona);
  const ventasFiltradas = zonasSeleccionadas.length === 0
    ? ventas // Mostrar todas las ventas si no se selecciona ninguna zona
    : ventas.filter((venta) => zonasSeleccionadas.includes(venta.departamento)); // Filtrar por zonas seleccionadas

  // 📊 Datos para gráfico de líneas (Comparación de ventas por zona)
  const dataLine = {
    labels: zonasSeleccionadas.length === 0 ? zonasDisponibles : zonasSeleccionadas,
    datasets: [
      {
        label: "Ventas por Zona",
        data: zonasSeleccionadas.length === 0
          ? Object.values(ventasPorZona)
          : zonasSeleccionadas.map((zona) => ventasPorZona[zona] || 0),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // 📊 Datos para gráfico de barras (Comparación de trabajadores en cada zona)
  const zonaLabels = zonasSeleccionadas.length === 0 ? zonasDisponibles : zonasSeleccionadas;
  const trabajadoresUnicos = new Set<string>();

  Object.values(ventasPorZonaYTrabajador).forEach((trabajadores) => {
    Object.keys(trabajadores).forEach((trabajador) => trabajadoresUnicos.add(trabajador));
  });

  const datasetsBar = Array.from(trabajadoresUnicos).map((trabajador) => ({
    label: trabajador,
    data: zonaLabels.map((zona) => ventasPorZonaYTrabajador[zona]?.[trabajador] || 0),
    backgroundColor: getRandomColor(),
  }));

  const dataBar = {
    labels: zonaLabels,
    datasets: datasetsBar,
  };

  // Manejar cambios en los checkboxes
  const handleZonaChange = (zona: string) => {
    setZonasSeleccionadas((prev) =>
      prev.includes(zona)
        ? prev.filter((z) => z !== zona) // Desmarcar la zona
        : [...prev, zona] // Marcar la zona
    );
  };
  const seleccionarTodasLasZonas = () => {
    setZonasSeleccionadas(zonasDisponibles);
  };

  // Deseleccionar todas las zonas
  const deseleccionarTodasLasZonas = () => {
    setZonasSeleccionadas([]);
  };
  return (
    <div className="p-6">
      {/* Filtros de Fecha y Zona */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha Fin</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        {/* <label className="block text-sm font-medium mb-1">Zonas</label> */}
        <div className="flex gap-2 mt-2">
            <Button onClick={seleccionarTodasLasZonas}>Seleccionar Todas</Button>
            <Button onClick={deseleccionarTodasLasZonas}>Deseleccionar Todas</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {zonasDisponibles.map((zona) => (
            <div key={zona} className="flex items-center gap-2">
              <Checkbox
                id={zona}
                checked={zonasSeleccionadas.includes(zona)}
                onCheckedChange={() => handleZonaChange(zona)}
              />
              <label htmlFor={zona}>{zona}</label>
            </div>
          ))}
        </div>
      </div>

      {/* 📈 Gráfico de Ventas por Zona */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Comparación de Ventas por Zona</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={dataLine} />
        </CardContent>
      </Card>

      {/* 📊 Gráfico de Ventas por Trabajador y Zona */}
      <Card>
        <CardHeader>
          <CardTitle>Comparación de Ventas por Trabajador y Zona</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={dataBar} />
        </CardContent>
      </Card>
    </div>
  );
}