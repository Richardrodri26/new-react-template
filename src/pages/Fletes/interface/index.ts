import { User } from "@/domain/graphql";

interface FacturaValida {
    clienteNombre: string;
    numeroFactura: string;
    fecha: string;  // ISO 8601 date string
    valorCosto: number;
    valorVenta: number;
    utilidadReal: number;
    utilidadRealPorcentaje: number;
    valorFlete: number;
    valorOip: number;
    valorBack: number;
    comision: number;
}

interface Totalizado {
    totalVendido: number;
    totalCosto: number;
    totalFlete: number;
    totalOip: number;
    totalBack: number;
    utilidad: number;
    utilidadPorcentaje: number;
    totalComision: number;
    totalRodamiento: number;
}

export interface UsuarioFacturas {
    user: User;
    facturasValide: FacturaValida[];
    totalizado: Totalizado;
}
  