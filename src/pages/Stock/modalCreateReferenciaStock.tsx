import { BasicFormProviderZod, ButtonForm } from '@/components';
import { InputForm } from '@/composables';
import { useCreateStockMutation } from '@/domain/graphql';
import { ToastyErrorGraph } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Modal from 'react-modal';
import { toast } from 'sonner';
import { z } from 'zod';

const createSchema = z.object({
    referencia: z.string(),
    nombreClase: z.string(),
    nombreReferencia: z.string(),
    cantidadActual: z.string().optional(),
    stcMax: z.string().optional(),
    stcMin: z.string().optional(),
    clase: z.string().optional(),
});

type CreateSchemaType = z.infer<typeof createSchema>;

interface ModalCreateReferenciaStockProps {
  isOpen: boolean;
  onClose: () => void;
  nombreClase?: string | null;
  refesh?: () => void;
}
interface ReferenciaStock {
  Referencia: string
  NombreReferencia: string
  Clase: string
  NombreClase: string
  CantidadActual: number
  STCMIN: number
  STCMAX: number
}

// Componente interno para manejar los campos del formulario
interface FormContentProps {
  referenciaInfo: ReferenciaStock | null;
  verificarReferencia: (ref: string) => Promise<void>;
  nombreClase: string | null | undefined;
}

const FormContent = ({ referenciaInfo, verificarReferencia, nombreClase }: FormContentProps) => {
  const { setValue } = useFormContext<CreateSchemaType>();

  useEffect(() => {
    if (referenciaInfo) {
      setValue("referencia", referenciaInfo.Referencia);
      setValue("nombreClase", referenciaInfo.NombreClase);
      setValue("nombreReferencia", referenciaInfo.NombreReferencia);
      setValue("cantidadActual", referenciaInfo.CantidadActual.toString());
      setValue("stcMax", referenciaInfo.STCMAX.toString());
      setValue("stcMin", referenciaInfo.STCMIN.toString());
      setValue("clase", referenciaInfo.Clase);
    }
  }, [referenciaInfo, setValue]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputForm name="referencia" label="Referencia"      
        onBlur={async (e) => {
          const referencia = e.target.value;
          if (referencia.trim()) {
            await verificarReferencia(referencia.trim());
          }
        }}/>
        <InputForm name="nombreReferencia" label="Nombre Referencia" />
        <InputForm name="nombreClase" label="Nombre Clase" disabled={!!nombreClase}/>
        <InputForm name="clase" label="Clase" disabled={!!nombreClase}/>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputForm name="cantidadActual" label="Cantidad Actual"/>
        <InputForm name="stcMax" label="Stock Máximo"/>
        <InputForm name="stcMin" label="Stock Mínimo"/>
      </div>
    </>
  );
};

export const ModalCreateReferenciaStock = ({ isOpen, onClose, nombreClase, refesh }: ModalCreateReferenciaStockProps) => {
    if(!isOpen) return null;
    const [createStock] = useCreateStockMutation();
    const [verificando, setVerificando] = useState(false);
    const [referenciaInfo, setReferenciaInfo] = useState<ReferenciaStock | null>(null);
    const [defaultValues, setDefaultValues] = useState<CreateSchemaType>({
        referencia: "",
        nombreClase: nombreClase || "",
        nombreReferencia: "",
        cantidadActual: "",
        stcMax: "",
        stcMin: "",
        clase: ""
    });

    useEffect(() => {
        setDefaultValues((prev) => ({
            ...prev,
            nombreClase: nombreClase || ""
        }));
    }, [nombreClase]);

    const verificarReferencia = async (referencia: string) => {
        const toastId = toast.loading("Verificando Referencia de Stock...");
        try {
            const url = `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas/referencia/verify/${referencia}`;
            const { data } = await axios.get<ReferenciaStock>(url);

            if (!data || data.Referencia === "") {
                toast.error("Referencia de Stock no encontrada", { id: toastId });
                setReferenciaInfo(null);
            } else if (nombreClase && data.NombreClase !== nombreClase) {
                toast.error(`La referencia pertenece a la clase "${data.NombreClase}", no a "${nombreClase}"`, { id: toastId });
                setReferenciaInfo(null);
            } else {
                setReferenciaInfo(data);
                toast.success("Referencia validada correctamente", { id: toastId });
            }
        } catch (error) {
            toast.error("Error al verificar la referencia", {id: toastId });
            setReferenciaInfo(null);
        } finally {
            setVerificando(false);
        }
    };

    const onSubmit = async (data: CreateSchemaType) => {
        // Si no hay clase seleccionada, se requiere verificación previa
        if (!nombreClase && !referenciaInfo) {
            toast.error("Debe verificar una referencia válida antes de continuar");
            return;
        }

        const toastId = toast.loading("Creando Referencia de Stock...");

        try {
            const createInput = {
                referencia: data.referencia,
                nombreClase: referenciaInfo?.NombreClase || data.nombreClase,
                clase: referenciaInfo?.Clase || data.clase,
                nombreReferencia: data.nombreReferencia,
                cantidadActual: data.cantidadActual ? Number(data.cantidadActual) : 0,
                stcMax: data.stcMax ? Number(data.stcMax) : 0,
                stcMin: data.stcMin ? Number(data.stcMin) : 0,
            };

            const response = await createStock({
                variables: {
                    createInput
                }
            });

            if (response.data?.createStock) {
                toast.success("Referencia de Stock creada correctamente", { id: toastId });
                onClose();
                refesh?.();
                setReferenciaInfo(null);
            } else {
                toast.error("Error al crear la Referencia de Stock", { id: toastId });
            }
        } catch (error) {
            ToastyErrorGraph(error as any);
            toast.dismiss(toastId);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Crear Referencia de Stock"
            ariaHideApp={false}
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
        >
            <h2 className="text-center text-lg font-bold mb-4">
                {nombreClase ? `Crear Referencia en ${nombreClase}` : 'Crear Referencia Stock'}
            </h2>
            <BasicFormProviderZod submit={onSubmit} schema={createSchema} defaultValue={defaultValues}>
                <FormContent referenciaInfo={referenciaInfo} verificarReferencia={verificarReferencia} nombreClase={nombreClase} />
                <div className="flex justify-between items-center">
                    <ButtonForm>Crear</ButtonForm>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Cerrar
                    </button>
                </div>
            </BasicFormProviderZod>
        </Modal>
    );
};
