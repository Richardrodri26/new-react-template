import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Visit } from "@/domain/graphql";
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columnHelperVisits = createColumnHelper<Visit>();

export const visitsColumns = [
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

  columnHelperVisits.accessor("status", {
    header: "Estado"
  }),

  columnHelperVisits.display({
    id: "Acciones",
    cell: (info) => {
      const navigate = useNavigate(); 
      const onClickShowDetail = () => {
        let path = `/dashboard/visit/${info.row.original.id}`; 
        navigate(path);
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
            <DropdownMenuItem onClick={onClickShowDetail}>Ver detalle</DropdownMenuItem>
            {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })
]