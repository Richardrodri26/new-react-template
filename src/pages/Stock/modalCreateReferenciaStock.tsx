import { BasicFormProviderZod, ButtonForm } from '@/components';
import { InputForm } from '@/composables';
import { useCreateStockMutation } from '@/domain/graphql';
import { ToastyErrorGraph } from '@/lib/utils';
import axios from 'axios';
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
export const ModalCreateReferenciaStock = ({ isOpen, onClose, nombreClase, refesh }: ModalCreateReferenciaStockProps) => {
    if(!isOpen || !nombreClase) return null;
    const [createStock] = useCreateStockMutation();

    const onSubmit = async (data: CreateSchemaType) => {
        
        const toastId = toast.loading("Estamos buscando la referencia de stock, espere un momento...");
        const url = `${import.meta.env.VITE_APP_MICRO_GRAPH}ventas/referencia/verify/${data.referencia}`;
        const { data:  dataReferencia} = await axios.get<ReferenciaStock>(url);

        if (!dataReferencia) {
            toast.error("Referencia de Stock no encontrada", { id: toastId });
            return;
        }
        if (dataReferencia.Referencia === "") {
            toast.error("Referencia de Stock no puede estar vacía", { id: toastId });
            return;
        }
        if(nombreClase && dataReferencia.NombreClase !== nombreClase) {
            toast.error("La clase de la referencia no coincide con la clase seleccionada", { id: toastId });
            return; 
        }
        try {
            toast.loading("Creando Referencia de Stock...", { id: toastId });
            const response = await createStock({
                variables: {
                    createInput: {
                        referencia: data.referencia,
                        nombreClase: dataReferencia.NombreClase,
                        clase: dataReferencia.Clase,
                        nombreReferencia: data.nombreReferencia,
                        cantidadActual: data.cantidadActual ? Number(data.cantidadActual) : 0,
                        stcMax: data.stcMax ? Number(data.stcMax) : 0,
                        stcMin: data.stcMin ? Number(data.stcMin) : 0,
                    }
                }
            });

            if (response.data?.createStock) {
                toast.success("Referencia de Stock creada correctamente", { id: toastId });
                onClose();
                refesh?.();
            } else if (response.errors) {
                toast.error("Error al crear la Referencia de Stock", { id: toastId });
            }
        } catch (error) {
            ToastyErrorGraph(error as any);
            toast.dismiss(toastId)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Crear Referencia de Stock"
            ariaHideApp={false}
            overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
            // className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow-lg"
        >
            <h2 className="text-center text-lg font-bold mb-4">Crear Referencia Stock</h2>
            <BasicFormProviderZod submit={onSubmit} schema={createSchema} defaultValue={{
                nombreClase: nombreClase}}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputForm name="referencia" label="Referencia" />
                    <InputForm name="nombreReferencia" label="Nombre Referencia" />
                    <InputForm name="nombreClase" label="Nombre Clase" disabled={true}/>
                    <InputForm name="clase" label="Clase" disabled={true}/>

                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <InputForm name="cantidadActual" label="Cantidad Actual"/>
                    <InputForm name="stcMax" label="Stock Máximo"/>
                    <InputForm name="stcMin" label="Stock Mínimo"/>
                </div>
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
