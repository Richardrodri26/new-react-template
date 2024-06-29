import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Client, useRemoveClientMutation } from "@/domain/graphql";
import { fireAlert, useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const columnHelperClients = createColumnHelper<Client>();

export const clientsColumns = [
  columnHelperClients.accessor("name", {
    header: "Cliente"
  }),
  columnHelperClients.accessor("numberDocument", {
    header: "Numero de documento"
  }),
  columnHelperClients.accessor("address", {
    header: "Dirección"
  }),

  columnHelperClients.accessor("celular", {
    header: "Telefono"
  }),

  columnHelperClients.accessor("type", {
    header: "Tipo de cliente"
  }),
  columnHelperClients.accessor("user.name", {
    header: "Usuario"
  }),

  columnHelperClients.display({
    id: "Acciones",
    cell: (info) => {
      const [removeClient] = useRemoveClientMutation({ variables: { removeClientId: info.row.original.id } });
      const [setModalStatus] = useShallowGeneralStore((state) => [state.setModalStatus])

      const onRemoveClient = async () => {
        const resAlert = await fireAlert({
          type: "warning",
          title: "Eliminar cliente",
          description: "¿Estas seguro de eliminar el cliente?",
          showCancelButton: true,
        })

        if (resAlert) {

          try {
            toast.info("Eliminando cliente...")
            const resMutation = await removeClient();

            if (resMutation.errors) {
              toast.error("¡Oops, hubo un error!")
              return
            }

            toast.success("Cliente eliminado con exito")
            apolloClient.cache.evict({ fieldName: "clients" })
          } catch (error) {
            ToastyErrorGraph(error as any)
          }

        }
      }
      const onEditUser = () => {
        setModalStatus({
          id: "updateClient",
          content: info.row.original
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={onEditUser}>Editar cliente</DropdownMenuItem>
            <DropdownMenuItem onClick={onRemoveClient}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })
]