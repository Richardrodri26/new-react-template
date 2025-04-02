import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Client, Presupuesto, useRemoveClientMutation, useRemovePresupuestoMutation } from "@/domain/graphql";
import { fireAlert, useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import { DollarSign, MoreHorizontal, Trash, Trash2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatCurrency } from "../Reports/table/marcasVenta";

const columnHelperClients = createColumnHelper<Presupuesto>();

export const clientsColumns = [
  columnHelperClients.accessor("worker.fullName", {
    header: "Trabajador"
  }),
  columnHelperClients.accessor("ano", {
    header: "Año"
  }),
  columnHelperClients.accessor("mes", {
    header: "Mes"
  }),
  columnHelperClients.accessor("description", {
    header: "Descripción"
  }),
  columnHelperClients.accessor("valor", {
    header: "Valor",
    cell: (info) => {
      return formatCurrency(info.row.original.valor)
    }
  }),

  columnHelperClients.display({
    id: "Acciones",
    cell: (info) => {
      const [removeClient] = useRemovePresupuestoMutation({ variables: { removePresupuestoId: info.row.original.id } });
      // const [setModalStatus] = useShallowGeneralStore((state) => [state.setModalStatus]);
      // const onEditUser = () => {
      //   setModalStatus({
      //     id: "updatePresupuesto",
      //     content: info.row.original
      //   })
      // }
      const onRemoveClient = async () => {
        const resAlert = await fireAlert({
          type: "warning",
          title: "Eliminar presupuesto",
          description: "¿Estas seguro de eliminar este presupuesto?",
          showCancelButton: true,
        })

        if (resAlert) {

          try {
            toast.info("Eliminando presupuesto...")
            const resMutation = await removeClient();

            if (resMutation.errors) {
              toast.error("¡Oops, hubo un error!")
              return
            }

            toast.success("Presupuesto eliminado con exito")
            apolloClient.cache.evict({ fieldName: "presupuestos" })
          } catch (error) {
            ToastyErrorGraph(error as any)
          }

        }
      }
      return (

        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> <Trash2 onClick={onRemoveClient} className="cursor-pointer"/></TooltipTrigger>
              <TooltipContent>
                <p>Eliminar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )
    }
  })
]