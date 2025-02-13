import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Settings } from "lucide-react";

// ✅ Formatear valores en COP
export const formatCurrency = (value: number) =>
  value.toLocaleString("es-CO", { style: "currency", currency: "COP" });

// ✅ Traducción de meses
const mesesInglesAEspanol: Record<string, string> = {
  January: "Enero",
  February: "Febrero",
  March: "Marzo",
  April: "Abril",
  May: "Mayo",
  June: "Junio",
  July: "Julio",
  August: "Agosto",
  September: "Septiembre",
  October: "Octubre",
  November: "Noviembre",
  December: "Diciembre",
};

// ✅ Obtener marcas ocultas desde localStorage
const getHiddenBrands = () => JSON.parse(localStorage.getItem("hiddenBrands") || "[]");

const VentasTable: React.FC = () => {
  const [hiddenBrands, setHiddenBrands] = useState<string[]>(getHiddenBrands);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);
  const [showConfig, setShowConfig] = useState(false); // Estado para mostrar/ocultar configuración

  // ✅ Petición con React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["ventas"],
    queryFn: async () => {
      const res = await fetch("http://intranet.cytech.net.co:3003/some/marcas/agrupadas");
      if (!res.ok) throw new Error("Error al obtener datos");
      return res.json();
    },
  });

  // ✅ Guardar marcas ocultas en localStorage
  useEffect(() => {
    localStorage.setItem("hiddenBrands", JSON.stringify(hiddenBrands));
  }, [hiddenBrands]);

  // ✅ Mostrar tooltip
  const showTooltip = (event: React.MouseEvent, ventaMes: any) => {
    const { clientX, clientY } = event;
    setTooltip({
      x: clientX + 10,
      y: clientY + 10,
      content: `
        🛒 Venta: ${formatCurrency(ventaMes.VENTA)}
        💰 Costo: ${formatCurrency(ventaMes.COSTO)}
        📊 Utilidad: ${formatCurrency(ventaMes.UTILIDAD)}
        📈 % Utilidad: ${ventaMes.UTILIDAD_PORCENTAJE?.toFixed(2)}%
      `,
    });
  };

  // ✅ Ocultar tooltip
  const hideTooltip = () => setTooltip(null);

  // ✅ Mostrar error si falla la petición
  if (error) {
    return <p className="text-red-500 text-center">⚠ Error al cargar los datos</p>;
  }

  // ✅ Cargando datos (esqueleto)
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-5">
      {/* ✅ Título y Configuración */}
      <div className="flex justify-between items-center mb-5">
        <button
          className="text-gray-600 hover:text-gray-900"
          onClick={() => setShowConfig(!showConfig)}
        >
          <Settings size={24} />
        </button>
      </div>

      {/* ✅ Filtros para mostrar/ocultar marcas */}
      {showConfig && (
        <div className="bg-gray-100 p-3 rounded mb-5 shadow">
          <h3 className="text-lg font-semibold mb-2">Seleccionar marcas:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.keys(data).map((marca) => (
              <label key={marca} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!hiddenBrands.includes(marca)}
                  onChange={() =>
                    setHiddenBrands((prev) =>
                      prev.includes(marca) ? prev.filter((m) => m !== marca) : [...prev, marca]
                    )
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{marca}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Tabla de Ventas */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-2">Marca</th>
              {Object.values(mesesInglesAEspanol).map((mes) => (
                <th key={mes} className="border border-gray-300 p-2">{mes}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(data)
              .filter(([marca]) => !hiddenBrands.includes(marca))
              .map(([marca, ventas]) => (
                <tr key={marca} className="odd:bg-gray-50 even:bg-white">
                  <td className="border border-gray-300 p-2 font-semibold">{marca}</td>
                  {Object.entries(mesesInglesAEspanol).map(([mesIngles, mesEspanol]) => {
                    const ventaMes = (ventas as any[]).find((v) => mesesInglesAEspanol[v.MES] === mesEspanol);
                    return (
                      <td
                        key={mesEspanol}
                        onMouseEnter={(e) => ventaMes && showTooltip(e, ventaMes)}
                        onMouseLeave={hideTooltip}
                        className="border border-gray-300 p-2 text-center hover:bg-gray-300 cursor-pointer"
                      >
                        {ventaMes ? formatCurrency(ventaMes.VENTA) : "0"}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Tooltip flotante */}
      {tooltip && (
        <div
          className="fixed bg-black text-white text-sm p-2 rounded shadow-md z-50"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.content.replace(/\n/g, "<br>") }}
        />
      )}
    </div>
  );
};

export default VentasTable;
