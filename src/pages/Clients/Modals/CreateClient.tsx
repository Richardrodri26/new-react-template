

import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { DialogHeader } from '@/components/ui/dialog'
import { ComboboxForm, InputForm, SelectForm, SelectFormInterface } from '@/composables'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { OrderTypes, TypeClientEnum, useCreateClientMutation, useUsersQuery } from '@/domain/graphql'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { ToastyErrorGraph } from '@/lib/utils'
import { apolloClient } from '@/main.config'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
const regexNit = /^\d{9}-\d$/
const createClientSchema = z.object({
  celular: z.string(),
  name: z.string(),
  numberDocument: z.string().regex(regexNit, 'No se cumple con el pratrón de 123456789-0'),
  type: z.string(),
  email: z.string().email(),
  userId: z.string(),
  address: z.string()
  // cityId: z.string()
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

export const CreateClient = () => {
  const [createClient] = useCreateClientMutation();
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus])

  const onSubmit = async (data: createClientSchemaType) => {

    try {
      toast.info("Creando cliente...")
      const resMutation = await createClient({
        variables: {
          createInput: {
            ...data,
            type: data.type as TypeClientEnum
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Cliente creado con exito")

      apolloClient.cache.evict({ fieldName: "clients" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }


  }

  const defaultValues = {
    departmentId: "",
    cityId: "",
    name: "",
    numberDocument: "",
    type: typeClientOptions[0].key,
    email: "",
    celular: "",
    Prueba: "1",
    address: "",
    userId: ""
  }

  return (
    <>
      <DialogHeader >
        Crear cliente
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createClientSchema} defaultValue={defaultValues}>
        <RowForm>
          <InputForm name='name' label={"Nombre del cliente"} />
          <InputForm name='numberDocument' label={"Número de documento"} placeholder='Ejemplo (123456789-0)' />
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
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
export const UserSelect = (props: Omit<SelectFormInterface, "options">) => {
  const { data, loading } = useUsersQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 999999
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      }
    }
  })

  const userPositions: {
    key: string;
    value: string | number;
  }[] = data?.users?.map(item => ({ key: item.id, value: item?.name  || ""})) || []

  if (!data && loading) return <></>

  return (
    <SelectForm
      options={userPositions}
      {...props}

    />
  )
}