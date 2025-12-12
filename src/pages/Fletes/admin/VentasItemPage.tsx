import { Eye } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { ModalUltimasCompras } from "./ModalUltimasComprast";

interface VentaItem {
  referencia: string;
  nombre: string;
  TOTAL: number;
  stock: number;
}

export const VentasItemPage: React.FC = () => {
  const [data, setData] = useState<VentaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [referencia, setReferencia] = useState<string | null>(null);
  // -----------------------------------------------------------
  // FETCH DATA
  // -----------------------------------------------------------
  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas/getVentaItemMes`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error cargando items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // -----------------------------------------------------------
  // ORDENACIÓN MISMA LÓGICA QUE TU FLETE PAGE
  // -----------------------------------------------------------
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VentaItem | "";
    direction: "asc" | "desc";
  }>({
    key: "",
    direction: "asc",
  });

  const handleSort = (key: keyof VentaItem) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    let sorted = [...data];

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        //@ts-ignore
        const x = a[sortConfig.key];
        //@ts-ignore
        const y = b[sortConfig.key];

        if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
        if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [data, sortConfig]);

  // -----------------------------------------------------------
  // PAGINACIÓN CLIENTE (MISMO SISTEMA TUYO)
  // -----------------------------------------------------------
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const totalRegistros = sortedData.length;
  const totalPaginas = Math.ceil(totalRegistros / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const dataPaginada = sortedData.slice(startIndex, endIndex);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (referencia: string) => {
    setReferencia(referencia)
    setIsOpen(true);
  };

  // -----------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------
  return (
    <div className="w-full p-4">

      <h1 className="text-xl font-semibold mb-4 text-gray-700">
        Productos más vendidos del mes
      </h1>

      {/* SELECT ITEMS POR PÁGINA */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-sm text-gray-600">Items por página:</span>

        <select
          className="border rounded px-2 py-1 text-sm"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white text-xs">
            <tr>
              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("referencia")}
              >
                Referencia{" "}
                {sortConfig.key === "referencia" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>

              <th
                className="p-2 cursor-pointer"
                onClick={() => handleSort("nombre")}
              >
                Nombre{" "}
                {sortConfig.key === "nombre" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>

              <th
                className="p-2 cursor-pointer text-right"
                onClick={() => handleSort("TOTAL")}
              >
                Total ventas{" "}
                {sortConfig.key === "TOTAL" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>

              <th
                className="p-2 cursor-pointer text-right"
                onClick={() => handleSort("stock")}
              >
                Stock{" "}
                {sortConfig.key === "stock" &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th
                className="p-2 cursor-pointer text-right"
                >
                    Compras
                </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-6 text-center" colSpan={4}>
                  Cargando...
                </td>
              </tr>
            ) : (
              dataPaginada.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="p-2">{item.referencia}</td>
                  <td className="p-2">{item.nombre}</td>
                  <td className="p-2 text-right font-semibold">
                    {item.TOTAL}
                  </td>
                  <td className="p-2 text-right">{item.stock}</td>
                  <td className="p-2 text-right">
                    <button
                      title="Ver compras"
                      onClick={() => handleOpenModal(item.referencia)}
                      className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINADOR */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Página {page} de {totalPaginas}
        </p>

        <div className="flex gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>

          {[...Array(totalPaginas).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-3 py-1 border rounded ${
                page === p + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {p + 1}
            </button>
          ))}
            <ModalUltimasCompras
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              referencia={referencia}
            />
          <button
            disabled={page === totalPaginas}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default VentasItemPage;
