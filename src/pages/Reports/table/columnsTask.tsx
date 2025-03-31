import { STATUSVISITCHANGSPANISH } from "@/components/Utils/status";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusVisitEnum, Task, TaskStatus, useAcceptOrDeclineVisitMutation, useUpdateTaskMutation, Visit } from "@/domain/graphql";
import { fireAlert } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from "dayjs";
import { CircleCheckBig, CircleX } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const columnHelperVisits = createColumnHelper<Task>();

export const tasktColumns = [
  columnHelperVisits.accessor("worker.fullName", {
    header: "Trabajador"
  }),
  columnHelperVisits.accessor("createdByUser.fullName", {
    header: "Creado por"
  }),
  columnHelperVisits.accessor("taskName", {
    header: "Nombre"
  }),

  columnHelperVisits.accessor("taskDescription", {
    header: "Descripción"
  }),

  columnHelperVisits.accessor("taskPriority", {
    header: "Prioridad"
  }),

  columnHelperVisits.accessor("taskDateExpiration", {
    header: "Fecha vencimiento",
    cell: (info) => {
        return dayjs(info.row.original.taskDateExpiration).format("YYYY-MM-DD HH:mm:ss")
    }
  }),

  columnHelperVisits.display({
    id: "Acciones",
    header: "Acciones",
    cell: (info) => {
      const [status, setStatus] = useState(info.row.original.taskStatus); // Estado inicial
      const [update] = useUpdateTaskMutation()
      const handleStatusChange = async (newStatus: TaskStatus) => {
        const alertRes = await fireAlert({
          type: "warning",
          title: `Cambiar a ${newStatus.replace(/_/g, " ").toLocaleUpperCase()}`,
          description: `¿Estas seguro que quieres cambiar a ${newStatus.replace(/_/g, " ").toLocaleUpperCase()}?`,
          showCancelButton: true,
        })
        if(alertRes){
          toast.info("Actualizando datos...")
          try {
            const res = await update({
              variables: {
                updateInput: {
                  id: info.row.original.id,
                  taskStatus: newStatus,
                  isAdmin: true
                }
              }
            })
            toast.success("Actualizado con exito")
            apolloClient.cache.evict({ fieldName: "tasks" })
          }catch (err) {
            ToastyErrorGraph(err as any)
            return
          }
        }
      };
  
      return (
        <div className="flex items-center gap-2">
          <TaskStatusSelect value={status} onChange={handleStatusChange} />
        </div>
      );
    }
  })
]
const taskStatusOptions = [
  { value: TaskStatus.Pendiente, label: "Pendiente" },
  { value: TaskStatus.EnProgreso, label: "En Progreso" },
  { value: TaskStatus.Realizada, label: "Realizada" },
  { value: TaskStatus.Cancelada, label: "Cancelada" },
  { value: TaskStatus.Vencida, label: "Vencida" },
  { value: TaskStatus.Creada, label: "Creada" },
];
interface propsSelect {
  value: TaskStatus;
  onChange: (e: TaskStatus) => void;
}
// Componente de la celda con el select
const TaskStatusSelect: React.FC<propsSelect> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        const status = e.target.value as TaskStatus
        onChange(status)
      } }
        
      className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {taskStatusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};