import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Proyectos, User, VisitType, useRemoveUserMutation, useRemoveVisitTypeMutation } from "@/domain/graphql";
import { fireAlert, useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const columnHelperUsers = createColumnHelper<Proyectos>();


export const TypeVisitColumns = [
  columnHelperUsers.accessor("name", {
    header: "Nombre"
  }),
  columnHelperUsers.accessor("description", {
    header: "Descripción"
  }),
  columnHelperUsers.accessor("status", {
    header: "Estado"
  }),
  columnHelperUsers.accessor("worker.fullName", {
    header: "Trabajador"
  }),
  columnHelperUsers.accessor("createdByUser.fullName", {
    header: "Creado"
  }),
  columnHelperUsers.display({
    id: "acciones",
    cell: (info) => {
      const [RemoveTypeVisit] = useRemoveVisitTypeMutation({ variables: { removeVisitTypeId: info.row.original.id } });
      const [setModalStatus] = useShallowGeneralStore((state) => [state.setModalStatus])
      const navigate = useNavigate()
      const onShow = () => {
        navigate(`/dashboard/viewProyecto/${info.row.original.id}`)
      }
      

      return (
        <>
         <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> <Eye onClick={onShow} /></TooltipTrigger>
              <TooltipContent>
                <p>Ver proyecto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>      
        </>
      )
    }
  })
]