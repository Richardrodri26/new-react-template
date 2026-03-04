import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PedidoItem {
  PED_NUMPED: string;
  PED_PREFIJ: string;
  PED_CIUDAD: string;
  PED_CEDULA: string;
  PED_FECPED: string;
  PED_VENDED: string;
  PED_VALPED: number;
  PED_NOMEMP: string;
  PED_ENVIADO: boolean;
  PED_APROBADO: boolean;
}

const PEDIDOS_FALLBACK: PedidoItem[] = [
  {
    PED_NUMPED: "000024725",
    PED_PREFIJ: "CYT",
    PED_CIUDAD: "08001",
    PED_CEDULA: "1045727280",
    PED_FECPED: "2026-01-14T05:00:00.000Z",
    PED_VENDED: "123456789",
    PED_VALPED: 555000,
    PED_NOMEMP: "CYTECH",
    PED_ENVIADO: true,
    PED_APROBADO: false,
  },
];
const PEDIDOS_SERVICE_URL = "https://intranet.cytech.net.co:3003/pedidos";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export const PedidosListPage = () => {
  const [pedidos, setPedidos] = useState<PedidoItem[]>(PEDIDOS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    codigo: "",
    cedula: "",
    ciudad: "",
    vendedor: "",
    empresa: "",
    estado: "",
  });

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        setLoading(true);
        const response = await fetch(PEDIDOS_SERVICE_URL);
        if (!response.ok) {
          throw new Error("No se pudo consultar el servicio de pedidos.");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPedidos(data);
          setServiceError(null);
          return;
        }
        throw new Error("El servicio respondió con un formato no válido.");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido consultando pedidos.";
        setServiceError(message);
        setPedidos(PEDIDOS_FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    loadPedidos();
  }, []);

  const filteredPedidos = useMemo(() => {
    return pedidos
      .filter((pedido) => {
        const code = `${pedido.PED_PREFIJ}-${pedido.PED_NUMPED}`.toLowerCase();
        const estado = pedido.PED_APROBADO
          ? "aprobado"
          : pedido.PED_ENVIADO
            ? "enviado"
            : "pendiente";

        return (
          code.includes(filters.codigo.toLowerCase()) &&
          pedido.PED_CEDULA.toLowerCase().includes(filters.cedula.toLowerCase()) &&
          pedido.PED_CIUDAD.toLowerCase().includes(filters.ciudad.toLowerCase()) &&
          pedido.PED_VENDED.toLowerCase().includes(filters.vendedor.toLowerCase()) &&
          pedido.PED_NOMEMP.toLowerCase().includes(filters.empresa.toLowerCase()) &&
          estado.includes(filters.estado.toLowerCase())
        );
      })
      .sort((a, b) => new Date(b.PED_FECPED).getTime() - new Date(a.PED_FECPED).getTime());
  }, [filters, pedidos]);

  const clearFilters = () =>
    setFilters({
      codigo: "",
      cedula: "",
      ciudad: "",
      vendedor: "",
      empresa: "",
      estado: "",
    });

  return (
    <div className="p-4 sm:p-6">
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Pedidos</h1>
            <p className="text-sm text-slate-500">
              Filtra por columna y haz clic en el código para abrir el pedido.
            </p>
          </div>
          <Button variant="outline" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </div>
        {serviceError && (
          <p className="text-xs text-amber-700 mb-3">
            Servicio no disponible: {serviceError} Se muestra el array de respaldo.
          </p>
        )}
        {loading && <p className="text-sm text-slate-500 mb-3">Cargando pedidos...</p>}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Código</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Fecha</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Cédula</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Ciudad</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Vendedor</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Empresa</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Valor</th>
                <th className="text-left px-3 py-2 text-xs font-semibold uppercase">Estado</th>
              </tr>
              <tr className="border-b">
                <th className="px-2 py-2">
                  <Input
                    value={filters.codigo}
                    onChange={(e) => setFilters((prev) => ({ ...prev, codigo: e.target.value }))}
                    placeholder="Buscar código"
                  />
                </th>
                <th className="px-2 py-2"></th>
                <th className="px-2 py-2">
                  <Input
                    value={filters.cedula}
                    onChange={(e) => setFilters((prev) => ({ ...prev, cedula: e.target.value }))}
                    placeholder="Buscar cédula"
                  />
                </th>
                <th className="px-2 py-2">
                  <Input
                    value={filters.ciudad}
                    onChange={(e) => setFilters((prev) => ({ ...prev, ciudad: e.target.value }))}
                    placeholder="Buscar ciudad"
                  />
                </th>
                <th className="px-2 py-2">
                  <Input
                    value={filters.vendedor}
                    onChange={(e) => setFilters((prev) => ({ ...prev, vendedor: e.target.value }))}
                    placeholder="Buscar vendedor"
                  />
                </th>
                <th className="px-2 py-2">
                  <Input
                    value={filters.empresa}
                    onChange={(e) => setFilters((prev) => ({ ...prev, empresa: e.target.value }))}
                    placeholder="Buscar empresa"
                  />
                </th>
                <th className="px-2 py-2"></th>
                <th className="px-2 py-2">
                  <Input
                    value={filters.estado}
                    onChange={(e) => setFilters((prev) => ({ ...prev, estado: e.target.value }))}
                    placeholder="Aprobado/Enviado"
                  />
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPedidos.length === 0 ? (
                <tr>
                  <td className="px-3 py-6 text-center text-sm text-slate-500" colSpan={8}>
                    No hay resultados para los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredPedidos.map((pedido) => {
                  const code = `${pedido.PED_PREFIJ}-${pedido.PED_NUMPED}`;
                  const routeCode = `${pedido.PED_NUMPED}`;

                  return (
                    <tr key={code} className="border-b hover:bg-slate-50">
                      <td className="px-3 py-2 text-sm font-medium">
                        <Link className="text-blue-600 hover:underline" to={`/pedido/${routeCode}`} target="_blank">
                          {code}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-sm">{formatDate(pedido.PED_FECPED)}</td>
                      <td className="px-3 py-2 text-sm">{pedido.PED_CEDULA}</td>
                      <td className="px-3 py-2 text-sm">{pedido.PED_CIUDAD}</td>
                      <td className="px-3 py-2 text-sm">{pedido.PED_VENDED || "-"}</td>
                      <td className="px-3 py-2 text-sm">{pedido.PED_NOMEMP}</td>
                      <td className="px-3 py-2 text-sm">{formatCurrency(pedido.PED_VALPED)}</td>
                      <td className="px-3 py-2 text-sm">
                        {pedido.PED_APROBADO ? "Aprobado" : pedido.PED_ENVIADO ? "Enviado" : "Pendiente"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
