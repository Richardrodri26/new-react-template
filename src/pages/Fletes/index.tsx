import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  Search,
  Calendar,
  User,
  Clipboard,
  DollarSign,
  TrendingUp,
  Truck,
  CalendarCheck,
  Percent,
  Eye,
  HandCoins,
  BitcoinIcon,
  Activity,
  Trash2,
  Home,
  CarIcon,
  CircleSlashedIcon,
  BackpackIcon,
  Backpack,
  Expand,
  DockIcon,
  Edit,
} from "lucide-react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { FletesWithDocument, FindOneFacturaClienteByCode, Fletes, useCreateFletesMutation, useFindAllFacturaClienteQuery, useFindOneFacturaClienteByCodeLazyQuery, useUpdateFletesMutation } from "@/domain/graphql";
import { Loader } from "../Commissions";
import { update } from "lodash";
import { ToastyErrorGraph } from "@/lib/utils";
import { Select } from "@/components/ui/select";
import SelectInput from "@mui/material/Select/SelectInput";
import { number } from "yup";
import { ModalDetalleFactura } from "./admin/ModalDetailsFactura";

interface Factura {
  id: string;
  fecha: string;
  vendedor: string;
  cedulaVendedor: string;
  documentoCliente: string;
  valorVenta: number;
  valorCosto: number;
  valorUtilidad: number;
  porcentajeUtilidad: number;
  costoEnvio?: number; // Este campo puede ser opcional o requerido
}

const formatCurrency = (amount: number | string | null | undefined): string => {
  if(!amount) return '0'
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(numericAmount);
};
const convertirACantidad = (str: string)  =>{
  // Eliminar el signo de dólar y los espacios
  let cleanedStr = str.replace(/[^\d.-]/g, '');
  let cantidad = parseFloat(cleanedStr);

  // Si la conversión no fue exitosa, retornar 0
  if (isNaN(cantidad)) {
      return 0;
  }

  return cantidad;
}

