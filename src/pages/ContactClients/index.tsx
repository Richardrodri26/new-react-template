
import { ClientContact, MetadataPagination, OrderTypes, useClientContactsQuery, useCreateClientContactMutation } from '@/domain/graphql'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { PaginationTable } from '@/components/TableElements'
import { DataTableVisits } from '../Visits/Grids'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { clientsContactsColumns } from './Columns'
import { ClientContactModals } from './Modals'
import { BasicFormProviderZod, RowForm, ButtonForm } from '@/components'
import { InputForm } from '@/composables'
import { ClientSelect, createClientContactSchema, createClientContactSchemaType } from './Modals/CreateClientContact'
import { toast } from 'sonner'
import { apolloClient } from '@/main.config'
import { ToastyErrorGraph } from '@/lib/utils'

export const ContactClientsPage = ({ id }: { id: string }) => {
  return (
    <>
      <ContactClientsGrid id={id} />
      <ClientContactModals />
    </>
  )
}

export const OnlyContactClientGrid = ({ id }: { id: string }) => {
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

  

  const clients = (data?.clientContacts || []) as ClientContact[];

  return (
    <>
     
      <DataTableVisits isLoading={!data && loading} columns={clientsContactsColumns as any} data={clients} />
      <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.clientContactsCount as MetadataPagination} takeValue={takeValue} />
    </>
  )
}


const ContactClientsGrid = ({ id }: { id: string }) => {
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
      <Button onClick={onCreateModal} size="sm" className="h-8 gap-1 w-fit">
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


export const ClientWithForm = ({ id }: { id: string }) => {
  const [createMutation] = useCreateClientContactMutation()
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus])

  const onSubmit = async (data: createClientContactSchemaType) => {
    try {
      toast.info("Creando Contacto...")
      const resMutation = await createMutation({
        variables: {
          createInput: {
            ...data,
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Contacto creado con exito")

      apolloClient.cache.evict({ fieldName: "clientContacts" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }
  }

  return (
    <>
      {/* <DialogHeader>
        Crear contacto
      </DialogHeader> */}

      <BasicFormProviderZod submit={onSubmit} schema={createClientContactSchema}>
        <RowForm>
          <InputForm name='name' label={"Nombre"} />
          <InputForm name='email' label={"Correo electronico"} />
        </RowForm>

        <RowForm>

          {/* <InputForm name='type' label={"Tipo"} /> */}
          {/* <InputForm name='type' label={"Tipo"} /> */}

          <InputForm name='celular' label={"Celular"} />
          {/* <InputForm name='numberDocument' label={"Numero de documento"} /> */}
          <InputForm name='telefono' label={"Telefono"} />

        </RowForm>

        <RowForm>
          {/* <PositionsSelect name="position" placeholder="Selecciona una posicion" /> */}
          <InputForm name='position' label={"Posicion"} />

          <ClientSelect name="clientId" label={"Cliente"} placeholder="Selecciona un cliente" />

        </RowForm>

        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>

      <OnlyContactClientGrid id={id} />
    </>
  )
}