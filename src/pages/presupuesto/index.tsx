
import { Client, MetadataPagination, OrderTypes, Presupuesto, TypeClientEnum, useClientQuery, useClientsQuery, useCreateAllPresupuestoToMonthMutation, usePresupuestosQuery, useUpdateClientMutation, useVisitsQuery } from '@/domain/graphql'
import React, { useState } from 'react'
import { ClientsHeader } from './Elements'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle, File } from 'lucide-react'
import { PaginationTable } from '@/components/TableElements'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { DataTableVisits } from '../Visits/Grids'
import { clientsColumns } from './Columns'
import { fireAlert, useShallowGeneralStore } from '@/domain/store/general.store'
import { ClientModals } from './Modals'
import { orderBy } from 'lodash'
import { ContactClientsPage, OnlyContactClientsPage } from '../ContactClients'
import { useNavigate, useParams } from 'react-router-dom'
import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { InputForm, SelectForm } from '@/composables'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { UserSelect } from './Modals/CreateClient'
import { createClientSchema, createClientSchemaType, typeClientOptions } from './Modals/UpdateClient'
import { toast } from 'sonner'
import { apolloClient } from '@/main.config'
import { ToastyErrorGraph } from '@/lib/utils'
import { z } from 'zod'
import { TIPOS_VERTICALES } from '@/components/Utils/vertical'

export const PresupuestoPage = () => {
  return (
    <>
      <ClientsGrid />
      <ClientModals />
    </>
  )
}


const ClientsGrid = () => {
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);
  const [createAll] = useCreateAllPresupuestoToMonthMutation()

  const [skip, setSkip] = useState(0)
  const [city, setCity] = useState('')

  const takeValue = 10
  const { data, loading, refetch } = usePresupuestosQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        createdAt: OrderTypes.Asc
      }
    }
  })

  const onCreateModal = () => {
    setModalStatus({ id: "createPresupuesto" })
  }
  const onCreateAllToMonth = async () => {
    const resAlert = await fireAlert({
      type: "warning",
      title: "Crear presupuesto",
      description: "¿Estas seguro de crear estos presupuestos?",
      showCancelButton: true,
    })
    if(resAlert){
      try {
        toast.info('Creando...')
        const res = await createAll()
        if(res.errors){
          toast.error(res.errors[0].message)
          return
        }
        toast.success('Presupuesto creado con exito');
        apolloClient.cache.evict({ fieldName: "presupuestos" })
      }catch (err) {
        ToastyErrorGraph(err as any)
      }
    }
  }

  const clients = (data?.presupuestos || []) as Presupuesto[];

  return (
    <>
      {/* <ClientsHeader callback={onSearchCallback} /> */}

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger onClick={onCreateAllToMonth} value="all">Obtener del mes anterior</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button onClick={onCreateModal} size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear presupuesto
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Presupuesto</CardTitle>
                <CardDescription>
                  Gestiona tus presupuesto.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Data table */}
                <DataTableVisits isLoading={!data && loading} columns={clientsColumns as any} data={clients} />
              </CardContent>
              <CardFooter>
              <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.presupuestosCount as MetadataPagination} takeValue={takeValue} />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}