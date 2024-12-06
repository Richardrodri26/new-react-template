import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Client, ClientContact, useRemoveClientContactMutation, useRemoveClientMutation } from "@/domain/graphql";
import useGeneral, { fireAlert } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal, Trash, User } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const columnHelperClientsContact = createColumnHelper<ClientContact>();

export const clientsContactsColumns = [
  columnHelperClientsContact.accessor("name", {
    header: "Nombre"
  }),

  columnHelperClientsContact.accessor("email", {
    header: "Correo electronico"
  }),

  columnHelperClientsContact.accessor("celular", {
    header: "Celular"
  }),
  columnHelperClientsContact.accessor("telefono", {
    header: "Telefono"
  }),
  columnHelperClientsContact.accessor("position", {
    header: "Cargo"
  }),

  columnHelperClientsContact.display({
    id: "Acciones",
    cell: (info) => {
      const [removeClientContact] = useRemoveClientContactMutation({ variables: { removeClientContactId: info.row.original.id } });
      const setModalStatus = useGeneral(state => state.setModalStatus)

      const onRemoveClient = async () => {
        const resAlert = await fireAlert({
          type: "warning",
          title: "Eliminar contacto",
          description: "¿Estas seguro de eliminar el contacto?",
          showCancelButton: true,
        })

        if (resAlert) {

          try {
            toast.info("Eliminando contacto...")
            const resMutation = await removeClientContact();

            if (resMutation.errors) {
              toast.error("¡Oops, hubo un error!")
              return
            }

            toast.success("Contacto eliminado con exito")
            apolloClient.cache.evict({ fieldName: "clientContacts" })
          } catch (error) {
            ToastyErrorGraph(error as any)
          }

        }
      }

      const onEdit = () => {
        setModalStatus({
          id: "updateClientContact",
          content: {
            id: info.row.original.id,
            data: info.row.original
          }
        })
      }

      return (        
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <User onClick={onEdit} /></TooltipTrigger>
            <TooltipContent>
              <p>Editar cliente</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <Trash className="text-red-500" onClick={onRemoveClient} /></TooltipTrigger>
            <TooltipContent>
              <p>Eliminar cliente</p>
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
        //     <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
        //     <DropdownMenuItem onClick={onRemoveClient}>Eliminar</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      )
    }
  })
]