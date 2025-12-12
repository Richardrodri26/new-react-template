import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';

interface ProveedorVenta {
  venta: number;
  Identificacion: string;
  nombre: string;
}

const API_URL = `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas/total-proveedor`;

const TablaVentasProveedor: React.FC = () => {
  const [datos, setDatos] = useState<ProveedorVenta[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // Estados extras
  const [busqueda, setBusqueda] = useState("");
  const [ordenColumna, setOrdenColumna] = useState<keyof ProveedorVenta | null>(null);
  const [ordenDireccion, setOrdenDireccion] = useState<"asc" | "desc">("asc");

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setDatos(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar por texto
  const datosFiltrados = useMemo(() => {
    return datos.filter(item =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.Identificacion.includes(busqueda)
    );
  }, [busqueda, datos]);

  // Ordenamiento
  const datosOrdenados = useMemo(() => {
    if (!ordenColumna) return datosFiltrados;

    return [...datosFiltrados].sort((a, b) => {
      const x = a[ordenColumna];
      const y = b[ordenColumna];

      if (typeof x === "number" && typeof y === "number") {
        return ordenDireccion === "asc" ? x - y : y - x;
      }

      return ordenDireccion === "asc"
        ? String(x).localeCompare(String(y))
        : String(y).localeCompare(String(x));
    });
  }, [datosFiltrados, ordenColumna, ordenDireccion]);

  // Paginación
  const totalPaginas = Math.ceil(datosOrdenados.length / filasPorPagina);
  const inicio = (paginaActual - 1) * filasPorPagina;
  const datosPagina = datosOrdenados.slice(inicio, inicio + filasPorPagina);

  const cambiarOrden = (col: keyof ProveedorVenta) => {
    if (ordenColumna === col) {
      setOrdenDireccion(ordenDireccion === "asc" ? "desc" : "asc");
    } else {
      setOrdenColumna(col);
      setOrdenDireccion("asc");
    }
  };

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="overflow-x-auto p-4">

      {/* BUSCADOR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o identificación..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* TABLA */}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-50">
          <tr className="bg-gray-100">

            <th
              className="cursor-pointer px-4 py-2"
              onClick={() => cambiarOrden("nombre")}
            >
              Nombre {ordenColumna === "nombre" ? (ordenDireccion === "asc" ? "▲" : "▼") : ""}
            </th>

            <th
              className="cursor-pointer px-4 py-2"
              onClick={() => cambiarOrden("Identificacion")}
            >
              Identificación {ordenColumna === "Identificacion" ? (ordenDireccion === "asc" ? "▲" : "▼") : ""}
            </th>

            <th
              className="cursor-pointer px-4 py-2"
              onClick={() => cambiarOrden("venta")}
            >
              Venta {ordenColumna === "venta" ? (ordenDireccion === "asc" ? "▲" : "▼") : ""}
            </th>

          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {datosPagina.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">{item.nombre}</td>
              <td className="px-4 py-2">{item.Identificacion}</td>
              <td className="px-4 py-2">${item.venta.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="flex justify-between mt-4">
        <button
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="px-2 py-2">
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual(paginaActual + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablaVentasProveedor;
