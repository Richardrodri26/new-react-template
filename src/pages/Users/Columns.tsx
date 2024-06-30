import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, useRemoveUserMutation } from "@/domain/graphql";
import { fireAlert, useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";


const columnHelperUsers = createColumnHelper<User>();


export const usersColumns = [
  columnHelperUsers.accessor("lastName", {
    header: "Usuarios",
    cell: ({ row }) => (
      <span>{`${row.original.name} ${row.original?.lastName || ""}`}</span>
    )
  }),
  columnHelperUsers.accessor("phoneNumber", {
    header: "Número de telefono"
  }),
  columnHelperUsers.accessor("email", {
    header: "Correo electronico"
  }),

  columnHelperUsers.display({
    id: "acciones",
    cell: (info) => {
      const [removeUser] = useRemoveUserMutation({ variables: { removeUserId: info.row.original.id } });
      const [setModalStatus] = useShallowGeneralStore((state) => [state.setModalStatus])

      const onRemoveUser = async () => {
        const resAlert = await fireAlert({
          type: "warning",
          title: "Eliminar usuario",
          description: "¿Estas seguro de eliminar el usuario?",
          showCancelButton: true,
        })

        if (resAlert) {

          try {
            toast.info("Eliminando usuario...")
            const resMutation = await removeUser();

            if (resMutation.errors) {
              toast.error("¡Oops, hubo un error!")
              return
            }

            toast.success("Usuario eliminado con exito")
            apolloClient.cache.evict({ fieldName: "users" })
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
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={onEditUser}>Editar usuario</DropdownMenuItem>
            <DropdownMenuItem onClick={onRemoveUser}>Eliminar usuario</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })
]