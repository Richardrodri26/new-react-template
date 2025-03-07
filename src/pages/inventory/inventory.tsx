// src/components/TablaPaginada.tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { obtenerDatos, obtenerTRM } from './service';

interface DatosTabla {
  DistributorName: string;
  DistLoc: string;
  DistLocCountry: string;
  CommScopePart: string;
  PartDesc: string;
  UOM: string | null;
  Qty: number;
  ExtendedValuesUSD: number;
  Currency: string;
  ReportedMo: number;
}

const TablaPaginada: React.FC = () => {
  const [datos, setDatos] = useState<DatosTabla[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina] = useState(10);
  const [fini, setFini] = useState('2025-02-01');
  const [ffin, setFfin] = useState('2025-02-27');
  const [trm, setTrm] = useState<string | null>(null);
  const [nummber, setNumberE] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generarReporte = async () => {
    setCargando(true);
    setError(null);

    try {
        let promedioTRM =''
     if(!trm){
        promedioTRM = await obtenerTRM();
        setTrm(promedioTRM);
     }

      const data = await obtenerDatos(fini, ffin, trm || promedioTRM);
      setNumberE(data.number)
      setDatos(data.data);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      setError('Error al generar el reporte. Por favor, inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const descargarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario in');
    XLSX.writeFile(workbook, 'inventario-in.xlsx');
  };

  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const itemsActuales = datos.slice(indicePrimerItem, indiceUltimoItem);

  const cambiarPagina = (numeroPagina: number) => setPaginaActual(numeroPagina);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Generar Reporte</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            value={fini}
            onChange={(e) => setFini(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            value={ffin}
            onChange={(e) => setFfin(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Trm</label>
          <input
            type="number"
            value={trm || ''}
            onChange={(e) => setTrm(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={generarReporte}
          disabled={cargando}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {cargando ? 'Generando...' : 'Generar Reporte'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {trm !== null && (
          <p className="mt-4">
            TRM Promedio: <strong>{trm}</strong>
          </p>
        )}
        {nummber !== null && (
          <p className="mt-4">
            Numero Encontrado: <strong>{nummber}</strong>
          </p>
        )}

        {datos.length > 0 && (
          <>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">DistributorName</th>
                    <th className="py-2 px-4 border-b">DistLoc</th>
                    <th className="py-2 px-4 border-b">DistLocCountry</th>
                    <th className="py-2 px-4 border-b">CommScopePart</th>
                    <th className="py-2 px-4 border-b">PartDesc</th>
                    <th className="py-2 px-4 border-b">Qty</th>
                    <th className="py-2 px-4 border-b">ExtendedValuesUSD</th>
                    <th className="py-2 px-4 border-b">Currency</th>
                    <th className="py-2 px-4 border-b">ReportedMo</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsActuales.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{item.DistributorName}</td>
                      <td className="py-2 px-4 border-b">{item.DistLoc}</td>
                      <td className="py-2 px-4 border-b">{item.DistLocCountry}</td>
                      <td className="py-2 px-4 border-b">{item.CommScopePart}</td>
                      <td className="py-2 px-4 border-b">{item.PartDesc}</td>
                      <td className="py-2 px-4 border-b">{item.Qty}</td>
                      <td className="py-2 px-4 border-b">{item.ExtendedValuesUSD.toFixed(2)}</td>
                      <td className="py-2 px-4 border-b">{item.Currency}</td>
                      <td className="py-2 px-4 border-b">{item.ReportedMo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={descargarExcel}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Descargar Excel
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(datos.length / itemsPorPagina) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => cambiarPagina(i + 1)}
                    className={`px-4 py-2 rounded-md ${
                      paginaActual === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TablaPaginada;