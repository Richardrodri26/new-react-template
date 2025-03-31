import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components';
import { InputDateForm, InputDateTimeForm, InputForm, SelectForm } from '@/composables';
import { OrderTypes, TaskPrioridad, TaskStatus, useCreateTaskMutation, useUsersQuery } from '@/domain/graphql';
import { ToastyErrorGraph } from '@/lib/utils';
import { apolloClient } from '@/main.config';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
/* @ts-ignore */
import Modal from 'react-modal';
import { toast } from 'sonner';
import { z } from 'zod';
const createUserSchema = z.object({
 taskDateExpiration: z.string(),
 taskName: z.string(),
 taskPriority: z.nativeEnum(TaskPrioridad),
 taskStatus: z.nativeEnum(TaskStatus),
 taskDescription: z.string().optional()
})

type createUserSchemaType = z.infer<typeof createUserSchema>;

const typePriority: { key: string; value: string | number }[] = [
  {
    key: TaskPrioridad.Alta,
    value: "ALTA"
  },
  {
    key: TaskPrioridad.Media,
    value: "Media"
  }, 
  {
    key: TaskPrioridad.Baja,
    value: "Baja"
  }, 
]
const typeTaskStatus: { key: string; value: string | number }[] = [
    {
      key: TaskStatus.Creada,
      value: "Creada"
    },
    {
      key: TaskStatus.Cancelada,
      value: "Cancelada"
    }, 
    {
      key: TaskStatus.EnProgreso,
      value: "En Pogreso"
    }, 
    {
        key: TaskStatus.Pendiente,
        value: "Pendiente"
    }, 
    {
        key: TaskStatus.Realizada,
        value: "Realizada"
    },
    {
        key: TaskStatus.Vencida,
        value: "Vencinda"
    },
]
interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTask: React.FC<DateRangeModalProps> = ({ isOpen, onClose }) => {
    const [create] = useCreateTaskMutation()
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const { data, loading } = useUsersQuery({
        variables: {
          pagination: {
            skip: 0,
            take: 9999999,
          },
          orderBy: {
            createdAt: OrderTypes.Desc,
            name: OrderTypes.Asc,
          },
        },
    });
    const onSubmit = async (data: createUserSchemaType) => {
        if(!selectedUser) {
            toast.error('Necesita selecionar un trabajador a asignar')
            return
        }
        try {
          toast.info("Creando usuario...")
          const resMutation = await create({
            variables: {
              createInput: {
                taskDateExpiration: data.taskDateExpiration,
                taskName: data.taskName,
                taskPriority: data.taskPriority,
                taskStatus: data.taskStatus,
                workerId: selectedUser,
                taskDescription: data.taskDescription,
                isAdmin: true
              }
            }
          });
    
          if (resMutation.errors) {
            toast.error("¡Oops, hubo un error")
            return
          }
    
          toast.success("Usuario creado con exito")
    
          onClose()
    
    
        } catch (error) {
          ToastyErrorGraph(error as any)
        }
    }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Selecciona un rango de fechas"
      ariaHideApp={false} // Necesario para evitar problemas de accesibilidad
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
    >
      <h2 className="text-center text-lg font-bold mb-4">Asignar tareas</h2>
      <BasicFormProviderZod submit={onSubmit} schema={createUserSchema}>
        <InputForm name='taskName' label={"Nombre de la tarea"} />
        <RowForm>
            <SelectForm name='taskStatus' label={"Estado de la tarea"} options={typeTaskStatus} placeholder='Selecciona un estado de la tarea' />
            <SelectForm name='taskPriority' label={"Prioridad de la tarea"} options={typePriority} placeholder='Selecciona una prioridad de la tarea' />
            <InputDateTimeForm  name='taskDateExpiration' label={'Fecha de vencimiento'}/>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Seleccionar Usuario</option>
              {data?.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
        </RowForm>

        <RowForm>
            <InputForm name='taskDescription' label={"Descripción de la tarea"} />
        </RowForm>

        <ButtonForm>
            Crear
        </ButtonForm>
        </BasicFormProviderZod>
      <div className="text-center">
        <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ModalCreateTask;
