import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface PedidoData {
    PED_TIPPED: number;
    PED_NUMPED: string;
    PED_PREFIJ: string;
    PED_CEDULA: string;
    NIT_NOMBRE: string;
    ciudad: string;
    PED_CEDCON: string;
    PED_CEDREF: string;
    PED_FECPED: string;
    PED_ORDCOM: string;
    PED_AGENTE: string;
    PED_PLAZO: number;
    PED_VENDED: string;
    PED_VALPED: number;
    PED_NUMREQ: string;
    PED_OBSERV: string;
    PED_DIRENV: string;
    PED_ESTREG: string;
    PED_ACTIVO: boolean;
    PED_ESTADO: number;
    PED_VERSIO: string;
    PED_CODOPE: string;
    PED_FECOPE: string;
    PED_USUARIO: string;
    PED_APROBADO: boolean;
    PED_ENVIADO: boolean;
}

interface FacturaTotales {
    facturaPending: number;
    totalFacturaPending: number;
    covifacturaPending: number;
}

export const PedidosPage = () => {
    const { id } = useParams<{ id: string }>();
    const [pedido, setPedido] = useState<PedidoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [approving, setApproving] = useState(false);
    const [rechazado, setRechazado] = useState(false);
    const [loadingRechazo, setLoadingRechazo] = useState(false);
    const [approved, setApproved] = useState(false);
    const [facturas, setFacturas] = useState<FacturaTotales | null>(null);
    const [loadingFacturas, setLoadingFacturas] = useState(true);

    useEffect(() => {
        if (!id) {
            setError("ID de pedido no válido");
            setLoading(false);
            return;
        }

        const fetchPedido = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://intranet.cytech.net.co:3003/pedidos/${id}`);
                if (!response.ok) throw new Error("No se pudo cargar el pedido");
                const data = await response.json();
                setPedido(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
                setPedido(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPedido();
    }, [id]);

    useEffect(() => {
        if (!pedido?.PED_CEDULA) {
            setFacturas(null);
            setLoadingFacturas(false);
            return;
        }

        const fetchFacturas = async () => {
            try {
                setLoadingFacturas(true);
                const nit = pedido.PED_CEDULA;
                const response = await fetch(`https://intranet.cytech.net.co:3002/covifactura/totales/${nit}`);
                if (!response.ok) throw new Error("No se pudo cargar las facturas");
                const data = await response.json();
                setFacturas(data);
            } catch (err) {
                console.error("Error cargando facturas:", err);
                setFacturas(null);
            } finally {
                setLoadingFacturas(false);
            }
        };

        fetchFacturas();
    }, [pedido?.PED_CEDULA]);

    const handleAprobar = async () => {
        if (!id) return;
        try {
            setApproving(true);
            const response = await fetch(`https://intranet.cytech.net.co:3003/pedidos/${id}/aprobar`, {
                method: "PATCH"
            });
            if (!response.ok) throw new Error("No se pudo aprobar el pedido");
            setApproved(true);
            setPedido(prev => prev ? { ...prev, PED_APROBADO: true } : null);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al aprobar");
        } finally {
            setApproving(false);
        }
    };

    const handleRechazar = async () => {
        if(!id) return;
        try {
            setLoadingRechazo(true);
            const response = await fetch(`https://intranet.cytech.net.co:3003/pedidos/${id}/rechazar`, {
                method: "PATCH"
            });
            if (!response.ok) throw new Error("No se pudo rechazar el pedido");
            setRechazado(true);
            setPedido(prev => prev ? { ...prev, PED_APROBADO: false } : null);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error al rechazar");
        }
        finally {
            setLoadingRechazo(false);
        }
        toast.error("Función de rechazo a implementar");
    };

    if (!id) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <Card className="p-8 text-center">
                    <p className="text-lg font-semibold text-slate-700">ID de pedido no válido</p>
                </Card>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-slate-700">Cargando pedido...</p>
                </div>
            </div>
        );
    }

    if (error || !pedido) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <Card className="p-8 text-center border-red-200 bg-red-50">
                    <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-red-700 mb-2">Error</p>
                    <p className="text-slate-600">{error || "No se encontró el pedido"}</p>
                </Card>
            </div>
        );
    }

    const fechaPedido = new Date(pedido.PED_FECPED).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const fechaOperacion = new Date(pedido.PED_FECOPE).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                Pedido <span className="text-blue-600">{pedido.PED_PREFIJ}-{pedido.PED_NUMPED}</span>
                            </h1>
                            <p className="text-slate-600">Información detallada del pedido</p>
                        </div>
                        <div className="flex gap-2">
                            {pedido.PED_APROBADO || approved ? (
                                <Badge className="bg-green-100 text-green-800 border-green-300 h-fit">
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Aprobado
                                </Badge>
                            ) : (
                                <Badge className="bg-amber-100 text-amber-800 border-amber-300 h-fit">
                                    Pendiente
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Approved Success Message */}
                {approved && (
                    <Card className="mb-8 p-6 bg-green-50 border-green-200">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <p className="text-green-800 font-semibold">¡Pedido aprobado exitosamente!</p>
                        </div>
                    </Card>
                )}

                {/* Main Card */}
                <Card className="shadow-lg border-0 mb-8">
                    <div className="p-6 md:p-8">
                        {/* Client Information */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b-2 border-blue-100">
                                📋 Información del Cliente
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Razón Social</p>
                                    <p className="text-lg text-slate-900 font-semibold mt-2">{pedido.NIT_NOMBRE}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">NIT/CEDULA</p>
                                    <p className="text-lg text-slate-900 font-semibold mt-2">{pedido.PED_CEDULA}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Ciudad</p>
                                    <p className="text-lg text-slate-900 font-semibold mt-2">{pedido.ciudad}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Dirección de Envío</p>
                                    <p className="text-lg text-slate-900 font-semibold mt-2">{pedido.PED_DIRENV}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b-2 border-blue-100">
                                🛒 Detalles del Pedido
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Valor Total</p>
                                    <p className="text-3xl font-bold text-blue-600 mt-2">{formatCurrency(pedido.PED_VALPED)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Plazo (días)</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">{pedido.PED_PLAZO}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Fecha del Pedido</p>
                                    <p className="text-lg text-slate-900 font-semibold mt-2">{fechaPedido}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Vendedor</p>
                                    <p className="text-lg text-slate-900 font-semibold mt-2">{pedido.PED_VENDED || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Facturas Pendientes */}
                        {loadingFacturas ? (
                            <div className="mb-8 p-6 bg-slate-100 rounded-lg text-center">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                                <p className="text-slate-600 text-sm">Cargando información de facturas...</p>
                            </div>
                        ) : facturas ? (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b-2 border-orange-100">
                                    📑 Facturas Pendientes
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border-2 border-orange-200 shadow-md">
                                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Cantidad Facturas</p>
                                        <p className="text-4xl font-bold text-orange-600 mt-3">{facturas.facturaPending}</p>
                                        <p className="text-xs text-orange-700 mt-2">pendientes por pagar</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-2 border-red-200 shadow-md">
                                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Valor Total Facturado</p>
                                        <p className="text-2xl font-bold text-red-600 mt-3">{formatCurrency(facturas.totalFacturaPending)}</p>
                                        <p className="text-xs text-red-700 mt-2">monto pendiente</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200 shadow-md">
                                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">CoviFacturas Pendientes</p>
                                        <p className="text-4xl font-bold text-purple-600 mt-3">{facturas.covifacturaPending}</p>
                                        <p className="text-xs text-purple-700 mt-2">en proceso</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {/* Observations */}
                        {pedido.PED_OBSERV && pedido.PED_OBSERV !== "." && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b-2 border-blue-100">
                                    💬 Observaciones
                                </h2>
                                <Card className="bg-slate-50 border-slate-200 p-4">
                                    <p className="text-slate-700 italic">{pedido.PED_OBSERV}</p>
                                </Card>
                            </div>
                        )}

                        {/* System Information */}
                        <div className="bg-slate-100 rounded-lg p-6 mb-8">
                            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-4">ℹ️ Información del Sistema</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-600 font-semibold">Operador</p>
                                    <p className="text-slate-900 mt-1">{pedido.PED_CODOPE}</p>
                                </div>
                                <div>
                                    <p className="text-slate-600 font-semibold">Fecha de Operación</p>
                                    <p className="text-slate-900 mt-1">{fechaOperacion}</p>
                                </div>
                                <div>
                                    <p className="text-slate-600 font-semibold">Estado</p>
                                    <p className="text-slate-900 mt-1">{pedido.PED_ESTADO === 0 ? "Activo" : "Inactivo"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Action Buttons */}
                {!approved && !pedido.PED_APROBADO && (
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                    disabled={approving}
                                >
                                    {approving ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Aprobando...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 mr-2" />
                                            Aprobar Pedido
                                        </>
                                    )}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmar aprobación</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        ¿Está seguro de que desea aprobar el pedido <span className="font-bold text-slate-900">{pedido.PED_PREFIJ}-{pedido.PED_NUMPED}</span> por un valor de <span className="font-bold text-green-600">{formatCurrency(pedido.PED_VALPED)}</span>?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogAction onClick={handleAprobar} className="bg-green-600 hover:bg-green-700">
                                    Sí, Aprobar
                                </AlertDialogAction>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleRechazar}
                            disabled={loadingRechazo}
                            className="border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold py-6 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <XCircle className="w-5 h-5 mr-2" />
                            {
                                loadingRechazo ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Rechazando...
                                    </>
                                ) : (
                                    "Rechazar Pedido"
                                )
                            }
                        </Button>
                    </div>
                )}

                {(approved || pedido.PED_APROBADO) && (
                    <Card className="p-6 text-center bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <p className="text-lg font-bold text-slate-900">Este pedido ya ha sido aprobado</p>
                        <p className="text-slate-600 mt-2">No se pueden realizar más acciones sobre este pedido</p>
                    </Card>
                )}
                {rechazado && (
                    <Card className="p-6 text-center bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
                        <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <p className="text-lg font-bold text-slate-900">Este pedido ya ha sido rechazado</p>
                        <p className="text-slate-600 mt-2">No se pueden realizar más acciones sobre este pedido</p>
                    </Card>
                )}
            </div>
        </div>
    );
}