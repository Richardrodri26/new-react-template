import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface Factura {
  DistributorName: string;
  InvoiceDate: string;
  InvoiceNum: string;
  InvoiceLine: string;
  BilltoName: string;
  BilltoCity: string;
  BilltoCountry: string;
  ShiptoName: string;
  ShiptoAddress: string;
  shiptoCity: string;
  shipto_Postalcode: string;
  ShipCountry: string;
  EndUser: string;
  MidPart: string;
  MidDescription: string;
  SoldQty: number;
  UOM: string | null;
  UOMDenomination: string;
  UnidPriceUSD: number;
  ExtendedPriceUSD: number;
  PricingCountry: string;
  Currency: string;
}

interface FacturasResponse {
  success: boolean;
  data: Factura[];
}

const TablaFacturas: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina] = useState(10);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ano, setAno] = useState<string>('');
  const [mes, setMes] = useState<string>('');
  const [trm, setTrm] = useState<string>('');
  const [filasExpandidas, setFilasExpandidas] = useState<{ [key: number]: boolean }>({}); // Estado para controlar la expansión por fila

  const obtenerFacturas = async () => {
    setCargando(true);
    setError(null);

    try {
      // Validar que los campos estén completos
      if (!ano || !mes || !trm) {
        throw new Error('Por favor, completa todos los campos (año, mes y TRM).');
      }

      // Realizar la solicitud HTTP
      const url = `http://intranet.cytech.net.co:3003/brute-force/getReportPosInv?ano=${ano}&mes=${mes}&trm=${trm}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al obtener las facturas');
      }

      const data: FacturasResponse = await response.json();

      if (data.success) {
        setFacturas(data.data);
        setFilasExpandidas({}); // Reiniciar el estado de filas expandidas
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      setError(error instanceof Error ? error.message : 'Error al obtener las facturas. Por favor, inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const descargarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(facturas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendido');
    XLSX.writeFile(workbook, 'Inventario-post.xlsx');
  };

  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const itemsActuales = facturas.slice(indicePrimerItem, indiceUltimoItem);

  const cambiarPagina = (numeroPagina: number) => setPaginaActual(numeroPagina);

  // Columnas iniciales (primeras 5)
  const columnasIniciales = [
    { key: 'DistributorName', label: 'Distributor' },
    { key: 'InvoiceDate', label: 'Fecha Factura' },
    { key: 'InvoiceNum', label: 'Número Factura' },
    { key: 'InvoiceLine', label: 'Línea Factura' },
    { key: 'BilltoName', label: 'Cliente' },
  ];

  // Todas las columnas
  const todasLasColumnas = [
    { key: 'DistributorName', label: 'Distributor' },
    { key: 'InvoiceDate', label: 'Fecha Factura' },
    { key: 'InvoiceNum', label: 'Número Factura' },
    { key: 'InvoiceLine', label: 'Línea Factura' },
    { key: 'BilltoName', label: 'Cliente' },
    { key: 'BilltoCity', label: 'Ciudad Cliente' },
    { key: 'BilltoCountry', label: 'País Cliente' },
    { key: 'ShiptoName', label: 'Destinatario' },
    { key: 'ShiptoAddress', label: 'Dirección Destinatario' },
    { key: 'shiptoCity', label: 'Ciudad Destinatario' },
    { key: 'shipto_Postalcode', label: 'Código Postal' },
    { key: 'ShipCountry', label: 'País Destinatario' },
    { key: 'EndUser', label: 'End User' },
    { key: 'MidPart', label: 'Parte' },
    { key: 'MidDescription', label: 'Descripción' },
    { key: 'SoldQty', label: 'Cantidad' },
    { key: 'UnidPriceUSD', label: 'Precio Unitario (USD)' },
    { key: 'ExtendedPriceUSD', label: 'Precio Total (USD)' },
    { key: 'Currency', label: 'Moneda' },
  ];

  // Alternar la expansión de una fila específica
  const alternarExpansion = (index: number) => {
    setFilasExpandidas((prev) => ({
      ...prev,
      [index]: !prev[index], // Alternar entre true/false
    }));
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Facturas</h1>

        {/* Campos para año, mes y TRM */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Año</label>
          <input
            type="text"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ej: 2025"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mes</label>
          <input
            type="text"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ej: 2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">TRM</label>
          <input
            type="text"
            value={trm}
            onChange={(e) => setTrm(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ej: 4000"
          />
        </div>

        {/* Botón para generar el reporte */}
        <button
          onClick={obtenerFacturas}
          disabled={cargando || !ano || !mes || !trm}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {cargando ? 'Generando...' : 'Generar Reporte'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {facturas.length > 0 && (
          <>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    {columnasIniciales.map((columna) => (
                      <th key={columna.key} className="py-2 px-4 border-b">
                        {columna.label}
                      </th>
                    ))}
                    <th className="py-2 px-4 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsActuales.map((factura, index) => (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-gray-50">
                        {columnasIniciales.map((columna) => (
                          <td key={columna.key} className="py-2 px-4 border-b">
                            {factura[columna.key as keyof Factura]}
                          </td>
                        ))}
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => alternarExpansion(index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {filasExpandidas[index] ? 'Ver menos' : 'Ver más'}
                          </button>
                        </td>
                      </tr>
                      {filasExpandidas[index] && (
                        <tr>
                          <td colSpan={columnasIniciales.length + 1} className="py-2 px-4 border-b">
                            <div className="grid grid-cols-2 gap-4">
                              {todasLasColumnas.slice(columnasIniciales.length).map((columna) => (
                                <div key={columna.key} className="flex">
                                  <span className="font-medium">{columna.label}:</span>
                                  <span className="ml-2">{factura[columna.key as keyof Factura]}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
                {Array.from({ length: Math.ceil(facturas.length / itemsPorPagina) }, (_, i) => (
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

export default TablaFacturas;