export const FletesPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  const fechaInicioParams = params.get("fechaInicio");
  const fechaFinParams = params.get("fechaFin");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<FletesWithDocument | null>(null);
  const [facturaNumber, setFacturaNumber] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);
  const [refetchLoading, setrefetchLoading] = useState(false);
  const [formData, setFormData] = useState({
    valueFlete: 0,
    oip: 0,
    backComision: 0,
    numberGuia: '',
    carrier: '',
    carrierCell: '',
    contactClient: '',
    description: '',
    isFound: false,
    id: ''
  });
  const [filtro, setFiltro] = useState<string>("");
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(""); // Para el select
  const [fechaInicio, setFechaInicio] = useState(fechaInicioParams ? fechaInicioParams : dayjs().startOf('month').format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(fechaFinParams ? fechaFinParams : dayjs().endOf('month').format('YYYY-MM-DD'));
  const [dataFletes, setDataFletes] = useState<FindOneFacturaClienteByCode | undefined>(undefined); // Estado para el costo de envío
  const {data, loading, refetch} = useFindAllFacturaClienteQuery({
    variables: {
      input: {
        tem_fecha_desde:  fechaInicio,
        tem_fecha_hasta: fechaFin
      }
    }
  })
  const [findOneFlete] = useFindOneFacturaClienteByCodeLazyQuery()
  const [createFlete] = useCreateFletesMutation();
  const [updateFlete] = useUpdateFletesMutation()
  const handleOpenModal = async (factura: FletesWithDocument) => {
    setFacturaSeleccionada(factura);
    toast.info('Cargando información de fletes...');

    const { data } = await findOneFlete({
      variables: { code: factura.TEM_NUMDOC || ''},
      fetchPolicy: 'no-cache'
    });

    if (data?.findOneFacturaClienteByCode?.isFound) {
      const flete = data.findOneFacturaClienteByCode.flete;
      setFormData({
        valueFlete: flete?.valueFlete || 0,
        oip: flete?.oip || 0,
        backComision: flete?.backComision || 0,
        numberGuia: flete?.numberGuia || '',
        carrier: flete?.carrier || '',
        carrierCell: flete?.carrierCell || '',
        contactClient: flete?.contactClient || '',
        description: flete?.description || '',
        isFound: true,
        id: data.findOneFacturaClienteByCode.flete?.id || ''
      });
    } else {
      setFormData({
        valueFlete: 0,
        oip: 0,
        backComision: 0,
        numberGuia: '',
        carrier: '',
        carrierCell: '',
        contactClient: '',
        description: '',
        isFound: false,
        id: ''
      });
    }

    setIsOpen(true);
  };
  const formatoPesos = (valor: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(valor);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setFacturaSeleccionada(null);
    setFormData({
      valueFlete: 0,
      oip: 0,
      backComision: 0,
      numberGuia: '',
      carrier: '',
      carrierCell: '',
      contactClient: '',
      description: '',
      isFound: false,
      id: ''
    });
  };
  // useEffect(() => {
  //   if (dataFletes?.flete?.valueFlete) {
  //     setValueFlete(dataFletes.flete.valueFlete);
  //   }
  // }, [dataFletes]);
  useEffect(()=>{
    if(filtroSeleccionado == ''){
      handleBuscar()
    }
  },[filtroSeleccionado])
  const handleBuscar = async () => {

      setrefetchLoading(true)
      await refetch({
        input: {
          tem_numdoc: filtroSeleccionado == 'id' ? filtro : undefined,
          tem_nomcli: filtroSeleccionado == 'cliente' ? filtro : undefined,
          tem_vended: filtroSeleccionado == 'vendedor' ? filtro : undefined,
          tem_fecha_desde: fechaInicio,
          tem_fecha_hasta: fechaFin
        }
      })
      setrefetchLoading(false)
  };

  const onKeyDownBuscar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBuscar();
  };
  const guardarEnvio = async () => {
    const envioData = { ...formData };
    const toastId = toast.info('Guardando flete...');
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
          }
        }
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
            numberDocument: facturaSeleccionada?.TEM_NUMDOC || '',
            backComision: Number(envioData.backComision),
            oip: Number(envioData.oip),
            valueFlete: Number(envioData.valueFlete),
            carrier: envioData.carrier,
            carrierCell: envioData.carrierCell,
            contactClient: envioData.contactClient,
            description: envioData.description,
            numberGuia: envioData.numberGuia,
          }
        }
      });
      if (errors) {
        toast.dismiss(toastId);
        ToastyErrorGraph(errors);
        return;
      }
    }

    toast.success('Flete guardado correctamente');
    handleClose();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  const handleOpenDetalle = (factura: string) => {
    setFacturaNumber(factura);
    setIsDetalleOpen(true);
  };

  const temValcos = Number(facturaSeleccionada?.TEM_VALCOS);
  const oip = Number(formData.oip);
  const backComision = Number(formData.backComision);
  const valueFlete = Number(formData.valueFlete);
  const temVenta = Number(facturaSeleccionada?.TEM_VENTA);

  // Verificar si los valores son números válidos
  if (isNaN(temValcos) || isNaN(oip) || isNaN(backComision) || isNaN(valueFlete) || isNaN(temVenta) || temVenta === 0) {
    // toast.error( "Error en los datos al calcular la utilidad real");  // Aquí puedes mostrar un mensaje de error si algún valor no es válido
  }

  // Calcular la utilidad real
  const utilidadReal = (temVenta - (temValcos - oip + backComision + valueFlete));
  const utilidadRealPorcetaje = (temVenta - (temValcos - oip + backComision + valueFlete)) * 100 / temVenta;

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Gestión de Fletes</h1>

        {/* Filtros */}
        <div className="flex gap-4 mb-6">
  <div className="flex flex-col items-start gap-1">
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
  <div className="flex flex-col items-start gap-1">
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


        {/* Buscador */}
        <div className="relative mb-6 flex items-center gap-4">
          {/* Select */}
          <select
            className="p-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/6"
            value={filtroSeleccionado}
            onChange={(e) => setFiltroSeleccionado(e.target.value)}
          >
            <option disabled>Filtrar por</option>
            <option value="">Borrar filtro</option>
            <option value="id">ID</option>
            <option value="vendedor">Vendedor</option>
            <option value="cliente">Cliente</option>
            {/* Agregar más opciones si es necesario */}
          </select>

          {/* Input de búsqueda */}
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            onKeyDown={onKeyDownBuscar}
            placeholder="Buscar por ID, vendedor o cliente"
            className="w-full p-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Icono de búsqueda */}
          <Search
            onClick={handleBuscar}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            size={24}
          />
        </div>


        {/* Listado de Facturas */}
        <p className="text-lg font-semibold text-gray-700">
            Total de facturas encontradas: 
            <span className="text-blue-600 font-bold">
              {data?.findAllFacturaCliente.length || 0}
            </span>
        </p>

        {/* total ventas */}
        <p className="text-lg font-semibold text-gray-700">
            Total de ventas: 
            <span className="text-blue-600 font-bold">
               {formatCurrency(data?.findAllFacturaCliente?.reduce((s, v) => s + Number(v.TEM_VENTA), 0) || 0)}
            </span>
        </p><br />
        {/* Listado de Facturas */}
        <div className="grid grid-cols-1 gap-4">
          
          {
          loading || refetchLoading
          ?
          <Loader/>
          :
          data?.findAllFacturaCliente.map((factura) => (
            <div
              key={factura.TEM_NUMDOC}
              className="bg-white p-6 rounded-lg shadow-lg relative transition-transform transform hover:scale-105 hover:z-10"
                          >
              <div className="absolute top-4 right-4 flex gap-3">
                {/* Botón actualizar */}
                <button
                  title="Actualizar Costo de Envío"
                  onClick={() => handleOpenModal(factura)}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <Edit size={20} />
                </button>

                {/* Botón detalle */}
                <button
                  title="Ver detalle de la factura"
                  onClick={() => handleOpenDetalle(factura.TEM_NUMDOC || '')}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <Eye size={20} />
                </button>
              </div>


              <h2 className="text-xl font-semibold mb-4">{factura.TEM_PREFIJ + '-' +  factura.TEM_NUMDOC}</h2>
              <h3 className="text-xl font-semibold mb-4">{!!factura?.valueFlete ? 'SI TIENE' : 'NO TIENE'}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <Calendar className="inline mr-2" size={20} /> Fecha: {factura.TEM_FECHA}
                  </p>
                  <p className="text-gray-600">
                    <User className="inline mr-2" size={20} /> Vendedor: {factura.TEM_VENDED}
                  </p>
                  <p className="text-gray-600">
                    <Clipboard className="inline mr-2" size={20} /> Cliente: {factura.TEM_NOMCLI}
                  </p>
                  <p className="text-gray-600">
                    <Home className="inline mr-2" size={20} /> Ciudad: {factura.CLI_CIUDAD}
                  </p>
                  <p className="text-gray-600">
                    <CarIcon className="inline mr-2" size={20} /> Flete: {formatCurrency(factura.valueFlete || 0)}
                  </p>
                  <p className="text-gray-600">
                    <Expand className="inline mr-2" size={20} /> Back Comision: {formatCurrency(factura.backComision || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <DollarSign className="inline mr-2" size={20} /> Valor costo: {formatCurrency(factura?.TEM_VALCOS)}
                  </p>
                  <p className="text-gray-600">
                    <BitcoinIcon className="inline mr-2" size={20} /> Valor Utilidad: {formatCurrency(factura.TEM_UTILIDAD)}
                  </p>
                  <p className="text-gray-600">
                    <HandCoins className="inline mr-2" size={20} /> Valor Venta: {formatCurrency(factura.TEM_VENTA)}
                  </p>
                  <p className="text-gray-600">
                    <Percent className="inline mr-2" size={20} /> Utilidad {factura.TEM_PORCENTAJE_UTILIDAD}%
                  </p>
                  <p className="text-gray-600">
                    <Percent className="inline mr-2" size={20} /> Utilidad Real {((Number(factura?.TEM_VENTA || 0) - (Number(factura?.TEM_VALCOS || 0) - Number(factura.oip || 0) + Number(factura.backComision || 0) + Number(factura.valueFlete || 0))) * 100 / Number(factura?.TEM_VENTA || 0)).toFixed(2)}%
                  </p>
                  <p className="text-gray-600">
                    <CircleSlashedIcon className="inline mr-2" size={20} /> OIP {formatCurrency(factura.oip)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ModalDetalleFactura
          isOpen={isDetalleOpen}
          onClose={() => setIsDetalleOpen(false)}
          factura={facturaNumber}
        />

        <Modal isOpen={isOpen} onClose={handleClose}>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="w-11/12 max-w-4xl h-3/4 bg-white shadow-lg rounded-lg overflow-y-auto">
              <ModalHeader>Actualizar Costo de Envío</ModalHeader>
              <ModalBody>
                {facturaSeleccionada && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700">ID Factura</label>
                      <p className="text-lg">{facturaSeleccionada.TEM_NUMDOC}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Fecha</label>
                      <p className="text-lg">{facturaSeleccionada.TEM_FECHA}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Vendedor</label>
                      <p className="text-lg">{facturaSeleccionada.TEM_VENDED}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Cliente</label>
                      <p className="text-lg">{facturaSeleccionada.TEM_NOMCLI}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Valor Venta</label>
                      <p className="text-lg">{formatCurrency(facturaSeleccionada.TEM_VENTA)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Valor Costo</label>
                      <p className="text-lg">{formatCurrency(facturaSeleccionada.TEM_VALCOS)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Valor Utilidad</label>
                      <p className="text-lg">{formatCurrency(facturaSeleccionada.TEM_UTILIDAD)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Utilidad (%)</label>
                      <p className="text-lg">{facturaSeleccionada.TEM_PORCENTAJE_UTILIDAD}%</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Valor utilidad Real</label>
                      <p className="text-lg">
                        {
                          (() => {
                            // Convertir a número los valores de las variables
                            // Retornar el resultado en porcentaje
                            return `${formatCurrency(utilidadReal)}`;  // Asegúrate de redondear a 2 decimales
                          })()
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700">Utilidad Real (%)</label>
                      <p className="text-lg">
                        {
                          (() => {
                            // Convertir a número los valores de las variables
                            // Retornar el resultado en porcentaje
                            return `${(utilidadRealPorcetaje).toFixed(2)}`;  // Asegúrate de redondear a 2 decimales
                          })()
                        }
                      </p>
                    </div>
                    

                    {/* Inputs que actualizan el estado */}
                      <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700">Valor Envío</label>
                      <input
                        type="number"
                        className="border p-2 rounded-md w-full"
                        placeholder="Valor de Envío"
                        value={formData.valueFlete}
                        onChange={(e) => handleInputChange(e, 'valueFlete')}
                      />
                      </div>
                      <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700">Valor oip</label>
                      <input
                        type="number"
                        className="border p-2 rounded-md w-full"
                        placeholder="Valor de Oip"
                        value={formData.oip}
                        onChange={(e) => handleInputChange(e, 'oip')}
                      />
                      </div>
                      <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700">Valor back comision</label>
                      <input
                        type="number"
                        className="border p-2 rounded-md w-full"
                        placeholder="Valor de back comision"
                        value={formData.backComision}
                        onChange={(e) => handleInputChange(e, 'backComision')}
                      />
                      </div>
                      {/* Los otros campos se manejan de manera similar */}
                      <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700">Número de Guia</label>
                        <input
                          type="text"
                          className="border p-2 rounded-md w-full"
                          placeholder="Número de Guia"
                          value={formData.numberGuia}
                          onChange={(e) => handleInputChange(e, 'numberGuia')}
                        />
                      </div>
                      <div className="col-span-2">
                        {/* <label className="text-sm font-bold text-gray-700">Transportista</label> */}
                        <select
                          onChange={(e) => handleInputChange(e, 'carrier')}
                          value={formData.carrier}
                          
                          
                          // className="border p-2 rounded-md w-full"
                          // placeholder="Transportista"
                        >
                          <option value="">Selecciona un transportista</option>
                          <option value="TCC">TCC</option>
                          <option value="SERVIENTREGA">Servientrega</option>
                          <option value="ENVIA">Envia</option>
                          <option value="CHEVALIER">Chevalier</option>
                          <option value="TRANSCEL">Transcel</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700">Teléfono Transportista</label>
                        <input
                          type="text"
                          className="border p-2 rounded-md w-full"
                          placeholder="Teléfono Transportista"
                          value={formData.carrierCell}
                          onChange={(e) => handleInputChange(e, 'carrierCell')}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700">Cliente Contacto</label>
                        <input
                          type="text"
                          className="border p-2 rounded-md w-full"
                          placeholder="Cliente Contacto"
                          value={formData.contactClient}
                          onChange={(e) => handleInputChange(e, 'contactClient')}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-bold text-gray-700">Descripción</label>
                        <input
                          className="border p-2 rounded-md w-full"
                          placeholder="Descripción"
                          value={formData.description}
                          onChange={(e) => handleInputChange(e, 'description')}
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
                  Guardar Costo de Envío
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-600 text-white py-2 px-4 rounded ml-4"
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
