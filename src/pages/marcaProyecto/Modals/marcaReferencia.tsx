import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MarcaProyecto, OrderTypes, useAssignSubordinateMutation, useCreateReferenciaProyectoMutation, User, useReferenciaProyectosQuery, useRemoveSubordinateMutation, useUpdateReferenciaProyectoMutation, useUsersQuery } from '@/domain/graphql';
import { ToastyErrorGraph } from '@/lib/utils';
import { apolloClient } from '@/main.config';
import React, { useState } from 'react';
import { toast } from 'sonner';

// Props para el componente modal
interface Props {
  isOpen: boolean;
  close: () => void;
  marca: MarcaProyecto;
}

const MarcReferenciaModal: React.FC<Props> = ({ isOpen, close, marca }) => {
  // Estado para el usuario seleccionado
  const [codigo, setCodigo] = useState<string | null>(null);
  const [descripcion, setDescripcion] = useState<string | null>(null);
  const [assign] = useCreateReferenciaProyectoMutation()
  const [update] = useUpdateReferenciaProyectoMutation()
  // Función para agregar un subordinado
  const handleAddSubordinate = async () => {
    if(!codigo || !descripcion){
      toast.info('Debes de colcoar un nombre y una descripción')
      return
    }
    const toasId = toast.loading('Agregando referencia')
    try {
      const res = await assign({
        variables: {
          createInput: {
            codigo: codigo,
            descripcion: descripcion,
            marcaId: marca.id
          }
        }
      })
      if(res.errors){
          toast.error(res.errors[0].message)
          return
      }
      toast.success('Referencia agregado con exito')
      apolloClient.cache.evict({ fieldName: "marcaProyectos" })
      setCodigo(null)
      setDescripcion(null)
      close()
        
    }catch (err){
        ToastyErrorGraph(err as any)
    }finally {
        toast.dismiss(toasId)
    }
  };

  // Función para eliminar un subordinado
  const onChangeStatus = async (id: string, status: boolean) => {
    const toasId = toast.loading('Cmabiando estado')
    try {
        const res = await update({
            variables: {
              updateInput: {
                id: id,
                isActive: status
              }
            }
        })
        if(res.errors){
            toast.error(res.errors[0].message)
            return
        }
        toast.success('Actualizado con exito')
        apolloClient.cache.evict({ fieldName: "marcaProyectos" })
        close()
    }catch (err){
        ToastyErrorGraph(err as any)
    }finally {
        toast.dismiss(toasId)
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      {/* Modal con mayor tamaño */}
      <div className="bg-white p-6 rounded-md shadow-lg w-[80%] md:w-[800px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar referencias a la marca {marca.nombre}</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        {/* Selector de usuario */}
        <div className="mb-4 flex items-center gap-4">
        <Input 
            value={codigo || ''}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder='Nombre de la referencia'
            className='w-full'
          />
          <Input 
            value={descripcion || ''}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder='Descripcion de la referencia'
            className='w-full'
          />
        </div>
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={handleAddSubordinate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>

        {/* Tabla de subordinados */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Nombre</th>
                <th className="border px-4 py-2 text-left">Descripción</th>
                <th className="border px-4 py-2 text-left">Estado</th>
                <th className="border px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {marca?.referencias && marca?.referencias.length > 0 ? (
                marca.referencias.map((refe) => (
                  <tr key={refe.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{refe.codigo}</td>
                    <td className="border px-4 py-2">{refe.descripcion}</td>
                    <td className="border px-4 py-2">{refe.isActive ? 'ACTIVO' : 'INACTIVO'}</td>
                    <td className="border px-4 py-2">
                      <Switch 
                        checked={refe.isActive}
                        onCheckedChange={(e) => onChangeStatus(refe.id, e)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">No hay referencias</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarcReferenciaModal;
