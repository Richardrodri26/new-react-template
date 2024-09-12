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
const change = async (id: string, status: StatusVisitEnum) => {
  const [confirmVisitMutation] = useAcceptOrDeclineVisitMutation({
    variables: {
      updateStatusInput: {
          id: id,
          status: status,
          token: ""
        }
      }
  })
  return await confirmVisitMutation()
}
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
      const [confirmVisitMutation] = useAcceptOrDeclineVisitMutation({
        variables: {
          updateStatusInput: {
              id: info.row.original.id,
              status: StatusVisitEnum.Confirmed,
              token: ""
            }
          }
      })
      const [canceldVisitMutation] = useAcceptOrDeclineVisitMutation({
        variables: {
          updateStatusInput: {
              id: info.row.original.id,
              status: StatusVisitEnum.Canceled,
              token: ""
            }
          }
      })
      const  changeStatusCanceled  = async () => {
        const alertRes = await fireAlert({
            type: "warning",
            title: `Cambiar a CANCELADO`,
            description: `¿Estas seguro que quieres cambiar a CANCELADO?`,
            showCancelButton: true,
          })
        if(alertRes){
          toast.info("Actualizando datos...")
          try{
            const resMutation = await canceldVisitMutation()
            toast.success("Actualizado con exito")
            apolloClient.cache.evict({ fieldName: "visitPending" })

          }catch(error){
            ToastyErrorGraph(error as any)
            return
          }   
        }
      }
      const  changeStatusConfirmed  = async () => {
        const alertRes = await fireAlert({
            type: "warning",
            title: `Cambiar a CONFIRMADO`,
            description: `¿Estas seguro que quieres cambiar a CONFIRMADO?`,
            showCancelButton: true,
          })
        if(alertRes){
          toast.info("Actualizando datos...")
          try{
            const resMutation = await confirmVisitMutation()
            toast.success("Actualizado con exito")
            
            apolloClient.cache.evict({ fieldName: "visitPending" })
          }catch (error){
            ToastyErrorGraph(error as any)
            return
          }
        }
      }
      return (

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> <CircleCheckBig onClick={changeStatusConfirmed} /></TooltipTrigger>
              <TooltipContent>
                <p>ACEPTAR</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger> <CircleX onClick={changeStatusCanceled} /></TooltipTrigger>
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