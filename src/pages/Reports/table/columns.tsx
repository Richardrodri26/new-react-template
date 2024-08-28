import { STATUSVISITCHANGSPANISH } from "@/components/Utils/status";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusVisitEnum, useAcceptOrDeclineVisitMutation, Visit } from "@/domain/graphql";
import { fireAlert } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from "dayjs";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const columnHelperVisits = createColumnHelper<Visit>();

export const visitsPendingColumns = [
  columnHelperVisits.accessor("client.name", {
    header: "Cliente"
  }),

  columnHelperVisits.accessor("user.name", {
    header: "Usuario"
  }),

  columnHelperVisits.accessor("description", {
    header: "Descripción"
  }),

  columnHelperVisits.accessor("type.name", {
    header: "Tipo"
  }),

  columnHelperVisits.accessor("dateVisit", {
    header: "Fecha",
    cell: (info) => {
        return dayjs(info.row.original.dateVisit).format("YYYY-MM-DD HH:mm:ss")
    }
  }),

  columnHelperVisits.display({
    id: "Acciones",
    header: "Acciones",
    cell: (info) => {
      const navigate = useNavigate(); 
      const  changeStatus  = async (status: StatusVisitEnum) => {
        const alertRes = await fireAlert({
            type: "warning",
            title: `Cambiar a ${status === StatusVisitEnum.Confirmed ? 'CONFIRMADO' : 'CANCELADO'}`,
            description: `¿Estas seguro que quieres cambiar a ${status === StatusVisitEnum.Confirmed ? 'CONFIRMADO' : 'CANCELADO'}?`,
            showCancelButton: true,
          })
          if(alertRes){
            const [confirmVisitMutation] = useAcceptOrDeclineVisitMutation()
            try {
                toast.info("Actualizando datos...")
                const resMutation = await confirmVisitMutation({
                    variables: {
                    updateStatusInput: {
                        id: info.row.original.id,
                        status: status,
                        token: ""
                      }
                    }
                });  
                if(resMutation.errors){
                    toast.error("¡Oops, hubo un error!")
                    return
                }
                toast.success("Actualizado con exito")
                
              apolloClient.cache.evict({ fieldName: "visitPending" })
            } catch (error) {
                ToastyErrorGraph(error as any) 
            }
          }
        }
      return (

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> <CircleCheckBig onClick={ () => changeStatus(StatusVisitEnum.Confirmed)} /></TooltipTrigger>
              <TooltipContent>
                <p>ACEPTAR</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger> <CircleX onClick={ () => changeStatus(StatusVisitEnum.Canceled)} /></TooltipTrigger>
              <TooltipContent>
                <p>CANCELAR</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
  })
]