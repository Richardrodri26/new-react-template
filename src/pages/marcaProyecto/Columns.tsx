import { STATUSVISITCHANGSPANISH } from "@/components/Utils/status";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MarcaProyecto, StatusVisitEnum, TipoProyecto, useUpdateMarcaProyectoMutation, useUpdateTipoProyectoMutation, Visit } from "@/domain/graphql";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from "dayjs";
import { Eye, File, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MarcReferenciaModal from "./Modals/marcaReferencia";

const columnHelperVisits = createColumnHelper<MarcaProyecto>();

export const tipoProyectoColumns = [
  columnHelperVisits.accessor("nombre", {
    header: "Nombre"
  }),

  columnHelperVisits.accessor("createdAt", {
    header: "Fecha",
    cell: (info) => {
      return dayjs(info.row.original.createdAt).format("YYYY-MM-DD HH:mm:ss")
    }
  }),
  columnHelperVisits.display({
    id: "update",
    header: "Activo",
    cell: (info) => {
      const [update] = useUpdateMarcaProyectoMutation()
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
        apolloClient.cache.evict({ fieldName: "marcaProyectos" });

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
  }),
  columnHelperVisits.display({
    id: "Acciones",
    header: 'Referencias',
    cell: (info) => {
      const [open,setOpen] = useState(false)
      const [update] = useUpdateMarcaProyectoMutation()
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
        apolloClient.cache.evict({ fieldName: "marcaProyectos" });

      }
      return (
        <div className="flex items-center gap-2">
          <MarcReferenciaModal marca={info.row.original} isOpen={open} close={()=> setOpen(false)} key={info.row.original.id} />
          <TooltipProvider>
            <Tooltip>
              <File onClick={()=> setOpen(true)} className="cursor-pointer"></File>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
  })
]