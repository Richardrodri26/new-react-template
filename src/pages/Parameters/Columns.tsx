import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Parameter, useRemoveParameterMutation } from "@/domain/graphql";
import useGeneral, { fireAlert } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";


const columHelperParameters = createColumnHelper<Parameter>();

export const parametersColumns = [
  columHelperParameters.accessor("name", {
    header: "Nombre del parametro",
  }),
  columHelperParameters.accessor("codigo", {
    header: "Código",
  }),
  columHelperParameters.accessor("descripcion", {
    header: "Descripción del parametro",
  }),
  columHelperParameters.accessor("type", {
    header: "Tipo del parametro",
  }),
  columHelperParameters.accessor("updatedAt", {
    header: "Fecha de actualización",
    cell: ({ getValue }) => {
      return format(getValue(), 'MM/dd/yyyy')
    }
  }),

  columHelperParameters.display({
    id: "Acciones",
    cell: (info) => {
      const [removeParameter] = useRemoveParameterMutation({ variables: { removeParameterId: info.row.original.id } });
      const setModalStatus = useGeneral(state => state.setModalStatus)

      const onRemoveParameter = async () => {
        const resAlert = await fireAlert({
          type: "warning",
          title: "Eliminar parametro",
          description: "¿Estas seguro de eliminar el parametro?",
          showCancelButton: true,
        })

        if (resAlert) {

          try {
            toast.info("Eliminando parametro...")
            const resMutation = await removeParameter();

            if (resMutation.errors) {
              toast.error("¡Oops, hubo un error!")
              return
            }

            toast.success("Parametro eliminado con exito")
            apolloClient.cache.evict({ fieldName: "parameters" })
          } catch (error) {
            ToastyErrorGraph(error as any)
          }

        }
      }

      const onEdit = () => {
        setModalStatus({
          id: "updateParameter",
          content: {
            id: info.row.original.id,
            data: info.row.original
          }
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
            <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={onRemoveParameter}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })
]