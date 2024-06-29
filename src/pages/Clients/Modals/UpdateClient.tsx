

import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { DialogHeader } from '@/components/ui/dialog'
import { ComboboxForm, InputForm, SelectForm } from '@/composables'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { Client, MetadataPagination, OrderTypes, TypeClientEnum, useCreateClientMutation, useUpdateClientMutation, useVisitsQuery } from '@/domain/graphql'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { ToastyErrorGraph } from '@/lib/utils'
import { apolloClient } from '@/main.config'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { UserSelect } from './CreateClient'
import { ClientWithForm, ContactClientsPage } from '@/pages/ContactClients'
import { DataTableVisits } from '@/pages/Visits/Grids'
import { visitsColumns } from '@/pages/Visits/Columns'
import { PaginationTable } from '@/components/TableElements'

const createClientSchema = z.object({
  celular: z.string(),
  name: z.string(),
  numberDocument: z.string(),
  type: z.string(),
  email: z.string().email(),
  address: z.string(),
  cityId: z.string(),
  departmentId: z.string()
})

type createClientSchemaType = z.infer<typeof createClientSchema>;

const typeClientOptions: { key: string; value: string | number }[] = [
  {
    key: TypeClientEnum.ClienteFinal,
    value: "final"
  },
  {
    key: TypeClientEnum.Distribuidor,
    value: "distribuidor"
  },
  {
    key: TypeClientEnum.Instalador,
    value: "instalador"
  },
  {
    key: TypeClientEnum.Integrador,
    value: "integrador"
  },
]

export const UpdateClient = () => {
  const [updateClient] = useUpdateClientMutation();
  const [setModalStatus, modalStatus] = useShallowGeneralStore(state => [state.setModalStatus, state.modalStatus])
  const modalStatusContent = modalStatus?.content as Partial<Client>
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
          _eq: modalStatusContent?.id
        }
      }
    }
  })
  const onSubmit = async (data: createClientSchemaType) => {
  
    try {
      toast.info("Actualizando cliente...")
      const resMutation = await updateClient({
        variables: {
            updateInput: {
            ...data,
            id: modalStatusContent?.id || "",
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


    } catch (error) {
      ToastyErrorGraph(error as any)
    }


  }

  const defaultValues = {
    departmentId: modalStatusContent?.department?.id,
    cityId: modalStatusContent?.city?.id,
    name: modalStatusContent?.name,
    numberDocument: modalStatusContent?.numberDocument,
    type: modalStatusContent?.type,
    email: modalStatusContent?.email,
    celular: modalStatusContent?.celular,
    userId: modalStatusContent?.user?.id,
    address: modalStatusContent?.address,
    Prueba: "1",
  }

  return (
    <>
      <DialogHeader >
        Actualizar cliente
      </DialogHeader>

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
        <ButtonForm>
          Actualizar
        </ButtonForm>
      </BasicFormProviderZod>
      <DialogHeader >
          Contacto Cliente
        </DialogHeader>
        <ClientWithForm id={modalStatusContent?.id || ""}/>
        <DialogHeader >
          Visitas
        </DialogHeader>
        <DataTableVisits isLoading={!data && loading} columns={visitsColumns as any} data={data?.visits || []} />
        <PaginationTable skipState={{ value: skip, setValue: setSkip }} metaDataPagination={data?.visitsCount as MetadataPagination} takeValue={takeValue} />
      </div>
    </>
  )
}
