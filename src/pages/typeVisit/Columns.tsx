import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User, VisitType, useRemoveUserMutation, useRemoveVisitTypeMutation } from "@/domain/graphql";
import { fireAlert, useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";


const columnHelperUsers = createColumnHelper<VisitType>();


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

  columnHelperUsers.display({
    id: "acciones",
    cell: (info) => {
      const [RemoveTypeVisit] = useRemoveVisitTypeMutation({ variables: { removeVisitTypeId: info.row.original.id } });
      const [setModalStatus] = useShallowGeneralStore((state) => [state.setModalStatus])

      const onRemoveTypeVisit = async () => {
        const resAlert = await fireAlert({
          type: "warning",
          title: "Eliminar tipo de visita",
          description: "¿Estas seguro de eliminar el tipo de visita?",
          showCancelButton: true,
        })

        if (resAlert) {

          try {
            toast.info("Eliminando tipo de visita...")
            const resMutation = await RemoveTypeVisit();

            if (resMutation.errors) {
              toast.error("¡Oops, hubo un error!")
              return
            }

            toast.success("tipo de visita eliminado con exito")
            apolloClient.cache.evict({ fieldName: "visitType" })
          } catch (error) {
            ToastyErrorGraph(error as any)
          }

        }
      }

      const onEditUser = () => {
        setModalStatus({
          id: "updateUser",
          content: info.row.original
        })
      }

      return (
        <>
         <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> <Trash onClick={onRemoveTypeVisit} /></TooltipTrigger>
              <TooltipContent>
                <p>Eliminar tipo de visita</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

                 
        </>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button
        //       aria-haspopup="true"
        //       size="icon"
        //       variant="ghost"
        //     >
        //       <MoreHorizontal className="h-4 w-4" />
        //       <span className="sr-only">Toggle menu</span>
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        //     {/* <DropdownMenuItem onClick={onEditUser}>Editar tipo de visita</DropdownMenuItem> */}
        //     <DropdownMenuItem onClick={onRemoveTypeVisit}>Eliminar tipo de visita</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      )
    }
  })
]