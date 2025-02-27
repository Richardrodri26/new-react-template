import { axiosRest } from "@/domain/api.config";
import { UsuarioFacturas } from "@/pages/Fletes/interface";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { formatCurrency } from "./marcasVenta";
import { Loader } from "@/pages/Commissions";

interface ResumenCardsProps {
  setUtilidad: React.Dispatch<React.SetStateAction<number>>;
}

const FacturasTable: React.FC<ResumenCardsProps>  = memo(({setUtilidad}) => {
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
    if (commissionResults.length > 0) {
      calculeTotalizado();
    }
  }, [commissionResults]); 
  const calculeTotalizado = () => {
    const totalVentido = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalVendido || 0), 0);
    const totalCosto = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalCosto || 0), 0);
    const totalCostoReal = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalCostoReal || 0), 0);
    const totalFlete = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalFlete || 0), 0);
    const totalOip = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalOip || 0), 0);
    const totalBack = commissionResults.reduce((sum, factura) => sum + Number(factura.totalizado.totalBack || 0), 0);
  
    const utlidad = totalVentido - (totalCosto - totalOip + totalBack + totalFlete);
    const utilidadPorcentaje = +(totalVentido !== 0 ? (utlidad / totalVentido) * 100 : 0).toFixed(2);
  
    // Logs detallados para depuración
    console.log("🔹 Total Vendido:", totalVentido);
    console.log("🔹 Total Costo:", totalCosto);
    console.log("🔹 Total Costo Real:", totalCostoReal);
    console.log("🔹 Total Flete:", totalFlete);
    console.log("🔹 Total OIP:", totalOip);
    console.log("🔹 Total Back:", totalBack);
    console.log("🔹 Utilidad Calculada:", utlidad);
    console.log("🔹 Utilidad %:", utilidadPorcentaje);
  
    setUtilidad(utilidadPorcentaje);
  };
  
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      fetchComisiones();
    }
  }, [fechaInicio, fechaFin]);
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
      <div className="mb-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Usuario</th>
            <th className="border px-4 py-2">Venta</th>
            <th className="border px-4 py-2">Utilidad Real</th>
            <th className="border px-4 py-2">Comisión (%)</th>
            <th className="border px-4 py-2">Comisión</th>
            <th className="border px-4 py-2">Subsidio rodamiento</th>
          </tr>
        </thead>
        {
          loadingTable && (
            <div className="animate-pulse space-y-4 p-5">
              <tr className="text-left">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
              </tr>
          </div>
          )
        }
        {commissionResults.map((usuario, index) => {
            const { user, facturasValide, totalizado, externo } = usuario;
            return (
                  <tbody>
                    {
                      externo
                      ?
                      (
                        <>
                          <tr key={index} className="text-left">
                            <td className="border px-4 py-2">{user ? user?.name + ' ' + user?.lastName : "Usuario desconocido"}</td>
                            <td className="border px-4 py-2">{formatCurrency(externo.totalVentasGrupo)}</td>
                            <td className="border px-4 py-2">{(externo.utilidadRealPorcentaje.toFixed(2))}</td>
                            <td className="border px-4 py-2">{(externo.comisionTable)}</td>
                            <td className="border px-4 py-2">{formatCurrency(externo.comision)}</td>
                            <td className="border px-4 py-2">{0}</td>
                          </tr>
                        </>
                      )
                      :
                      (
                      <>
                        <tr key={index} className="text-left">
                          <td className="border px-4 py-2">{user ? user?.name + ' ' + user?.lastName : "Usuario desconocido"}</td>
                          <td className="border px-4 py-2">{formatCurrency(totalizado.totalVendido)}</td>
                          <td className="border px-4 py-2">{(totalizado.utilidadPorcentaje.toFixed(2))}</td>
                          <td className="border px-4 py-2">{(totalizado.comisionTable)}</td>
                          <td className="border px-4 py-2">{formatCurrency(totalizado.totalComision)}</td>
                          <td className="border px-4 py-2">{formatCurrency(totalizado.totalRodamiento)}</td>
                        </tr>
                      </>
                      )
                    }
                  </tbody>
            );
          })}
      </table>
      </div>
    </div>
  );
});

export default FacturasTable;
