

import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { DialogHeader } from '@/components/ui/dialog'
import { ComboboxForm, InputForm, SelectForm } from '@/composables'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { UserDocumentTypes, UserTypes, VisitTypeStatusEnum, useCreateClientMutation, useCreateUserMutation, useCreateVisitTypeMutation } from '@/domain/graphql'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { ToastyErrorGraph } from '@/lib/utils'
import { apolloClient } from '@/main.config'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const createTypeVistSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.string()
})

type createTypeVistSchemaType = z.infer<typeof createTypeVistSchema>;


const typeStatusOptions: { key: string; value: string | number }[] = [
  {
    key: VisitTypeStatusEnum.Active,
    value: "ACTIVA"
  },
  {
    key: VisitTypeStatusEnum.Inactive,
    value: "INACTIVA"
  },
]

export const CreateTypeVisit = () => {
  const [createTypeVisit] = useCreateVisitTypeMutation();
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus])

  const onSubmit = async (data: createTypeVistSchemaType) => {

    try {
      toast.info("Creando tipo de visita...")
      const resMutation = await createTypeVisit({
        variables: {
          createInput: {
            description: data.description,
            name: data.name,
            status: data.status as VisitTypeStatusEnum
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Tipo de visita creada con exito")

      apolloClient.cache.evict({ fieldName: "visitType" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }


  }

  // const defaultValues = {
  //   address: "",
  //   email: "",
  //   identificationNumber: "",
  //   identificationType: "",
  //   lastName: "",
  //   name: "",
  //   password: "",
  //   phoneNumber: "",
  //   type: "",
  // }

  return (
    <>
      <DialogHeader >
        Crear tipo de visita
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createTypeVistSchema}>
        <RowForm>
          <InputForm name='name' label={"Nombre del tipo de visita"} />
          <InputForm name='description' label={"Descripcion del tipo de visita"} />
          <SelectForm name='status' label={"Estado"} options={typeStatusOptions} placeholder='Selecciona estado' />
          
        </RowForm>
        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
