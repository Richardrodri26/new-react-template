import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';

import { BarChart2, Target, PackageSearch, X } from 'lucide-react'; // ← Lucide icons

export interface TrimestreEstadistica {
  anio: number;
  trimestre: number;
  comprado: number;
  vendido: number;
  stock: number;
}

export interface EstadisticaStockDTO {
  referencia: string;
  historico: TrimestreEstadistica[];
  promedioStock: number;
  stockIdeal: number;
}

interface ModalCreateReferenciaStockProps {
  isOpen: boolean;
  onClose: () => void;
  referencia: string;
  refesh?: () => void;
}

const StockVsVentas = ({ isOpen, onClose, referencia }: ModalCreateReferenciaStockProps) => {
  const [data, setData] = useState<EstadisticaStockDTO | null>(null);

  useEffect(() => {
    if (referencia) {
      axios.get<EstadisticaStockDTO>(`https://intranet.cytech.net.co:3003/ventas/estadisticas-stock/${referencia}`)
        .then(res => setData(res.data))
        .catch(() => setData(null));
    }
  }, [referencia]);

  const chartData = data?.historico.map(h => ({
    name: `T${h.trimestre} ${h.anio}`,
    Comprado: h.comprado,
    Vendido: h.vendido,
    Stock: h.stock
  }));

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Estadísticas de Stock"
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg p-6 outline-none"
    >
      {!data ? (
        <div className="text-center py-10 text-gray-500 font-medium">Cargando datos...</div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <PackageSearch className="w-6 h-6 text-blue-600" />
              Estadísticas: <span className="text-blue-700">{data.referencia}</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-600 transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
            <div className="p-4 bg-blue-50 rounded-md shadow-sm flex items-center gap-3">
              <BarChart2 className="text-blue-600 w-6 h-6" />
              <div>
                <p className="text-gray-600">Promedio de stock</p>
                <p className="text-blue-800 font-semibold text-lg">{Math.round(data.promedioStock)}</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-md shadow-sm flex items-center gap-3">
              <Target className="text-yellow-600 w-6 h-6" />
              <div>
                <p className="text-gray-600">Stock ideal (20% margen)</p>
                <p className="text-yellow-700 font-semibold text-lg">{Math.round(data.stockIdeal)}</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Comprado" fill="#4ade80" />
                <Bar dataKey="Vendido" fill="#60a5fa" />
                <Bar dataKey="Stock" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default StockVsVentas;
