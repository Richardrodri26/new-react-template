import { X, Package, Hash } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/pages/Reports/table/marcasVenta";

interface VentaDetalle {
  numero_factura: string;
  prefijo: string;
  plazo: number;
  referencia: string;
  nombre_referencia: string;
  cantidad: number;
  valor: number;
  costo: number;
  vendedor: string;
  stock: number;
}

// 🔹 Truncar descripción a máximo 30 caracteres
const truncateText = (text: string, max = 30) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export const ModalDetalleFactura = ({
  isOpen,
  onClose,
  factura,
}: {
  isOpen: boolean;
  onClose: () => void;
  factura: string | null;
}) => {
  if (!isOpen || !factura) return null;

  const [detalle, setDetalle] = useState<VentaDetalle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !factura) return;

    const fetchDetalle = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://intranet.cytech.net.co:3003/ventas/getVentaDetalle/${factura}`
        );
        setDetalle(data);
      } catch (error) {
        console.error("Error cargando detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [isOpen, factura]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white shadow-xl w-[90%] max-w-5xl rounded-xl overflow-hidden animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-3 border-b bg-blue-600 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Package size={20} /> Detalle de Factura
          </h2>
          <button onClick={onClose}>
            <X size={24} className="hover:text-gray-200" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 max-h-[70vh] overflow-y-auto text-sm">

          {loading ? (
            <p className="text-center text-gray-500 py-3">Cargando detalles...</p>
          ) : detalle.length === 0 ? (
            <p className="text-center text-gray-500 py-3">No hay detalle disponible.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="p-2 border">Ref</th>
                    <th className="p-2 border">Descripción</th>
                    <th className="p-2 border text-center">Cant.</th>
                    <th className="p-2 border text-center">Valor</th>
                    <th className="p-2 border text-center">Costo</th>
                    <th className="p-2 border text-center">Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {detalle.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="p-2 border font-semibold text-blue-700 flex items-center gap-1">
                        <Hash size={14} />
                        {item.referencia}
                      </td>

                      <td className="p-2 border text-gray-700">
                        {truncateText(item.nombre_referencia, 30)}
                      </td>

                      <td className="p-2 border text-center">{item.cantidad}</td>

                      <td className="p-2 border text-center">
                        {formatCurrency(item.valor)}
                      </td>

                      <td className="p-2 border text-center">
                        {formatCurrency(item.costo)}
                      </td>

                      <td className="p-2 border text-center">{item.stock}</td>
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
