import { Card, CardContent } from "@/components/ui/card";
import { useUsersQuery } from "@/domain/graphql";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "./marcasVenta";

interface Venta {
  vendedor: string;
  nit: string;
  nombre_cliente: string;
  total: string;
  venta: string;
}

interface VendedorConVentas {
  id: string;
  nombre: string;
  identificacion: string;
  totalVentas: number;
  totalClientes: number;
}

export const TrabajadoresListCards = () => {
  const navigate = useNavigate();
  const { data } = useUsersQuery({
    variables: { pagination: { skip: 0, take: 1000 } },
  });

  const [trabajadores, setTrabajadores] = useState<VendedorConVentas[]>([]);
  const [loading, setLoading] = useState(true);

  /** Cargar ventas por cada vendedor */
  const cargarVentas = async () => {
    if (!data?.users) return;

    setLoading(true);

    const resultados: VendedorConVentas[] = [];

    for (const u of data.users) {
      const ident = u.identificationNumber;

      if (!ident) continue;

      try {
        const url = `${import.meta.env.VITE_APP_GRAPH}ventas/ventasTotales/${ident}`;
        const { data: ventas } = await axios.get<Venta[]>(url);

        const totalVentas = ventas.reduce(
          (sum, v) => sum + Number(v.venta),
          0
        );

        resultados.push({
          id: u.id,
          nombre: `${u.name} ${u.lastName}`,
          identificacion: ident,
          totalVentas,
          totalClientes: ventas.length,
        });
      } catch (error) {
        console.error("Error cargando ventas del vendedor", ident);
      }
    }

    setTrabajadores(resultados);
    setLoading(false);
  };

  useEffect(() => {
    cargarVentas();
  }, [data]);

  const irAlDetalle = (identificacion: string, idVendedor: string) => {
    navigate(`/dashboard/bi-trabajador/${identificacion}/${idVendedor}`);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Trabajadores
      </h2>

      {loading && (
        <p className="text-gray-500 italic">Cargando información...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trabajadores.map((t) => (
          <Card
            key={t.id}
            className="shadow hover:shadow-lg transition cursor-pointer border border-gray-200 rounded-xl"
            onClick={() => irAlDetalle(t.identificacion,t.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                  {t.nombre.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {t.nombre}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    CC: {t.identificacion}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Total vendido:
                  </span>{" "}
                  {formatCurrency(t.totalVentas)}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Clientes vendidos:
                  </span>{" "}
                  {t.totalClientes}
                </p>
              </div>

              <button
                className="mt-4 w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                Ver detalles →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && trabajadores.length === 0 && (
        <p className="text-center text-gray-500 py-6 italic">
          No se encontraron trabajadores con ventas registradas.
        </p>
      )}
    </div>
  );
};
