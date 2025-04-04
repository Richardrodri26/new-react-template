
import { MetadataPagination, OrderTypes, useProyectosQuery, User, useVisitTypesQuery } from '@/domain/graphql'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle, File } from 'lucide-react'
import { PaginationTable } from '@/components/TableElements'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { DataTableVisits } from '../Visits/Grids'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { TypeVistHeader } from './Elements'
import { TypeVisitColumns } from './Columns'
import { TypeVistModals } from './Modals'

export const ProyectoPage = () => {
  return (
    <>
      <TypeVisitGrid />
      <TypeVistModals />
    </>
  )
}


const TypeVisitGrid = () => {
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);


  const [skip, setSkip] = useState(0)
  const takeValue = 10
  const { data, loading } = useProyectosQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      }
    }
  })

  const onCreateModal = () => {
    setModalStatus({ id: "createTypeVisit" })

  }

  const clients = (data?.proyectos || [])

  return (
    <>
      <TypeVistHeader />

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button onClick={onCreateModal} size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear proyecto
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Proyectos</CardTitle>
                <CardDescription>
                  Gestiona tus Poryectos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Data table */}
                <DataTableVisits isLoading={!data && loading} columns={TypeVisitColumns as any} data={clients} />
              </CardContent>
              <CardFooter>



                <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.proyectosCount as MetadataPagination} takeValue={takeValue} />

              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}