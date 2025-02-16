import { axiosRest } from "@/domain/api.config";
import { UsuarioFacturas } from "@/pages/Fletes/interface";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "./marcasVenta";


const FacturasTable  = () => {
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
            <th className="border px-4 py-2">Comisión</th>
            <th className="border px-4 py-2">Valor Transporte</th>
          </tr>
        </thead>
        {commissionResults.map((usuario, index) => {
            const { user, facturasValide, totalizado, externo } = usuario;
            return (
                  <tbody>
                    {
                      externo
                      ?
                      (
                        <>
                          <tr key={index} className="text-center">
                            <td className="border px-4 py-2">{user?.name || "Usuario desconocido"}</td>
                            <td className="border px-4 py-2">{formatCurrency(externo.totalVentasGrupo)}</td>
                            <td className="border px-4 py-2">{(externo.utilidadRealPorcentaje.toFixed(2))}</td>
                            <td className="border px-4 py-2">{formatCurrency(externo.comision)}</td>
                            <td className="border px-4 py-2">{0}</td>
                          </tr>
                        </>
                      )
                      :
                      (
                      <>
                        <tr key={index} className="text-center">
                          <td className="border px-4 py-2">{user?.name || "Usuario desconocido"}</td>
                          <td className="border px-4 py-2">{formatCurrency(totalizado.totalVendido)}</td>
                          <td className="border px-4 py-2">{(totalizado.utilidadPorcentaje.toFixed(2))}</td>
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
};

export default FacturasTable;
