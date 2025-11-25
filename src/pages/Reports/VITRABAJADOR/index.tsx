import { TrabajadoresListCards } from "../table/DataVentas";

export const ViTrabajador = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Reporte de Ventas por Trabajador</h1>
        <TrabajadoresListCards />
    </div>
  );
}