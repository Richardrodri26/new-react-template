import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { PackageSearch, X } from 'lucide-react';

interface UltimaCompraItem {
  MOV_REFER: string;
  MOV_CEDULA: string;
  NIT_NOMBRE: string;
  MOV_CANTID: number;
  MOV_VALOR: number;
  MOV_CODOPE: string;
  MOV_NUMDOC: string;
  MOV_FECHA: string;
}

interface ModalCreateReferenciaStockProps {
  isOpen: boolean;
  onClose: () => void;
  referencia: string;
  refesh?: () => void;
}

const StockVsVentas = ({ isOpen, onClose, referencia }: ModalCreateReferenciaStockProps) => {
  const [data, setData] = useState<UltimaCompraItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !referencia) return;

    const loadCompras = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://intranet.cytech.net.co:3003/ventas/ultimas-compras-referencia/${encodeURIComponent(referencia)}`
        );
        if (!response.ok) {
          throw new Error('No fue posible cargar las ultimas compras.');
        }

        const payload = await response.json();
        const rows: UltimaCompraItem[] = Array.isArray(payload) ? payload : [payload];
        setData(rows);
      } catch (err) {
        setData([]);
        setError(err instanceof Error ? err.message : 'Error consultando ultimas compras.');
      } finally {
        setLoading(false);
      }
    };

    loadCompras();
  }, [isOpen, referencia]);

  const rows = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(b.MOV_FECHA).getTime() - new Date(a.MOV_FECHA).getTime()
    );
  }, [data]);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Ultimas compras por referencia"
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      className="bg-white w-full max-w-7xl mx-auto rounded-lg shadow-lg p-6 outline-none"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <PackageSearch className="w-6 h-6 text-blue-600" />
            Ultimas compras: <span className="text-blue-700">{referencia}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 font-medium">Cargando datos...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600 font-medium">{error}</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            No hay compras para esta referencia.
          </div>
        ) : (
          <div className="overflow-auto max-h-[70vh] border rounded-md">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-3 py-2">Fecha</th>
                  <th className="px-3 py-2">Documento</th>
                  <th className="px-3 py-2">Referencia</th>
                  <th className="px-3 py-2">NIT/Cedula</th>
                  <th className="px-3 py-2">Proveedor</th>
                  <th className="px-3 py-2 text-right">Cantidad</th>
                  <th className="px-3 py-2 text-right">Valor Unidad</th>
                  <th className="px-3 py-2 text-right">Valor</th>
                  <th className="px-3 py-2">Operador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((item, index) => (
                  <tr key={`${item.MOV_NUMDOC}-${index}`} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{formatDate(item.MOV_FECHA)}</td>
                    <td className="px-3 py-2">{item.MOV_NUMDOC}</td>
                    <td className="px-3 py-2">{item.MOV_REFER}</td>
                    <td className="px-3 py-2">{item.MOV_CEDULA}</td>
                    <td className="px-3 py-2">{item.NIT_NOMBRE}</td>
                    <td className="px-3 py-2 text-right">
                      {new Intl.NumberFormat('es-CO').format(item.MOV_CANTID)}
                    </td>
                    <td className="px-3 py-2 text-right">{formatCurrency(item.MOV_VALOR/item.MOV_CANTID)}</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(item.MOV_VALOR)}</td>
                    <td className="px-3 py-2">{item.MOV_CODOPE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StockVsVentas;

