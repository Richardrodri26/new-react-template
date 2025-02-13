import { TypeWorker, useFindAllFacturaClienteQuery, User, useUsersQuery } from "@/domain/graphql";
import { findCommission } from "@/lib/utils";
import { Loader } from "@/pages/Commissions";
import { formatCurrency } from "@/pages/Reports/table/marcasVenta";
import dayjs from "dayjs";
import { Calendar, Reply, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

export const ComisionByUserPage = () => {
  const [fechaInicio, setFechaInicio] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));
  const [loadingTable, setLoading] = useState(false); // Estado de carga
  const [commissionResults, setCommissionResults] = useState<any[]>([]);
  const { data, loading, refetch } = useFindAllFacturaClienteQuery({
    variables: { input: { tem_fecha_desde: fechaInicio, tem_fecha_hasta: fechaFin } }
  });
  const { data: usersData, loading: loadingUsers } = useUsersQuery({
        variables: {
            pagination: {
                skip: 0,
                take: 999
            },
        }
    });
    const usersByCedula = useMemo(() => {
        const map = new Map<string, User>();
        usersData?.users.forEach((user) => {
            map.set(user.identificationNumber || "Sin Vendedor" , user as User);
        });
        return map;
        }, [usersData]);
  const groupedData = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    data?.findAllFacturaCliente.forEach((item: any) => {
      const vendedor = item.TEM_VENDED || "Sin Vendedor";
      if (!grouped[vendedor]) grouped[vendedor] = [];
      grouped[vendedor].push(item);
    });

    return grouped;
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const results = [];
      for (const [vendedor, facturas] of Object.entries(groupedData)) {
        const vendedorData = usersByCedula.get(vendedor);
        const totalVendido = facturas.reduce((sum, factura) => sum + parseFloat(factura.TEM_VENTA || 0), 0);
        const totalCosto = facturas.reduce((sum, factura) => sum + parseFloat(factura.TEM_VALCOS || 0), 0);
        const utlidad = totalVendido - totalCosto;
        const utilidadPorcentaje = totalVendido !== 0 ? (utlidad / totalVendido) * 100 : 0;
        const type = vendedorData?.typeWoker === TypeWorker.Interno ? 'interno' : 'externo';
        
        // Aquí hacemos el await de la función findCommission
        const totalPagar = await findCommission(totalVendido, Number(utilidadPorcentaje.toFixed(2)), type, dayjs(fechaInicio).locale('es').format('MMMM'));

        // Guardamos los resultados
        results.push({
          vendedor,
          vendedorData,
          totalVendido,
          totalCosto,
          utilidadPorcentaje,
          facturas,
          totalPagar
        });
      }
      setLoading(false)
      setCommissionResults(results);
    };

    fetchData();
  }, [groupedData, usersByCedula]); 
  return (
    <div className="p-6">
      <Reply to={'/dashboard/parameters'} className="text-2xl font-bold text-gray-800 mb-4"/>
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
        onClick={() => refetch()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <Search size={20} />
        Buscar
      </button>

      { 
        loading || loadingTable 
        ?
        <Loader/>
        :
        <>
                {/* Tablas por vendedor */}
      <div className="mt-6 space-y-8">
      {commissionResults.map((result, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Vendedor: {result.vendedorData?.fullName}
          </h3>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            Total Vendido: <span className="text-gray-600">{formatCurrency(result.totalVendido)}</span>
          </h4>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            Total Costo: <span className="text-gray-600">{formatCurrency(result.totalCosto)}</span>
          </h4>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            Utilidad : <span className="text-gray-600">{result.utilidadPorcentaje.toFixed(2)}</span>
          </h4>
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            Total a Pagar: <span className="text-gray-600">{result.totalPagar}</span>
          </h4>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Cliente</th>
                <th className="border border-gray-300 px-4 py-2">Valor Costo</th>
                <th className="border border-gray-300 px-4 py-2">Valor Venta</th>
                <th className="border border-gray-300 px-4 py-2">Utilidad</th>
                <th className="border border-gray-300 px-4 py-2">Utilidad %</th>
                <th className="border border-gray-300 px-4 py-2">Flete</th>
                <th className="border border-gray-300 px-4 py-2">OIP</th>
                <th className="border border-gray-300 px-4 py-2">Back Comisión</th>
              </tr>
            </thead>
            <tbody>
              {result.facturas.map((factura: any, facturaIndex: number) => (
                <tr key={facturaIndex} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{factura.TEM_NOMCLI}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.TEM_VALCOS || 0))}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.TEM_VENTA || 0))}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.TEM_UTILIDAD || 0))}</td>
                  <td className="border border-gray-300 px-4 py-2">{factura.TEM_PORCENTAJE_UTILIDAD || 0}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.valueFlete || 0))}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.oip || 0))}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(Number(factura.backComision || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      </div>
        </>
      }
    </div>
  );
};
