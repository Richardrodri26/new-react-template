import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect } from "react";
interface Cotizacion {
  vendedor: string;
  nombre: string;
  mes: string;
  dias_con_cotizaciones: string;
  total_cotizaciones: string;
  promedio_diario: string;
  valor_total: string;
}
export const CotizacionData = () => {
    const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);

    useEffect(() => {
        const fetchCotizaciones = async () => {
        try {
            const url = `${import.meta.env.VITE_APP_GRAPH}ventas/cotizacionesAll`;
            const { data } = await axios.get<Cotizacion[]>(url);
            setCotizaciones(data);
        } catch (error) {
            console.error("Error al obtener cotizaciones:", error);
        }
        };

        fetchCotizaciones();
    }, []);
    const onClikk = (vendedor: string) => {
        const mes = new Date().getMonth() + 1; // Mes actual (1-12)
        window.open(`https://intranet.cytech.net.co:3000/cotizacion?vendedor=${vendedor}&mes=${mes}`, "_blank");
    }
    return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Resumen de Cotizaciones por Vendedor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Vendedor</th>
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Mes</th>
                <th className="px-4 py-2 border">Días con Cotizaciones</th>
                <th className="px-4 py-2 border">Total Cotizaciones</th>
                <th className="px-4 py-2 border">Promedio Diario</th>
                <th className="px-4 py-2 border">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((item, index) => (
                <tr key={index} className="border-b cursor-pointer" onClick={() => onClikk(item.vendedor)}>
                  <td className="px-4 py-2 border" onClick={() => onClikk(item.vendedor)}>{item.vendedor}</td>
                  <td className="px-4 py-2 border">{item.nombre}</td>
                  <td className="px-4 py-2 border">{item.mes}</td>
                  <td className="px-4 py-2 border">{item.dias_con_cotizaciones}</td>
                  <td className="px-4 py-2 border">{item.total_cotizaciones}</td>
                  <td className="px-4 py-2 border">{item.promedio_diario}</td>
                  <td className="px-4 py-2 border">${Number(item.valor_total).toLocaleString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>
    )
}