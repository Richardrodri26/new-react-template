import { tipoProyectoColumns } from './Columns'
import { MarcaProyecto, MetadataPagination, OrderTypes, TipoProyecto, Visit, useMarcaProyectosQuery, useTipoProyectosQuery, useVisitsQuery } from '@/domain/graphql'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle, File } from 'lucide-react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TipoProyectoHeader } from './Elements'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination'
import { PaginationTable } from '@/components/TableElements'
import { useState } from 'react'
import { DataTable } from '@/components/TableElements/SimpleTable'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { TipoProyectoModals } from './Modals'

export const MarcaPoryectoPage = () => {
  return (
    <>
      <VisitsGrid />
      <TipoProyectoModals />
    </>
  )
}

const VisitsGrid = () => {
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);
  const [skip, setSkip] = useState(0)
  const takeValue = 10
  const { data, loading } = useMarcaProyectosQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
    }
  })

  const visits = (data?.marcaProyectos || []) as MarcaProyecto[];
  const onCreateModal = () => {
    setModalStatus({ id: "createMarcaProyecto" })
  }
  return (
    <>
      {/* <TipoProyectoHeader /> */}

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" onClick={() => onCreateModal()}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear marca proyecto
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Marca de proyecto</CardTitle>
                <CardDescription>
                  Gestiona tus marca proyectos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Data table */}
                <DataTable isLoading={!data && loading} columns={tipoProyectoColumns as any} data={visits} />
              </CardContent>
              <CardFooter>
                <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.marcaProyectosCount as MetadataPagination} takeValue={takeValue} />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
