

import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { DialogHeader } from '@/components/ui/dialog'
import { InputForm, SelectForm } from '@/composables'
import { TypeClientEnum, useCreateClientMutation } from '@/domain/graphql'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { ToastyErrorGraph } from '@/lib/utils'
import { apolloClient } from '@/main.config'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const createClientSchema = z.object({
  celular: z.string(),
  name: z.string(),
  numberDocument: z.string(),
  type: z.string(),
  email: z.string().email(),
})

type createClientSchemaType = z.infer<typeof createClientSchema>;

const typeClientOptions: { key: string; value: string | number }[] = [
  {
    key: TypeClientEnum.ClienteFinal,
    value: "Cliente final"
  },
  {
    key: TypeClientEnum.Distribuidor,
    value: "Cliente distribuidor"
  },
  {
    key: TypeClientEnum.Instalador,
    value: "Cliente instalador"
  },
  {
    key: TypeClientEnum.Integrador,
    value: "Cliente integrador"
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

  return (
    <>
      <DialogHeader >
        Crear cliente
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createClientSchema}>
        <RowForm>
          <InputForm name='name' label={"Nombre del cliente"} />
          <InputForm name='numberDocument' label={"Número de documento"} />
          <SelectForm options={typeClientOptions} name={'type'} placeholder='Selecciona una opción' label={"Tipo de cliente"} />
        </RowForm>

        <RowForm>
          <InputForm name='email' label={"Correo electronico"} />
          <InputForm name='celular' label={"Telefono celular"} />
        </RowForm>

        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
