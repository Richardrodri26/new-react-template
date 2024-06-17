import { BasicFormProviderZod, ButtonForm, RowForm } from "@/components";
import { DialogHeader } from "@/components/ui/dialog"
import { InputForm, SelectForm, SelectFormInterface } from "@/composables";
import { ClientContact, TypeParameterEnum, useClientsOptionsQuery, useCreateClientContactMutation, useCreateParameterMutation, usePositionsQuery, useUpdateClientContactMutation } from "@/domain/graphql";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { toast } from "sonner";
import { z } from "zod";
import { ClientSelect, PositionsSelect } from "./CreateClientContact";

const updateClientContactSchema = z.object({

  celular: z.string(),
  clientId: z.string(),
  email: z.string().email(),
  name: z.string(),
  numberDocument: z.string(),
  position: z.string(),
  telefono: z.string(),

})

type updateClientContactSchemaType = z.infer<typeof updateClientContactSchema>;


export const UpdateClientContact = () => {
  const [updateMutation] = useUpdateClientContactMutation()
  const [setModalStatus, modalStatus] = useShallowGeneralStore(state => [state.setModalStatus, state.modalStatus])

  const contactClientId = modalStatus?.content?.id || ""
  const contactClientData = modalStatus?.content?.data as ClientContact

  const onSubmit = async (data: updateClientContactSchemaType) => {
    try {
      toast.info("Actualizando Contacto...")
      const resMutation = await updateMutation({
        variables: {
          updateInput: {
            id: contactClientId,
            ...data
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Contacto actualizado con exito")

      apolloClient.cache.evict({ fieldName: "clientContacts" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }
  }

  /*
    name
    email

    celular
    numberDocument
    telefono

    clientId
    position
  */

    const defaultData = {
      name: contactClientData?.name,
      email: contactClientData?.email,
      celular: contactClientData?.celular,
      numberDocument: contactClientData?.numberDocument,
      telefono: contactClientData?.client?.telefono,
      clientId: contactClientData?.client?.id,
      position: contactClientData?.position,
    }
  

  return (
    <>
      <DialogHeader>
        Actualizar contacto
      </DialogHeader>

      <BasicFormProviderZod defaultValue={defaultData} submit={onSubmit} schema={updateClientContactSchema}>
        <RowForm>
          <InputForm name='name' label={"Nombre"} />
          <InputForm name='email' label={"Correo electronico"} />
        </RowForm>

        <RowForm>

          {/* <InputForm name='type' label={"Tipo"} /> */}
          {/* <InputForm name='type' label={"Tipo"} /> */}

          <InputForm name='celular' label={"Celular"} />
          <InputForm name='numberDocument' label={"Numero de documento"} />
          <InputForm name='telefono' label={"Telefono"} />

        </RowForm>

        <RowForm>
          {/* <PositionsSelect name="position" placeholder="Selecciona una posicion" /> */}
          <InputForm name='position' label={"Posicion"} />
          <ClientSelect name="clientId" label={"Cliente"} placeholder="Selecciona un cliente" />

        </RowForm>

        <ButtonForm>
          actualizar
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}


