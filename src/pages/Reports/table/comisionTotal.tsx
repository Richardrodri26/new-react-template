import { axiosRest } from "@/domain/api.config";
import { UsuarioFacturas } from "@/pages/Fletes/interface";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { formatCurrency } from "./marcasVenta";
import { Loader } from "@/pages/Commissions";
import { calculatePercentageColor } from "..";
import { CotizacionData } from "./cotizacionData";
import VentasTiendaTable from "./VentasTiendaTable";
import { Data } from "@react-google-maps/api";


function convertirANumero(valor: string | null) {
  if(!valor) return 0;
  // Eliminar las comas y convertir a número
  return parseFloat(valor.replace(/,/g, ''));
}



const FacturasTable: React.FC = memo(() => {
  const [loadingTable, setLoading] = useState(false); // Estado de carga
  const [commissionResults, setCommissionResults] = useState<UsuarioFacturas[]>([]);
  const [fechaInicio, setFechaInicio] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));

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
    fetchComisiones();
  }, [fechaInicio, fechaFin]);  // Dependencias ajustadas a fechas

  useEffect(() => {
    if (commissionResults.length > 0) {
      calculeTotalizado();
    }
  }, [commissionResults]); // Solo se ejecuta cuando commissionResults cambia

  const calculeTotalizado = () => {
    const totalVentido = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalVendido || 0), 0);
    const totalCosto = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalCosto || 0), 0);
    const totalCostoReal = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalCostoReal || 0), 0);
    const totalFlete = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalFlete || 0), 0);
    const totalOip = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalOip || 0), 0);
    const totalBack = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalBack || 0), 0);

    const utlidad = totalVentido - (totalCosto - totalOip + totalBack + totalFlete);
    const utilidadPorcentaje = +(totalVentido !== 0 ? (utlidad / totalVentido) * 100 : 0)?.toFixed(2);

    console.log("🔹 Total Vendido:", totalVentido);
    console.log("🔹 Total Costo:", totalCosto);
    console.log("🔹 Total Costo Real:", totalCostoReal);
    console.log("🔹 Total Flete:", totalFlete);
    console.log("🔹 Total OIP:", totalOip);
    console.log("🔹 Total Back:", totalBack);
    console.log("🔹 Utilidad Calculada:", utlidad);
    console.log("🔹 Utilidad %:", utilidadPorcentaje);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta individual</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta grupal</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto en %</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilidad Real</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión (%)</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión AV</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rodamiento AV</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta vsita</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión DV</th>
              <th className="x-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rodamiento DV</th>
            </tr>
          </thead>
          {loadingTable && (
            <div className="animate-pulse space-y-4 p-5">
              <tr className="text-left">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded"></div>
                ))}
              </tr>
            </div>
          )}
          {commissionResults.map((usuario, index) => {
            const { user, facturasValide, totalizado, externo, presupuesto } = usuario;
            return (
              <tbody key={index}>
                {externo || user?.typeWoker == 'interno' ? (
                  <tr className="text-left">
                    <td className="px-6 py-4 whitespace-nowrap">{user ? user?.name + ' ' + user?.lastName : "Usuario desconocido"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(totalizado.totalVendido)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(externo?.totalVentasGrupo || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(presupuesto?.PRESUPUESTO || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full h-4 bg-gray-200 rounded-md">
                        <div
                          className={`h-full ${calculatePercentageColor(
                            ((externo?.totalVentasGrupo || 0) / (presupuesto?.PRESUPUESTO || 0)) * 100 || 0
                          )} rounded-md`}
                          style={{ width: `${(((externo?.totalVentasGrupo || 0) / (presupuesto?.PRESUPUESTO || 0)) * 100 || 0) > 100 ? 100 :(((externo?.totalVentasGrupo || 0) / (presupuesto?.PRESUPUESTO || 0)) * 100 || 0) }%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{(externo?.utilidadRealPorcentaje?.toFixed(2) || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(externo?.comisionTable || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(externo?.comision || 0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">0</td>
                    <td className="px-6 py-4 whitespace-nowrap">0</td>
                  </tr>
                ) : (
                  <tr className="text-left">
                    <td className="px-6 py-4 whitespace-nowrap">{user ? user?.name + ' ' + user?.lastName : "Usuario desconocido"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(totalizado.totalVendido)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(totalizado.totalVendido)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(presupuesto?.PRESUPUESTO || 0)}</td>
                    {/* @ts-ignore */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full h-4 bg-gray-200 rounded-md">
                        <div
                          className={`h-full ${calculatePercentageColor(
                            (totalizado?.totalVendido / (presupuesto?.PRESUPUESTO)) * 100 || 0
                          )} rounded-md`}
                          style={{ width: `${((totalizado?.totalVendido / (presupuesto?.PRESUPUESTO)) * 100 || 0) > 100 ? 100 : ((totalizado?.totalVendido / (presupuesto?.PRESUPUESTO)) * 100 || 0)  }%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{(totalizado.utilidadPorcentaje?.toFixed(2))}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(user?.typeWoker == 'freelance' ? user.valueFreelance + "%" : totalizado.comisionTable)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user?.typeWoker == 'freelance' ? formatCurrency((totalizado.utilidad *  (user?.valueFreelance || 0)) / 100) : formatCurrency(totalizado.totalComision)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(totalizado.totalRodamiento)}</td>
                    {/* @ts-ignore */}
                    <td className="px-6 py-4 whitespace-nowrap">{(totalizado?.porcentajeRealizado?.toFixed(2) || 0) +  "% de " + (user?.valueMinVisit || 0) + "% "}</td>
                    {/* @ts-ignore */}
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(totalizado.totalComisionAb)}</td>
                    {/* @ts-ignore */}
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(totalizado.totalRodamientoAV)}</td>
                    
                  </tr>
                )}
              </tbody>
            );
          })}
        </table>
      </div>
      <CotizacionData /> <br />
      <VentasTiendaTable /> <br />
      {/* <VentasDataTable /> */}
    </div>
  );
});

export default FacturasTable;
