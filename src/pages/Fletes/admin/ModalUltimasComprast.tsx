import { X, Package, Hash } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/pages/Reports/table/marcasVenta";

// Tipado basado en la respuesta del backend
interface CompraReferencia {
  MOV_REFER: string;
  MOV_CEDULA: string;
  NIT_NOMBRE: string;
  MOV_CANTID: number;
  MOV_VALOR: number;
  MOV_CODOPE: string;
  MOV_NUMDOC: string;
  MOV_FECHA: string;
}

export const ModalUltimasCompras = ({
  isOpen,
  onClose,
  referencia,
}: {
  isOpen: boolean;
  onClose: () => void;
  referencia: string | null;
}) => {
  if (!isOpen || !referencia) return null;

  const [compras, setCompras] = useState<CompraReferencia[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !referencia) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const refEncoded = encodeURIComponent(referencia);

        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas/ultimas-compras-referencia/${refEncoded}`
        );

        setCompras(data);
      } catch (error) {
        console.error("Error cargando últimas compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, referencia]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      {/* 🔥 MODAL EXTRA HORIZONTAL (95% DE LA PANTALLA) */}
      <div className="bg-white shadow-xl w-[100%] max-w-[95%] rounded-xl overflow-hidden animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b bg-blue-600 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Package size={20} /> Últimas Compras de la Referencia
          </h2>
          <button onClick={onClose}>
            <X size={24} className="hover:text-gray-200" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 max-h-[70vh] overflow-y-auto text-sm">
          {loading ? (
            <p className="text-center text-gray-500 py-3">Cargando compras...</p>
          ) : compras.length === 0 ? (
            <p className="text-center text-gray-500 py-3">No hay registros.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2 border">Referencia</th>
                    <th className="p-2 border">Proveedor</th>
                    <th className="p-2 border text-center">Cantidad</th>
                    <th className="p-2 border text-center">Valor Unit</th>
                    <th className="p-2 border text-center">Valor</th>
                    <th className="p-2 border">Operador</th>
                    <th className="p-2 border">Fecha</th>
                    <th className="p-2 border">Factura</th>
                  </tr>
                </thead>

                <tbody>
                  {compras.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-2 border text-blue-700 font-semibold flex items-center gap-1">
                        <Hash size={14} /> {item.MOV_REFER}
                      </td>

                      <td className="p-2 border">{item.NIT_NOMBRE}</td>

                      <td className="p-2 border text-center">{item.MOV_CANTID}</td>
                      <td className="p-2 border text-center">{formatCurrency(item.MOV_VALOR / item.MOV_CANTID)}</td>
                      <td className="p-2 border text-center">
                        {formatCurrency(item.MOV_VALOR)}
                      </td>

                      <td className="p-2 border">{item.MOV_CODOPE}</td>
                      <td className="p-2 border">{item.MOV_FECHA?.split("T")[0]}</td>
                      <td className="p-2 border">{item.MOV_NUMDOC}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
