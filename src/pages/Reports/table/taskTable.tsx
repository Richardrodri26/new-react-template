import { OrderTypes, StatusVisitEnum, Task, TaskStatus, useTasksQuery, useVisitsQuery, Visit } from "@/domain/graphql";
import { DataTableVisits } from "@/pages/Visits/Grids";
import { useState } from "react";
import { visitsPendingColumns } from "./columns";
import { tasktColumns } from "./columnsTask";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2Icon } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import ModalCreateTask from "../modal/modalCreateTas";
import { toast } from "sonner";

const TaskTableWorker = () => {
    return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tareas sin responder</h2>
        <GridTask></GridTask>
        </div>
    </div>
    )
}
const GridTask = () => {
    const [skip, setSkip] = useState(0)
    const { isOpen, openModal, closeModal } = useModal();
    const [filterStatus, setFilterStatus] = useState<TaskStatus | null>(null); 
    
    const takeValue = 10
    const { data, loading, refetch } = useTasksQuery({
      variables: {
        pagination: {
          skip,
          take: takeValue
        },
        where: {
            taskStatus: {
                _eq: TaskStatus.Pendiente
            }
        },
        orderBy: {
          taskDateExpiration: OrderTypes.Desc
        }
      }
    })
    const onFilterStatus = async (status: TaskStatus | null) => {
      const toastId = toast.loading('Aplicando filtros...')
      if(!status){
        await refetch({
          where: {
            taskStatus: {
              _in: [TaskStatus.EnProgreso, TaskStatus.Pendiente,TaskStatus.Creada]
            }
          },
          orderBy: {
            taskDateExpiration: OrderTypes.Desc,
          }
        })
        toast.dismiss(toastId)
        return
      }
      setFilterStatus(status)
      await refetch({
        where: {
          taskStatus: {
            _in: [status]
          }
        },
        orderBy: {
          taskDateExpiration: OrderTypes.Desc,
        }
      })
      toast.dismiss(toastId)
    }
    const visits = (data?.tasks || []) as Task[];
    return (
        <>
            <div className="ml-auto flex items-center gap-2  my-4  ml-4">
              <Button onClick={()=> openModal()} size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear tarea
                </span>
              </Button>
            </div>
            <div className="ml-2 m-b-2 flex-item">
              <Trash2Icon
              className="mb-1.5 block cursor-pointer"
                onClick={() => onFilterStatus(null)}
              />
              {Object.values(TaskStatus).map((status) => {
              const colorVariants: Record<string, string> = {
                [TaskStatus.Cancelada]: "bg-red-500 text-white",
                [TaskStatus.Creada]: "bg-blue-500 text-white",
                [TaskStatus.EnProgreso]: "bg-yellow-500 text-black",
                [TaskStatus.Pendiente]: "bg-gray-500 text-white",
                [TaskStatus.Realizada]: "bg-green-500 text-white",
                [TaskStatus.Vencida]: "bg-black text-white",
              };

                return (
                  <Button
                    key={status}
                    size="sm"
                    className={`${
                      colorVariants[status] 
                    } px-4 py-2 rounded`}
                    onClick={() => onFilterStatus(status)}
                  >
                    {status.replace(/_/g, " ")}
                  </Button>
                );
              })}
            </div><br />
            <ModalCreateTask 
                isOpen={isOpen}
                onClose={closeModal}
            />
            <DataTableVisits isLoading={!data && loading} columns={tasktColumns as any} data={visits} />
        </>
    )
}
export default TaskTableWorker