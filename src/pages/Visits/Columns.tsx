import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Visit } from "@/domain/graphql";
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from "lucide-react";

const columnHelperVisits = createColumnHelper<Visit>();

export const visitsColumns = [
  columnHelperVisits.accessor("client.name", {
    header: "Cliente"
  }),

  columnHelperVisits.accessor("description", {
    header: "Descripción"
  }),

  columnHelperVisits.accessor("location", {
    header: "Localización"
  }),

  columnHelperVisits.accessor("status", {
    header: "Estado"
  }),

  columnHelperVisits.display({
    id: "Acciones",
    cell: (info) => {
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })
]