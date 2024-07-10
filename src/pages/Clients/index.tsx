
import { Client, MetadataPagination, OrderTypes, TypeClientEnum, useClientQuery, useClientsQuery, useUpdateClientMutation, useVisitsQuery } from '@/domain/graphql'
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
import { useShallowGeneralStore } from '@/domain/store/general.store'
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
import { visitsColumns } from '../Visits/Columns'
import { ClientContactModals } from '../ContactClients/Modals'
import { z } from 'zod'

export const ClientsPage = () => {
  return (
    <>
      <ClientsGrid />
      <ClientModals />
    </>
  )
}

export const ClientsEditPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [updateClient] = useUpdateClientMutation();
  const [setModalStatus, modalStatus] = useShallowGeneralStore(state => [state.setModalStatus, state.modalStatus])
  // const modalStatusContent = modalStatus?.content as Partial<Client>
  const [skip, setSkip] = useState(0)
  const takeValue = 5
  const { data, loading } = useVisitsQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        dateVisit: OrderTypes.Desc
      },
      where: {
        client: {
          _eq: id
        }
      }
    }
  })

  const { data: dataClient, loading: loadingClient } = useClientQuery({
    variables: {
      clientId: id || ""
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first"
  })


  const onSubmit = async (data: createClientSchemaType) => {
  
    try {
      toast.info("Actualizando cliente...")
      const resMutation = await updateClient({
        variables: {
            updateInput: {
            ...data,
            id: id || "",
            type: data.type as TypeClientEnum
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Cliente actualizado con exito")

      apolloClient.cache.evict({ fieldName: "clients" })

      setModalStatus()
      // navigate(-1)


    } catch (error) {
      ToastyErrorGraph(error as any)
    }


  }

  if(!dataClient || loadingClient) return

  const clientData = dataClient.client

  const defaultValues = {
    departmentId: clientData?.department?.id,
    cityId: clientData?.city?.id,
    name: clientData?.name,
    numberDocument: clientData?.numberDocument,
    type: clientData?.type,
    email: clientData?.email,
    celular: clientData?.celular,
    userId: clientData?.user?.id,
    address: clientData?.address,
    descripcion: clientData?.descripcion,
    Prueba: "1",
  }

  return (
    <>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
           
            <div className="ml-auto flex items-center gap-2">
              
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Editar</CardTitle>
                <CardDescription>
                  Edita al cliente. <br/>
                  <Button onClick={() => navigate(-1)}>Volver</Button>
                </CardDescription>
              </CardHeader>
              <CardContent>

      <CardTitle >
        Actualizar cliente
      </CardTitle>


      <div className='overflow-y-auto'>
      <BasicFormProviderZod submit={onSubmit} schema={createClientSchema} defaultValue={defaultValues}>
        <RowForm>
          <InputForm name='name' label={"Nombre del cliente"} />
          <InputForm name='numberDocument' label={"Número de documento"} />
          <InputForm name='address' label={"Dirrecion"} />
          <SelectForm options={typeClientOptions} name={'type'} placeholder='Selecciona una opción' label={"Tipo de cliente"} />
        </RowForm>

        <RowForm>
          <DepartmentAndMunicipality currentIdDepartment='departmentId' currentIdMunicipalities='cityId' />
          <InputForm name='email' label={"Correo electronico"} />
          <InputForm name='celular' label={"Telefono celular"} />
          <UserSelect name="userId" label={"Usuario"} placeholder="Selecciona un usuario" />
          {/* <ComboboxForm label={"Prueba"} name='Prueba' options={[{ label: "prueba 1", value: "1" }, { label: "prueba 2", value: "2" }]} /> */}
        </RowForm>
        <RowForm>
        <InputForm name='descripcion' label={"Descripción"} />

        </RowForm>
        <ButtonForm>
          Actualizar
        </ButtonForm>
      </BasicFormProviderZod>
      <CardTitle >
          Contacto Cliente
        </CardTitle>
        <br />
        <OnlyContactClientsPage id={id || ""}/>
        <br />

        <CardTitle >
          Visitas
        </CardTitle>
        <br />
        <DataTableVisits isLoading={!data && loading} columns={visitsColumns as any} data={data?.visits || []} />
        <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.visitsCount as MetadataPagination} takeValue={takeValue} />
      </div>

      

              </CardContent>
              
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <ClientContactModals />
    </>
  )
}


const ClientsGrid = () => {
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);


  const [skip, setSkip] = useState(0)
  const [city, setCity] = useState('')
  const [department, setDepartment] = useState('')

  const takeValue = 10
  const { data, loading, refetch } = useClientsQuery({
    variables: {
      pagination: {
        skip,
        take: takeValue
      },
      orderBy: {
        name: OrderTypes.Asc
      }
    }
  })

  const onSearchCallback = async (searchValue: string, cityId?: string, departmentId?: string) => {
    let  where = {
      pagination: {
        skip: 0,
        take: takeValue
      },
      orderBy: {
        name: OrderTypes.Asc
      },
      where: {
        name:{
          _contains: searchValue || "" 
        },
        _or: [
          {
            numberDocument: {
              _contains:  searchValue || "" 
            }
          }
        ],
      },
      city: undefined,
      department: undefined
    }
    if((city && department)){
      /*@ts-ignore*/
      delete where.where._or
      /*@ts-ignore*/
      delete where.pagination
      /*@ts-ignore*/
      where.where.city = {
        _eq: cityId
      }
      /*@ts-ignore*/
      where.where.department ={
        _eq: departmentId
      }
    }
    refetch(where)
  }

  const onCreateModal = () => {
    setModalStatus({ id: "createClient" })

  }
  const findClientSchema = z.object({
    departmentId: z.string(),
    cityId: z.string()
  })
  
  type findClientSchemaType = z.infer<typeof findClientSchema>;
  const onSubmitFilter = (data: findClientSchemaType) => {
    setCity(data.cityId)
    setDepartment(data.departmentId)
    onSearchCallback("", data.cityId, data.departmentId)
  }
  const defaultValueFilter = {
    cityId: undefined,
    department: undefined
  }


  const clients = (data?.clients || []) as Client[];

  return (
    <>
      <ClientsHeader callback={onSearchCallback} />

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
                  Crear cliente
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>
                  Gestiona tus clientes.
                  <BasicFormProviderZod submit={onSubmitFilter} schema={findClientSchema} className='dashboard-05-chunk-0'>
                  <RowForm>
                  <DepartmentAndMunicipality currentIdDepartment='departmentId' currentIdMunicipalities='cityId' />
                  <ButtonForm className='dashboard-06-chunk-0'>
                    Filtrar
                  </ButtonForm>
                  </RowForm>
                </BasicFormProviderZod>
                <Button className='dashboard-05-chunk-2' onClick={() => {
                  setDepartment('')
                  setCity('')
                  onSearchCallback("")
                }}>Borrar filtro</Button>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Data table */}
                <DataTableVisits isLoading={!data && loading} columns={clientsColumns as any} data={clients} />
              </CardContent>
              <CardFooter>



                { !city && !department ? <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.clientsCount as MetadataPagination} takeValue={takeValue} /> : <></> }

              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}