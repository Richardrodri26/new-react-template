

// import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
// import { DialogHeader } from '@/components/ui/dialog'
// import { ComboboxForm, InputForm, SelectForm } from '@/composables'
// import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
// import { User, UserDocumentTypes, UserTypes, VisitTypeStatusEnum, useCreateClientMutation, useCreateUserMutation, useUpdateUserMutation } from '@/domain/graphql'
// import { useShallowGeneralStore } from '@/domain/store/general.store'
// import { ToastyErrorGraph } from '@/lib/utils'
// import { apolloClient } from '@/main.config'
// import React from 'react'
// import { toast } from 'sonner'
// import { z } from 'zod'
// const createTypeVistSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   status: z.string()
// })


// type createTypeVistSchemaType = z.infer<typeof createTypeVistSchema>;

// const typeStatusOptions: { key: string; value: string | number }[] = [
//   {
//     key: VisitTypeStatusEnum.Active,
//     value: "ACTIVA"
//   },
//   {
//     key: VisitTypeStatusEnum.Inactive,
//     value: "INACTIVA"
//   },
// ]

// export const UpdateUser = () => {
//   const [updateUser] = useUpdateUserMutation();
//   const [setModalStatus, modalStatus] = useShallowGeneralStore(state => [state.setModalStatus, state.modalStatus])

//   const modalStatusContent = modalStatus?.content as Partial<User>

//   const onSubmit = async (data: createUserSchemaType) => {

//     try {
//       toast.info("Editando usuario...")
//       const resMutation = await updateUser({
//         variables: {
//           updateInput: {
//             ...data,
//             id: modalStatusContent?.id || "",
//             identificationType: data.identificationType as UserDocumentTypes,
//             type: data.type as UserTypes
//           }
//         }
//       });

//       if (resMutation.errors) {
//         toast.error("¡Oops, hubo un error")
//         return
//       }

//       toast.success("Usuario editado con exito")

//       apolloClient.cache.evict({ fieldName: "users" })

//       setModalStatus()


//     } catch (error) {
//       ToastyErrorGraph(error as any)
//     }


//   }

//   const defaultValues = {
//     address: modalStatusContent?.address,
//     email: modalStatusContent?.email,
//     identificationNumber: modalStatusContent?.identificationNumber,
//     identificationType: modalStatusContent?.identificationType,
//     lastName: modalStatusContent?.lastName,
//     name: modalStatusContent?.name,
//     phoneNumber: modalStatusContent?.phoneNumber,
//     type: modalStatusContent?.type,
//   }

//   return (
//     <>
//       <DialogHeader >
//         Editar Usuario
//       </DialogHeader>

//       <BasicFormProviderZod submit={onSubmit} schema={createUserSchema} defaultValue={defaultValues}>
//         <RowForm>
//           <InputForm name='name' label={"Nombre del usuario"} />
//           <InputForm name='lastName' label={"Apellido del usuario"} />
//           <SelectForm name='identificationType' label={"Tipo de documento del usuario"} placeholder='Selecciona un tipo de identificación' options={typeDocumentsOptions} />
//           <InputForm name='identificationNumber' label={"Número de documento"} />
//         </RowForm>

//         <RowForm>
//           <SelectForm name='type' label={"Tipo de usuario"} options={typesUserOptions} placeholder='Selecciona un tipo de usuario' />

//           <InputForm name='address' label={"Dirección del usuario"} />
//           {/* <InputForm name='password' label={"Contraseña del usuario"} /> */}

//         </RowForm>

//         <RowForm>
//           {/* <DepartmentAndMunicipality currentIdDepartment='departmentId' currentIdMunicipalities='cityId' /> */}
//           <InputForm name='email' label={"Correo electronico"} />
//           <InputForm name='phoneNumber' label={"Telefono celular"} />
//           {/* <ComboboxForm label={"Prueba"} name='Prueba' options={[{ label: "prueba 1", value: "1" }, { label: "prueba 2", value: "2" }]} /> */}
//         </RowForm>

//         <ButtonForm>
//           Crear
//         </ButtonForm>
//       </BasicFormProviderZod>
//     </>
//   )
// }
