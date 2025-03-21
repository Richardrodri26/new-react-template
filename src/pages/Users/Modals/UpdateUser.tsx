

import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { DialogHeader } from '@/components/ui/dialog'
import { ComboboxForm, InputForm, SelectForm } from '@/composables'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { TypeWorker, User, UserDocumentTypes, UserTypes, useCreateClientMutation, useCreateUserMutation, useUpdateUserMutation } from '@/domain/graphql'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { ToastyErrorGraph } from '@/lib/utils'
import { apolloClient } from '@/main.config'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import UserManagementTable from './userTableManagen'

const createUserSchema = z.object({
  address: z.string(),
  email: z.string().email(),
  identificationNumber: z.string(),
  identificationType: z.string(),
  lastName: z.string(),
  name: z.string(),
  // password: z.string(),
  phoneNumber: z.string(),
  type: z.string(),
  typeWoker: z.string().optional(),
  valueTransport: z.string().optional()
})

type createUserSchemaType = z.infer<typeof createUserSchema>;

const typeDocumentsOptions: { key: string; value: string | number }[] = [
  {
    key: UserDocumentTypes.CitizenshipCard,
    value: "Cedula de ciudadania"
  },
  {
    key: UserDocumentTypes.IdentityCard,
    value: "Tarjeta de identidad"
  },
  {
    key: UserDocumentTypes.Nit,
    value: "Nit"
  },
  {
    key: UserDocumentTypes.SpecialPermissionToStay,
    value: "Permiso de permanencia espacial"
  },
]

const typesUserOptions: { key: string; value: string | number }[] = [
  {
    key: UserTypes.Admin,
    value: "Administrador"
  },
  {
    key: UserTypes.User,
    value: "Basico"
  },
]

const typeUserWorker: { key: string; value: string | number }[] = [
  {
    key: TypeWorker.Externo,
    value: "Externo"
  },
  {
    key: TypeWorker.Interno,
    value: "Interno"
  }, 
]
export const UpdateUser = () => {
  const [updateUser] = useUpdateUserMutation();
  const [setModalStatus, modalStatus] = useShallowGeneralStore(state => [state.setModalStatus, state.modalStatus])

  const modalStatusContent = modalStatus?.content as Partial<User>

  const onSubmit = async (data: createUserSchemaType) => {

    try {
      toast.info("Editando usuario...")
      const resMutation = await updateUser({
        variables: {
          updateInput: {
            ...data,
            id: modalStatusContent?.id || "",
            identificationType: data.identificationType as UserDocumentTypes,
            type: data.type as UserTypes,
            typeWoker: data.typeWoker as TypeWorker,
            valueTransport: data.valueTransport ? Number(data.valueTransport) : undefined
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Usuario editado con exito")

      apolloClient.cache.evict({ fieldName: "users" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }


  }

  const defaultValues = {
    address: modalStatusContent?.address,
    email: modalStatusContent?.email,
    identificationNumber: modalStatusContent?.identificationNumber,
    identificationType: modalStatusContent?.identificationType,
    lastName: modalStatusContent?.lastName,
    name: modalStatusContent?.name,
    phoneNumber: modalStatusContent?.phoneNumber,
    type: modalStatusContent?.type,
    typeWoker: modalStatusContent.typeWoker,
    valueTransport: modalStatusContent.valueTransport?.toString() || undefined
  }
  console.log(modalStatusContent)
  return (
    <>
      <DialogHeader >
        Editar Usuario
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createUserSchema} defaultValue={defaultValues}>
        <RowForm>
          <InputForm name='name' label={"Nombre del usuario"} />
          <InputForm name='lastName' label={"Apellido del usuario"} />
          <SelectForm name='identificationType' label={"Tipo de documento del usuario"} placeholder='Selecciona un tipo de identificación' options={typeDocumentsOptions} />
          <InputForm name='identificationNumber' label={"Número de documento"} />
        </RowForm>

        <RowForm>
          <SelectForm name='type' label={"Tipo de usuario"} options={typesUserOptions} placeholder='Selecciona un tipo de usuario' />
          <SelectForm name='typeWoker' label={"Tipo de trabajador"} options={typeUserWorker} placeholder='Selecciona un tipo de trabajador' />

          <InputForm name='address' label={"Dirección del usuario"} />
          {/* <InputForm name='password' label={"Contraseña del usuario"} /> */}

        </RowForm>

        <RowForm>
          {/* <DepartmentAndMunicipality currentIdDepartment='departmentId' currentIdMunicipalities='cityId' /> */}
          <InputForm name='email' label={"Correo electronico"} />
          <InputForm name='phoneNumber' label={"Telefono celular"} />
          <InputForm name='valueTransport' label={"Valor de rodamiento"} type='number'/>
          
          {/* <ComboboxForm label={"Prueba"} name='Prueba' options={[{ label: "prueba 1", value: "1" }, { label: "prueba 2", value: "2" }]} /> */}
        </RowForm>
        {/* {
          modalStatusContent && (
            <UserManagementTable users={modalStatusContent as any} key={modalStatus?.id} />
          )
        } */}

        <ButtonForm>
          Actualizar
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
