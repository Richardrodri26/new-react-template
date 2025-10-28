import React, { useEffect, useState } from "react";

interface VentaTienda {
  nombre_mes: string;
  numero_mes: number;
  venta: number;
  costo_tienda: number;
  oip_tienda: number;
  flete_tienda: number;
  back_tienda: number;
  utilidad_tienda: number;
  valor_a_pagar: number;
  utilidad_porcentaje_tienda: number;
}

const VentasTiendaTable: React.FC = () => {
  const [data, setData] = useState<VentaTienda[]>([]);
  const [mesSeleccionado, setMesSeleccionado] = useState<number | "todos">("todos");

  useEffect(() => {
    // 🔹 Reemplaza con tu endpoint real
    fetch(`${import.meta.env.VITE_APP_GRAPH}fletes/v_totalizado_ventas_tienda`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  const mesesUnicos = Array.from(new Set(data.map((d) => d.numero_mes))).sort((a, b) => a - b);

  const dataFiltrada =
    mesSeleccionado === "todos"
      ? data
      : data.filter((d) => d.numero_mes === mesSeleccionado);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📊 Ventas por Tienda
        </h2>

        {/* Selector de mes */}
        <div className="mb-6 flex items-center gap-3">
          <label htmlFor="mes" className="text-gray-700 font-medium">
            Selecciona el mes:
          </label>
          <select
            id="mes"
            value={mesSeleccionado}
            onChange={(e) =>
              setMesSeleccionado(
                e.target.value === "todos" ? "todos" : Number(e.target.value)
              )
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos</option>
            {mesesUnicos.map((mes) => {
              const nombre = data.find((d) => d.numero_mes === mes)?.nombre_mes?.trim();
              return (
                <option key={mes} value={mes}>
                  {nombre || `Mes ${mes}`}
                </option>
              );
            })}
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Mes</th>
                <th className="px-4 py-2 text-right">Venta</th>
                <th className="px-4 py-2 text-right">Costo</th>
                <th className="px-4 py-2 text-right">OIP</th>
                <th className="px-4 py-2 text-right">Flete</th>
                <th className="px-4 py-2 text-right">Back</th>
                <th className="px-4 py-2 text-right">Utilidad</th>
                <th className="px-4 py-2 text-right">Valor a Pagar (7%)</th>
                <th className="px-4 py-2 text-right">% Utilidad</th>
              </tr>
            </thead>
            <tbody>
              {dataFiltrada.length > 0 ? (
                dataFiltrada.map((row) => (
                  <tr
                    key={row.numero_mes}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {row.nombre_mes}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {row.venta.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {row.costo_tienda.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {row.oip_tienda.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {row.flete_tienda.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {row.back_tienda.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-green-600 font-semibold">
                      {row.utilidad_tienda.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-blue-600 font-semibold">
                      {row.valor_a_pagar.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-700">
                      {row.utilidad_porcentaje_tienda}% 
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VentasTiendaTable;
