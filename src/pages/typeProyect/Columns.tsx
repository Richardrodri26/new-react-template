import { STATUSVISITCHANGSPANISH } from "@/components/Utils/status";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusVisitEnum, TipoProyecto, useUpdateTipoProyectoMutation, Visit } from "@/domain/graphql";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from "dayjs";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const columnHelperVisits = createColumnHelper<TipoProyecto>();

export const tipoProyectoColumns = [
  columnHelperVisits.accessor("nombre", {
    header: "Nombre"
  }),

  columnHelperVisits.accessor("descripcion", {
    header: "Descripción"
  }),
  columnHelperVisits.accessor("createdAt", {
    header: "Fecha",
    cell: (info) => {
      return dayjs(info.row.original.createdAt).format("YYYY-MM-DD HH:mm:ss")
    }
  }),
  columnHelperVisits.display({
    id: "Acciones",
    cell: (info) => {
      const [update] = useUpdateTipoProyectoMutation()
      const onChange = async () => {
        const res = await update({
          variables: {
            updateInput: {
              id: info.row.original.id,
              isActive: !info.row.original.isActive
            }
          }
        })
        if(res.errors){
          toast.error('Uups hubo un error al actualizar')
          return
        }
        toast.success('Actualizado con exito')
        apolloClient.cache.evict({ fieldName: "tipoProyectos" });

      }
      return (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <Switch 
               checked={info.row.original.isActive}
                onCheckedChange={onChange}
                key={info.row.original.id}
              />
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
  })
]