import { STATUSVISITCHANGSPANISH } from "@/components/Utils/status";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusVisitEnum, Visit } from "@/domain/graphql";
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from "dayjs";
import { Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columnHelperVisits = createColumnHelper<Visit>();

export const visitsColumns = [
  columnHelperVisits.accessor("client.name", {
    header: "Cliente"
  }),

  columnHelperVisits.accessor("user.name", {
    header: "Usuario"
  }),
  columnHelperVisits.accessor("dateVisit", {
    header: "Fecha",
    cell: (info) => {
      return dayjs(info.row.original.dateVisit).format("YYYY-MM-DD HH:mm:ss")
    }
  }),
  columnHelperVisits.accessor("description", {
    header: "Descripción"
  }),

  columnHelperVisits.accessor("type.name", {
    header: "Tipo"
  }),

  columnHelperVisits.accessor("status", {
    header: "Estado",
    cell: (info) => {
      return STATUSVISITCHANGSPANISH(info.row.original.status)
    }
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

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> <Eye onClick={onClickShowDetail} /></TooltipTrigger>
              <TooltipContent>
                <p>Ver detalle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

       

        </div>
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
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem onClick={onClickShowDetail}>Ver detalle</DropdownMenuItem>
        //     {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
        //   </DropdownMenuContent>
        // </DropdownMenu>
      )
    }
  })
]