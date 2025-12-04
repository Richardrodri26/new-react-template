import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  Search,
  Calendar,
  User,
  Clipboard,
  DollarSign,
  Percent,
  Eye,
  Edit,
} from "lucide-react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import {
  FletesWithDocument,
  FindOneFacturaClienteByCode,
  useCreateFletesMutation,
  useFindAllFacturaClienteQuery,
  useFindOneFacturaClienteByCodeLazyQuery,
  useUpdateFletesMutation
} from "@/domain/graphql";
import { Loader } from "../Commissions";
import { ToastyErrorGraph } from "@/lib/utils";
import { ModalDetalleFactura } from "./admin/ModalDetailsFactura";


const formatCurrency = (amount: number | string | null | undefined): string => {
  if (!amount) return "0";
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(numericAmount);
};


export const FletesPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const fechaInicioParams = params.get("fechaInicio");
  const fechaFinParams = params.get("fechaFin");

  const [facturaSeleccionada, setFacturaSeleccionada] =
    useState<FletesWithDocument | null>(null);
  const [facturaNumber, setFacturaNumber] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);
  const [refetchLoading, setRefetchLoading] = useState(false);

  const [formData, setFormData] = useState({
    valueFlete: 0,
    oip: 0,
    backComision: 0,
    numberGuia: "",
    carrier: "",
    carrierCell: "",
    contactClient: "",
    description: "",
    isFound: false,
    id: "",
  });

  const [filtro, setFiltro] = useState("");
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("");

  const [fechaInicio, setFechaInicio] = useState(
    fechaInicioParams
      ? fechaInicioParams
      : dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [fechaFin, setFechaFin] = useState(
    fechaFinParams ? fechaFinParams : dayjs().endOf("month").format("YYYY-MM-DD")
  );

  const { data, loading, refetch } = useFindAllFacturaClienteQuery({
    variables: {
      input: {
        tem_fecha_desde: fechaInicio,
        tem_fecha_hasta: fechaFin,
      },
    },
  });

  const [findOneFlete] = useFindOneFacturaClienteByCodeLazyQuery();
  const [createFlete] = useCreateFletesMutation();
  const [updateFlete] = useUpdateFletesMutation();

  useEffect(() => {
    if (filtroSeleccionado === "") {
      handleBuscar();
    }
  }, [filtroSeleccionado]);

  const handleBuscar = async () => {
    setRefetchLoading(true);
    await refetch({
      input: {
        tem_numdoc: filtroSeleccionado === "id" ? filtro : undefined,
        tem_nomcli: filtroSeleccionado === "cliente" ? filtro : undefined,
        tem_vended: filtroSeleccionado === "vendedor" ? filtro : undefined,
        tem_fecha_desde: fechaInicio,
        tem_fecha_hasta: fechaFin,
      },
    });
    setRefetchLoading(false);
  };

  const onKeyDownBuscar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar();
  };

  const handleOpenModal = async (factura: FletesWithDocument) => {
    setFacturaSeleccionada(factura);
    toast.info("Cargando información de fletes...");

    const { data } = await findOneFlete({
      variables: { code: factura.TEM_NUMDOC || "" },
      fetchPolicy: "no-cache",
    });

    if (data?.findOneFacturaClienteByCode?.isFound) {
      const flete = data.findOneFacturaClienteByCode.flete;
      setFormData({
        valueFlete: flete?.valueFlete || 0,
        oip: flete?.oip || 0,
        backComision: flete?.backComision || 0,
        numberGuia: flete?.numberGuia || "",
        carrier: flete?.carrier || "",
        carrierCell: flete?.carrierCell || "",
        contactClient: flete?.contactClient || "",
        description: flete?.description || "",
        isFound: true,
        id: flete?.id || "",
      });
    } else {
      setFormData({
        valueFlete: 0,
        oip: 0,
        backComision: 0,
        numberGuia: "",
        carrier: "",
        carrierCell: "",
        contactClient: "",
        description: "",
        isFound: false,
        id: "",
      });
    }

    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFacturaSeleccionada(null);
  };

  const handleInputChange = (e: any, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const guardarEnvio = async () => {
    const envioData = { ...formData };
    const toastId = toast.info("Guardando flete...");

    if (formData.isFound) {
      const { errors } = await updateFlete({
        variables: {
          updateInput: {
            id: envioData.id,
            backComision: Number(envioData.backComision),
            oip: Number(envioData.oip),
            valueFlete: Number(envioData.valueFlete),
            carrier: envioData.carrier,
            carrierCell: envioData.carrierCell,
            contactClient: envioData.contactClient,
            description: envioData.description,
            numberGuia: envioData.numberGuia,
          },
        },
      });
      if (errors) {
        toast.dismiss(toastId);
        ToastyErrorGraph(errors);
        return;
      }
    } else {
      const { errors } = await createFlete({
        variables: {
          createInput: {
            numberDocument: facturaSeleccionada?.TEM_NUMDOC || "",
            backComision: Number(envioData.backComision),
            oip: Number(envioData.oip),
            valueFlete: Number(envioData.valueFlete),
            carrier: envioData.carrier,
            carrierCell: envioData.carrierCell,
            contactClient: envioData.contactClient,
            description: envioData.description,
            numberGuia: envioData.numberGuia,
          },
        },
      });
      if (errors) {
        toast.dismiss(toastId);
        ToastyErrorGraph(errors);
        return;
      }
    }

    toast.success("Flete guardado correctamente");
    handleClose();
  };

  const handleOpenDetalle = (factura: string) => {
    setFacturaNumber(factura);
    setIsDetalleOpen(true);
  };


  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="w-full mx-auto">

        {/* ---------------- HEADER MINIMALISTA ---------------- */}
        <div className="flex flex-col gap-4 mb-4">

          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">Gestión de facturacción</h1>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="flex flex-wrap gap-3 items-end bg-white p-3 rounded-lg shadow-sm border">

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">Inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">Fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              />
            </div>

            <select
              value={filtroSeleccionado}
              onChange={(e) => setFiltroSeleccionado(e.target.value)}
              className="border rounded-md px-2 py-2 text-sm"
            >
              <option value="">Sin filtro</option>
              <option value="id">ID</option>
              <option value="vendedor">Vendedor</option>
              <option value="cliente">Cliente</option>
            </select>

            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                onKeyDown={onKeyDownBuscar}
                placeholder="Buscar..."
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <Search
                size={18}
                onClick={handleBuscar}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              />
            </div>

          </div>
        </div>
        {/* ---------------- FIN HEADER ---------------- */}


        {/* CONTADORES */}
        <p className="text-sm font-semibold text-gray-600">
          Facturas encontradas:
          <span className="text-blue-600"> {data?.findAllFacturaCliente.length || 0}</span>
        </p>

        <p className="text-sm font-semibold text-gray-600 mb-4">
          Total ventas:
          <span className="text-blue-600">
            {" "}
            {formatCurrency(
              data?.findAllFacturaCliente?.reduce(
                (s, v) => s + Number(v.TEM_VENTA),
                0
              ) || 0
            )}
          </span>
        </p>


        {/* TABLA */}
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-blue-600 text-white text-xs">
              <tr>
                <th className="p-2">Factura</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Cliente</th>
                <th className="p-2">Vendedor</th>
                <th className="p-2">Ciudad</th>
                <th className="p-2 text-right">Venta</th>
                <th className="p-2 text-right">Costo</th>
                <th className="p-2 text-right">Utilidad</th>
                <th className="p-2 text-right">Flete</th>
                <th className="p-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading || refetchLoading ? (
                <tr>
                  <td colSpan={10} className="text-center p-6">
                    <Loader />
                  </td>
                </tr>
              ) : (
                data?.findAllFacturaCliente.map((factura) => (
                  <tr
                    key={factura.TEM_NUMDOC}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-2 font-semibold">
                      {factura.TEM_PREFIJ}-{factura.TEM_NUMDOC}
                    </td>

                    <td className="p-2">{factura.TEM_FECHA?.split("T")[0]}</td>
                    <td className="p-2">{factura.TEM_NOMCLI}</td>
                    <td className="p-2">{factura.TEM_VENDED}</td>
                    <td className="p-2">{factura.CLI_CIUDAD}</td>

                    <td className="p-2 text-right">
                      {formatCurrency(factura.TEM_VENTA)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(factura.TEM_VALCOS)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(factura.TEM_UTILIDAD)}
                    </td>
                    <td className="p-2 text-right">
                      {formatCurrency(factura.valueFlete || 0)}
                    </td>

                    <td className="p-2 flex justify-center gap-2">
                      <button
                        title="Editar flete"
                        onClick={() => handleOpenModal(factura)}
                        className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        title="Ver detalle"
                        onClick={() =>
                          handleOpenDetalle(factura.TEM_NUMDOC || "")
                        }
                        className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


        {/* MODAL DETALLE */}
        <ModalDetalleFactura
          isOpen={isDetalleOpen}
          onClose={() => setIsDetalleOpen(false)}
          factura={facturaNumber}
        />


        {/* MODAL EDITAR */}
        <Modal isOpen={isOpen} onClose={handleClose}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="w-11/12 max-w-4xl h-3/4 bg-white rounded-lg shadow-lg overflow-y-auto">
              <ModalHeader>Actualizar Costo de Envío</ModalHeader>
              <ModalBody>
                {facturaSeleccionada && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>ID Factura</label>
                      <p>{facturaSeleccionada.TEM_NUMDOC}</p>
                    </div>
                    <div>
                      <label>Fecha</label>
                      <p>{facturaSeleccionada.TEM_FECHA}</p>
                    </div>

                    <div>
                      <label>Vendedor</label>
                      <p>{facturaSeleccionada.TEM_VENDED}</p>
                    </div>

                    <div>
                      <label>Cliente</label>
                      <p>{facturaSeleccionada.TEM_NOMCLI}</p>
                    </div>

                    <div className="col-span-2">
                      <label>Valor Envío</label>
                      <input
                        type="number"
                        className="border p-2 rounded-md w-full"
                        value={formData.valueFlete}
                        onChange={(e) =>
                          handleInputChange(e, "valueFlete")
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <label>OIP</label>
                      <input
                        type="number"
                        className="border p-2 rounded-md w-full"
                        value={formData.oip}
                        onChange={(e) => handleInputChange(e, "oip")}
                      />
                    </div>

                    <div className="col-span-2">
                      <label>Back Comisión</label>
                      <input
                        type="number"
                        className="border p-2 rounded-md w-full"
                        value={formData.backComision}
                        onChange={(e) =>
                          handleInputChange(e, "backComision")
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <label>Número guía</label>
                      <input
                        type="text"
                        className="border p-2 rounded-md w-full"
                        value={formData.numberGuia}
                        onChange={(e) =>
                          handleInputChange(e, "numberGuia")
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <label>Transportadora</label>
                      <select
                        className="border p-2 rounded-md w-full"
                        value={formData.carrier}
                        onChange={(e) => handleInputChange(e, "carrier")}
                      >
                        <option value="">Seleccionar</option>
                        <option value="TCC">TCC</option>
                        <option value="SERVIENTREGA">Servientrega</option>
                        <option value="ENVIA">Envia</option>
                        <option value="CHEVALIER">Chevalier</option>
                        <option value="TRANSCEL">Transcel</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label>Teléfono transportista</label>
                      <input
                        className="border p-2 rounded-md w-full"
                        value={formData.carrierCell}
                        onChange={(e) =>
                          handleInputChange(e, "carrierCell")
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <label>Cliente contacto</label>
                      <input
                        className="border p-2 rounded-md w-full"
                        value={formData.contactClient}
                        onChange={(e) =>
                          handleInputChange(e, "contactClient")
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <label>Descripción</label>
                      <input
                        className="border p-2 rounded-md w-full"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange(e, "description")
                        }
                      />
                    </div>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <button
                  onClick={guardarEnvio}
                  className="bg-green-600 text-white py-2 px-4 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-600 text-white py-2 px-4 rounded ml-3"
                >
                  Cerrar
                </button>
              </ModalFooter>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default FletesPage;
