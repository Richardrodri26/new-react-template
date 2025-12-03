import {
  X,
  Package,
  Hash,
} from "lucide-react";
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

const truncateDescription = (text: string, maxWords = 30) => {
  const words = text.split(" ");
  return text.length > maxWords
    ? text.slice(0, maxWords) + "..."
    : text;
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
      <div className="bg-white shadow-xl w-[90%] max-w-4xl rounded-xl overflow-hidden animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-4 border-b bg-blue-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Package size={22} /> Detalle de Factura
          </h2>
          <button onClick={onClose}>
            <X size={26} className="hover:text-gray-200" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">

          {loading ? (
            <p className="text-center text-gray-500 py-4">Cargando detalles...</p>
          ) : detalle.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No hay detalle disponible.</p>
          ) : (
            <div className="space-y-3">
              {detalle.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 border p-3 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
                >
                  {/* IZQUIERDA: referencia + descripción */}
                  <div className="w-2/5">
                    <div className="font-semibold flex items-center gap-2 text-blue-600">
                      <Hash size={18} /> {item.referencia}
                    </div>
                    <p className="text-gray-700 text-sm">
                      {truncateDescription(item.nombre_referencia, 30)}
                    </p>
                  </div>

                  {/* DERECHA: datos en una línea */}
                  <div className="flex-1 grid grid-cols-4 gap-4 text-sm">

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">Cant.</span>
                      <span className="text-gray-700">{item.cantidad}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">Valor</span>
                      <span className="text-gray-700">
                        {formatCurrency(item.valor)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">Stock</span>
                      <span className="text-gray-700">{item.stock}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">Costo</span>
                      <span className="text-gray-700">
                        {formatCurrency(item.costo)}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
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
