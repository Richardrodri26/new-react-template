import { useState, useMemo, useEffect } from "react";
import { Calendar, Reply, Search } from "lucide-react";
import { Loader } from "@/pages/Commissions";
import { formatCurrency } from "@/pages/Reports/table/marcasVenta";
import dayjs from "dayjs";
import axios from "axios";
import { UsuarioFacturas } from "../interface";
import { axiosRest } from "@/domain/api.config";
import DataTable from "./tableComision";

export const ComisionByUserPage = () => {
  const [fechaInicio, setFechaInicio] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));
  const [loadingTable, setLoading] = useState(false); // Estado de carga
  const [loadingTableComision, setLoadingComision] = useState(false); // Estado de carga
  const [commissionResults, setCommissionResults] = useState<UsuarioFacturas[]>([]);
  const [dataComisionTable, setdataComisionTable] = useState<string>();
  const [dataComisionTableExterno, setdataComisionTableExterno] = useState<string>();
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  const fetchComisionesTableInterno = async () => {
    setLoadingComision(true);
    try {
      const response = await axiosRest.get(`/commissions/getConfigurationByTypeMonth/interno/${dayjs(fechaInicio).month() + 1}`);
      setdataComisionTable(response.data.jsonData);
    } catch (error) {
      console.error("Error fetching comisiones:", error);
    } finally {
      setLoadingComision(false);
    }
  };

  const fetchComisionesTableExterno = async () => {
    setLoadingComision(true);
    try {
      const response = await axiosRest.get(`/commissions/getConfigurationByTypeMonth/externo/${dayjs(fechaInicio).month() + 1}`);
      setdataComisionTableExterno(response.data.jsonData);
    } catch (error) {
      console.error("Error fetching comisiones:", error);
    } finally {
      setLoadingComision(false);
    }
  };

  const fetchComisiones = async () => {
    setLoading(true);
    try {
      const response = await axiosRest.get(`/fletes/totalizados/${fechaInicio}/${fechaFin}`);
      setCommissionResults(response.data);
    } catch (error) {
      console.error("Error fetching comisiones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      fetchComisiones();
      fetchComisionesTableInterno();
      fetchComisionesTableExterno();
    }
  }, [fechaInicio, fechaFin]);

  return (
    <div className="p-6">
      <Reply to={'/dashboard/parameters'} className="text-2xl font-bold text-gray-800 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Comisiones por Vendedor</h2>

      {/* Filtros por fecha */}
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700" htmlFor="fechaInicio">Fecha Inicio</label>
          <div className="flex items-center gap-2">
            <Calendar size={24} />
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700" htmlFor="fechaFin">Fecha Fin</label>
          <div className="flex items-center gap-2">
            <Calendar size={24} />
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
        </div>
      </div>

      <button
        onClick={fetchComisiones}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <Search size={20} />
        Buscar
      </button>

      {/* Botón flotante para abrir el modal */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800"
      >
        <Search size={24} />
      </button>

      {/* Modal con las dos tablas */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Comisiones Interno y Externo</h3>
            <div className="space-y-4">
              {dataComisionTable && (
                <DataTable jsonString={dataComisionTable} key={dataComisionTable} />
              )}
              {dataComisionTableExterno && (
                <DataTable jsonString={dataComisionTableExterno} key={dataComisionTableExterno} />
              )}
            </div>
            <button onClick={() => setShowModal(false)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {loadingTable ? (
        <Loader />
      ) : (
        <div className="mt-6 space-y-8">
          {commissionResults?.map((result, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Vendedor: {result.user ? result.user?.name + ' ' + result.user?.lastName + ' - ' + result.user.typeWoker?.toUpperCase() : 'VENDEDOR NO ESTA EN EL SELLE'}
              </h3>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Tota de rodamiento: {formatCurrency(result.totalizado.totalRodamiento)}
              </h3>
              {
               /*@ts-ignore*/
                result.user?.__subordinates__ && result.user?.__subordinates__?.length > 0 && (
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Tiene a cargo a: {
                      /*@ts-ignore*/
                    result.user.__subordinates__.map(subordinate => subordinate.name).join(', ')}
                  </h3>
                )
              }

              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Cliente</th>
                    <th className="border border-gray-300 px-4 py-2">Factura</th>
                    <th className="border border-gray-300 px-4 py-2">Fecha</th>
                    <th className="border border-gray-300 px-4 py-2">Valor Costo</th>
                    <th className="border border-gray-300 px-4 py-2">Valor Costo Real</th>
                    <th className="border border-gray-300 px-4 py-2">Valor Venta</th>
                    <th className="border border-gray-300 px-4 py-2">Utilidad Real</th>
                    <th className="border border-gray-300 px-4 py-2">Utilidad Real (%)</th>
                    <th className="border border-gray-300 px-4 py-2">Flete</th>
                    <th className="border border-gray-300 px-4 py-2">OIP</th>
                    <th className="border border-gray-300 px-4 py-2">Back Comisión</th>
                    <th className="border border-gray-300 px-4 py-2">Comisión</th>
                  </tr>
                </thead>
                <tbody>
                {
                  result.externo 
                    && (
                      <>
                        <tr key={index + 'grupo'}>
                          <td className="border border-gray-300 px-4 py-2">TOTAL GRUPO</td>
                          <td className="border border-gray-300 px-4 py-2"></td>
                          <td className="border border-gray-300 px-4 py-2"></td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.totalCostoGrupo  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.totalCostoRealGrupo  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.totalVentasGrupo  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.utilidadReal  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{result.externo.utilidadRealPorcentaje.toFixed(2)}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.totalFleteGrupo  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.totalOipGrupo  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.totalBackComisionGrupo  || 0))}</td>
                          <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.externo.comision || 0)) + ` (${result.externo?.comisionTable}%)`}</td>
                        </tr>
                      </>
                    )
                  }
                  <tr key={index + 'totalizado'}>
                    <td className="border border-gray-300 px-4 py-2">TOTAL</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalCosto || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalCostoReal || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalVendido || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.utilidad || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{result.totalizado.utilidadPorcentaje.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalFlete || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalOip || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalBack || 0))}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(result.totalizado.totalComision || 0))}</td>
                  </tr>
                  {result.facturasValide.map((factura, facturaIndex: number) => (
                    <tr key={facturaIndex} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{factura.clienteNombre}</td>
                      <td className="border border-gray-300 px-4 py-2">{factura.numeroFactura}</td>
                      <td className="border border-gray-300 px-4 py-2">{factura.fecha?.split('T')[0]}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valorCosto || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valorCostoReal || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valorVenta || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.utilidadReal || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{Number(factura.utilidadRealPorcentaje.toFixed(2) || 0)}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valorFlete || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valorOip || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valorBack || 0))}</td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.comision || 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
