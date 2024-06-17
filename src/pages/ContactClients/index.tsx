
import { Client, ClientContact, MetadataPagination, OrderTypes, useClientContactsQuery, useClientsQuery } from '@/domain/graphql'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ListFilter, PlusCircle, File } from 'lucide-react'
import { PaginationTable } from '@/components/TableElements'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { DataTableVisits } from '../Visits/Grids'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { clientsContactsColumns } from './Columns'
import { ClientsContactHeader } from './Elements'
import { ClientContactModals } from './Modals'

export const ContactClientsPage = () => {
  return (
    <>
      <ContactClientsGrid />
      <ClientContactModals />
    </>
  )
}


const ContactClientsGrid = () => {
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);


  const [skip, setSkip] = useState(0)
  const takeValue = 10
  const { data, loading } = useClientContactsQuery({
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
    setModalStatus({ id: "createClientContact" })

  }

  const clients = (data?.clientContacts || []) as ClientContact[];

  return (
    <>
      <ClientsContactHeader />

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {/* <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="archived" className="hidden sm:flex">
          Archived
        </TabsTrigger> */}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Archived
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button> */}
              <Button onClick={onCreateModal} size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear contacto
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Contactos</CardTitle>
                <CardDescription>
                  Gestiona tus contactos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Data table */}
                <DataTableVisits isLoading={!data && loading} columns={clientsContactsColumns as any} data={clients} />
              </CardContent>
              <CardFooter>



                <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.clientContactsCount as MetadataPagination} takeValue={takeValue} />

              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}