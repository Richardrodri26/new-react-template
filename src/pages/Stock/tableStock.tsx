import {
  Stock,
  useCreateStockMutation,
  useStocksQuery,
  useUpdateStockMutation,
  useUpdateToStockMutation,
} from '@/domain/graphql';
import React, { useState, KeyboardEvent, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  FileText,
  Trash2,
  Folder,
} from 'lucide-react';
import { toast } from 'sonner';
import { ToastyErrorGraph } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModalCreateReferenciaStock } from './modalCreateReferenciaStock';
import { useModal } from '@/hooks/useModal';
import StockVsVentas from './modalStatist';
import * as XLSX from 'xlsx';

const ITEMS_PER_PAGE = 10;

export const StockTable: React.FC = () => {
  const { data, loading, refetch } = useStocksQuery();
  const [updateStock] = useUpdateStockMutation();
  const [updateStockAll] = useUpdateToStockMutation();
  const [loadingStock, setLoadingStock] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const {
    isOpen: isOpenS,
    closeModal: closeModals,
    openModal: openModals,
  } = useModal();
  const [referencia, setReferencia] = useState<string>('');
  const [estadoFilter, setEstadoFilter] = useState<'todos' | 'rojo' | 'amarillo' | 'verde'>('todos');

  const [editing, setEditing] = useState<{
    id: string;
    field: 'cantidadActual' | 'stcMin' | 'stcMax';
    value: number;
  } | null>(null);

  const [filters, setFilters] = useState({
    referencia: '',
    clase: '',
    nombreClase: '',
  });

  const [selectedClase, setSelectedClase] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const stocks: Stock[] = useMemo(() => {
    return [...(data?.stocks ?? [])]
      .sort((a, b) => a.referencia.localeCompare(b.referencia))
      .filter((stock) => !stock.isDeleted);
  }, [data]);

  const groupedStocks = useMemo(() => {
    const grupos: Record<string, Stock[]> = {};
    stocks.forEach((stock) => {
      if (!grupos[stock.nombreClase]) {
        grupos[stock.nombreClase] = [];
      }
      grupos[stock.nombreClase].push(stock);
    });
    return grupos;
  }, [stocks]);

  const filteredStocks = useMemo(() => {
    return stocks
      .filter((stock) =>
        Object.entries(filters).every(([key, val]) =>
          (stock as any)[key].toLowerCase().includes(val.toLowerCase())
        )
      )
      .filter((stock) => {
        if (estadoFilter === 'todos') return true;
        if (estadoFilter === 'rojo') return stock.cantidadActual === 0;
        if (estadoFilter === 'amarillo') return stock.cantidadActual > 0 && stock.cantidadActual <= stock.stcMin;
        if (estadoFilter === 'verde') return stock.cantidadActual > stock.stcMin;
        return true;
      });
  }, [stocks, filters, estadoFilter]);

  const paginatedStocks = filteredStocks

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);

  const startEdit = (
    id: string,
    field: 'cantidadActual' | 'stcMin' | 'stcMax',
    current: number
  ) => setEditing({ id, field, value: current });

  const finishEdit = async () => {
    if (!editing) return;
    const toastId = toast.loading('Actualizando stock...');
    try {
      const res = await updateStock({
        variables: {
          updateInput: {
            id: editing.id,
            [editing.field]: editing.value,
          },
        },
      });
      if (res.errors) {
        toast.error('Error al actualizar el stock', { id: toastId });
        return;
      }
      toast.success('Stock actualizado correctamente', { id: toastId });
      refetch();
      setEditing(null);
    } catch (error) {
      ToastyErrorGraph(error as any);
      toast.dismiss(toastId);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') finishEdit();
    if (e.key === 'Escape') setEditing(null);
  };

  const onUpdateAll = async () => {
    const toastId = toast.loading('Actualizando stocks...');
    try {
      setLoadingStock(true);
      const res = await updateStockAll();
      if (res.errors) {
        toast.error('Error al actualizar los stocks', { id: toastId });
        return;
      }
      toast.success('Stocks actualizados correctamente', { id: toastId });
      refetch();
    } catch (error) {
      ToastyErrorGraph(error as any);
      toast.dismiss(toastId);
    } finally {
      setLoadingStock(false);
    }
  };

  const onDelete = async (id: string) => {
    const stock = stocks.find((s) => s.id === id);
    if (!stock) {
      toast.error('Referencia no encontrada');
      return;
    }
    if (!confirm(`¿Estás seguro de que quieres eliminar esta referencia ${stock.referencia}?`)) return;
    const toastId = toast.loading('Eliminando referencia...');
    try {
      await updateStock({
        variables: {
          updateInput: {
            id,
            isDeleted: true,
          },
        },
      });
      toast.success('Referencia eliminada correctamente', { id: toastId });
      refetch();
    } catch (error) {
      ToastyErrorGraph(error as any);
      toast.dismiss(toastId);
    }
  };

  const openStockVsVentas = (referencia: string) => {
    setReferencia(referencia);
    openModals();
  };
  const descargarExcelPocoStock = () => {
    try {
      if (!filteredStocks.length) {
        throw new Error('No hay stocks para descargar');
      }
      if(!selectedClase) {
        throw new Error('Debes seleccionar una clase para descargar');
      }
      const data = filteredStocks.filter((stock) => stock.cantidadActual <= stock.stcMin || stock.cantidadActual === 0);

   const dataExcel = data.map((stock) => ({
    "Referencia": stock.referencia,
    "Nombre Referencia": stock.nombreReferencia,
    "Clase": stock.clase,
    "Nombre Clase": stock.nombreClase,
    "Cantidad Actual": stock.cantidadActual,
    "Stock Mínimo": stock.stcMin,
    "Stock Máximo": stock.stcMax,
    "Ficha Técnica": stock.fichaTecnica?.url || '',
  }));


      const worksheet = XLSX.utils.json_to_sheet(dataExcel);

      // 🔥 Aplicar estilo a encabezados
      const range = XLSX.utils.decode_range(worksheet['!ref'] || '');

      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });

        if (!worksheet[cellAddress]) continue;

        worksheet[cellAddress].s = {
          fill: {
            fgColor: { rgb: "1F4E78" } // Azul oscuro
          },
          font: {
            bold: true,
            color: { rgb: "FFFFFF" }
          },
          alignment: {
            horizontal: "center"
          }
        };
      }

      // 🔥 Auto ancho columnas
      const colWidths = Object.keys(dataExcel[0]).map((key) => {
        const maxLength = Math.max(
          key.length,
          // @ts-ignore
          ...dataExcel.map(row => (row[key]?.toString().length || 0))
        );
        return { wch: maxLength + 2 };
      });

      worksheet['!cols'] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock');
      XLSX.writeFile(workbook, `stock-${selectedClase}.xlsx`);
    } catch (error) {
      ToastyErrorGraph(error as any);
    }
  };

  if (loading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {(['referencia', 'clase'] as const).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={`Filtrar por ${key}`}
            value={filters[key]}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, [key]: e.target.value }))
            }
            className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        ))}

        {!selectedClase && (
          <input
            type="text"
            placeholder="Filtrar por nombreClase"
            value={filters.nombreClase}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, nombreClase: e.target.value }))
            }
            className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        )}

        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value as any)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="todos">Todos los estados</option>
          <option value="rojo">Sin stock</option>
          <option value="amarillo">Bajo stock</option>
          <option value="verde">Bien de stock</option>
        </select>
      </div>
      <div className="mb-4">
        <Button onClick={descargarExcelPocoStock}>Descargar Excel de bajo stock</Button>
      </div>

      {!selectedClase ? (
        <>
          <div className="flex justify-end mb-4">
            <Button onClick={openModal}>+ Crear Nueva Referencia</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {Object.keys(groupedStocks).map((nombreClase) => (
              <div
                key={nombreClase}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, nombreClase }));
                  setSelectedClase(nombreClase);
                }}
                className="cursor-pointer flex items-center gap-2 bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition"
              >
                <Folder className="text-blue-500" />
                <span className="text-gray-800 font-semibold">{nombreClase}</span>
                <span className="text-gray-500 text-sm ml-auto">
                  ({groupedStocks[nombreClase].length})
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={() => {
                setSelectedClase(null);
                setFilters((prev) => ({ ...prev, nombreClase: '' }));
                setEstadoFilter('todos');
                setCurrentPage(0);
                setEditing(null);
                setReferencia('');
              }}
              className="text-blue-600 hover:underline flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a clases
            </button>
            <h2 className="text-lg font-semibold">
              Referencias en clase: {selectedClase}
            </h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <Button onClick={onUpdateAll} disabled={loadingStock}>
              Obtener Stock de la intranet
            </Button>
            <Button onClick={openModal}>Crear Nueva Referencia</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Referencia</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Clase</th>
                  <th className="px-4 py-3">Nombre Clase</th>
                  <th className="px-4 py-3">Stock Actual</th>
                  <th className="px-4 py-3">STC Min</th>
                  <th className="px-4 py-3">STC Max</th>
                  <th className="px-4 py-3 text-center">Ficha Tecnica</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedStocks.map((item) => {
                  const estadoColor =
                    item.cantidadActual === 0
                      ? 'bg-red-500'
                      : item.cantidadActual <= item.stcMin
                      ? 'bg-yellow-400'
                      : 'bg-green-500';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-100 border-l border-r border-gray-200 shadow-sm transition-colors ${estadoColor}`}
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${estadoColor}`}
                          title={
                            item.cantidadActual === 0
                              ? 'Sin stock'
                              : item.cantidadActual <= item.stcMin
                              ? 'Bajo stock'
                              : 'Stock OK'
                          }
                        />
                        {item.referencia}
                      </td>
                      <td className="px-4 py-3">{item.nombreReferencia}</td>
                      <td className="px-4 py-3">{item.clase}</td>
                      <td className="px-4 py-3">{item.nombreClase}</td>

                      {(['cantidadActual', 'stcMin', 'stcMax'] as const).map((field) => (
                        <td key={field} className="px-4 py-3">
                          {editing?.id === item.id && editing.field === field ? (
                            <input
                              type="number"
                              value={editing.value}
                              onChange={(e) =>
                                setEditing({ ...editing, value: parseFloat(e.target.value) })
                              }
                              onBlur={finishEdit}
                              onKeyDown={onKey}
                              autoFocus
                              className="w-24 border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <span
                              onClick={() => startEdit(item.id, field, item[field])}
                              className="cursor-pointer hover:text-blue-600"
                            >
                              {item[field]}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        {item.fichaTecnica && (
                          <a
                            href={item.fichaTecnica?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center justify-center"
                          >
                            <FileText className="w-5 h-5" />
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center items-center gap-3">
                          <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => onDelete(item.id)}
                          />
                          <BarChart2
                            onClick={() => openStockVsVentas(item.referencia)}
                            className="cursor-pointer text-gray-600 hover:text-gray-800"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => (p + 1 < totalPages ? p + 1 : p))}
              disabled={currentPage + 1 >= totalPages}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div> */}
        </>
      )}

      <ModalCreateReferenciaStock isOpen={isOpen} onClose={closeModal} refesh={refetch} nombreClase={selectedClase} />
      <StockVsVentas isOpen={isOpenS} onClose={closeModals} referencia={referencia} key={referencia} />
    </div>
  );
};
