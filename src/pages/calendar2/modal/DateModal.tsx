import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/modal'; // Ajusta la importación según tu estructura de componentes
import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components';
import { z } from 'zod';
import { UserSelect } from '@/pages/Clients/Modals/CreateClient';
import { InputDateForm, InputDateTimeForm, InputForm } from '@/composables';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { ToastyErrorGraph } from '@/lib/utils';
import { VisitComentStatusEnum, VisitComentTypeEnum, useCreateVisitComentMutation } from '@/domain/graphql';

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

const DateModal: React.FC<DateModalProps> = ({ isOpen, onClose, selectedDate }) => {
  const [createComent] = useCreateVisitComentMutation();
  const createTaskSchema = z.object({
    date: z.string(),
    description: z.string(),
    userId: z.string()
  })
  const defaultData = {
    date: dayjs(dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss')).toString()
  }
  type createTaskSchemaType = z.infer<typeof createTaskSchema>;
  const onSubmit = async (data: createTaskSchemaType) => {
    try {
        toast.info("Creando compromiso...")
        const resMutation = await createComent({
          variables: {
            createInput: {
              ...data,
              visitId: "dd",
              type: VisitComentTypeEnum.Commitments,
              status: VisitComentStatusEnum.Pendinig
            }
          }
        });
  
        if (resMutation.errors) {
          toast.error("¡Oops, hubo un error")
          return
        }
  
        toast.success("Compromiso creado con exito")
  
        onClose()
      } catch (error) {
        ToastyErrorGraph(error as any)
      }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Crear Compromisos</ModalHeader>
      <ModalBody>
      <BasicFormProviderZod submit={onSubmit} schema={createTaskSchema} defaultValue={defaultData}>
        <RowForm>
          <UserSelect name='userId' label={'Selecione un usuario'} className='w-[400px]'></UserSelect>
        </RowForm>
          <InputDateTimeForm name='date' label={'Fecha'}></InputDateTimeForm>
        <RowForm>
        </RowForm>
        <RowForm>
          <InputForm name='description' label={"Descripción"} />
        </RowForm>
        <ButtonForm>
          Crear compromiso
        </ButtonForm>
      </BasicFormProviderZod>
      </ModalBody>
      <ModalFooter>
        <button onClick={onClose}>Cerrar</button>
      </ModalFooter>
    </Modal>
  );
};

export default DateModal;
