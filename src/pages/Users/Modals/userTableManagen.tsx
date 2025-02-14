import { OrderTypes, useAssignSubordinateMutation, User, useRemoveSubordinateMutation, useUsersQuery } from '@/domain/graphql';
import { ToastyErrorGraph } from '@/lib/utils';
import { apolloClient } from '@/main.config';
import React, { useState } from 'react';
import { toast } from 'sonner';

// Props para el componente modal
interface Props {
  isOpen: boolean;
  close: () => void;
  user: User;
}

const UserManagementTable: React.FC<Props> = ({ isOpen, close, user }) => {
  // Estado para el usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [assign] = useAssignSubordinateMutation()
  const [remove] = useRemoveSubordinateMutation()
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

  // Función para agregar un subordinado
  const handleAddSubordinate = async () => {
    if (selectedUser) {
        const toasId = toast.loading('Agregando usuario')
        try {
            const res = await assign({
                variables: {
                    managerId: user.id,
                    subordinateId: selectedUser
                }
            })
            if(res.errors){
                toast.error(res.errors[0].message)
                return
            }
            toast.success('Usuario agregado con exito')
            apolloClient.cache.evict({ fieldName: "users" })
            
        }catch (err){
            ToastyErrorGraph(err as any)
        }finally {
            toast.dismiss(toasId)
        }
    }
  };

  // Función para eliminar un subordinado
  const handleRemoveSubordinate = async (id: string) => {
    const toasId = toast.loading('Eliminado usuario')
    try {
        const res = await remove({
            variables: {
                managerId: user.id,
                subordinateId: id
            }
        })
        if(res.errors){
            toast.error(res.errors[0].message)
            return
        }
        toast.success('Usuario elimnado con exito')
        apolloClient.cache.evict({ fieldName: "users" })
        
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuarios a Cargo</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        {/* Selector de usuario */}
        <div className="mb-4 flex items-center gap-4">
          {loading ? (
            <>Cargando usuarios...</>
          ) : (
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Seleccionar Usuario</option>
              {data?.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          )}
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
                <th className="border px-4 py-2 text-left">Documento</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {user?.subordinates && user.subordinates.length > 0 ? (
                user.subordinates.map((subordinate) => (
                  <tr key={subordinate.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{subordinate.fullName}</td>
                    <td className="border px-4 py-2">{subordinate.identificationNumber}</td>
                    <td className="border px-4 py-2">{subordinate.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleRemoveSubordinate(subordinate.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">No hay subordinados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;
