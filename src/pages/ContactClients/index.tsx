
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

export const ContactClientsPage = ({id}) => {
  return (
    <>
      <ContactClientsGrid id={id}/>
      <ClientContactModals />
    </>
  )
}


const ContactClientsGrid = ({id}) => {
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);


  const [skip, setSkip] = useState(0)
  const takeValue = 3
  const { data, loading } = useClientContactsQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      },
      where: {
        client: {
          _eq: id
        }
      }
    }
  })

  const onCreateModal = () => {
    setModalStatus({ id: "createClientContact" })

  }

  const clients = (data?.clientContacts || []) as ClientContact[];

  return (
    <>
      {/* <ClientsContactHeader /> */}
      <Button onClick={onCreateModal} size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Crear contacto
                </span>
      </Button>
      <DataTableVisits isLoading={!data && loading} columns={clientsContactsColumns as any} data={clients} />
      <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.clientContactsCount as MetadataPagination} takeValue={takeValue} />
    </>
  )
}