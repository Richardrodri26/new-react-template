import { BasicFormProviderZod, ButtonForm, RowForm } from "@/components";
import { DialogHeader } from "@/components/ui/dialog"
import { InputForm, SelectForm, SelectFormInterface } from "@/composables";
import { TypeParameterEnum, useClientsOptionsQuery, useCreateClientContactMutation, useCreateParameterMutation, usePositionsQuery } from "@/domain/graphql";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { toast } from "sonner";
import { z } from "zod";

export const createClientContactSchema = z.object({

  celular: z.string(),
  email: z.string().email(),
  name: z.string(),
  position: z.string(),
  telefono: z.string(),

})

export type createClientContactSchemaType = z.infer<typeof createClientContactSchema>;


export const CreateClientContact = ({id}: {id: string}) => {
  const [createMutation] = useCreateClientContactMutation()
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus])

  const onSubmit = async (data: createClientContactSchemaType) => {
    try {
      toast.info("Creando Contacto...")
      const resMutation = await createMutation({
        variables: {
          createInput: {
            ...data,
            clientId: id
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

  /*
    name
    email

    celular
    numberDocument
    telefono

    clientId
    position
  */

  return (
    <>
      <DialogHeader>
        Crear contacto
      </DialogHeader>

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
          <InputForm name='position' label={"Cargo"} />

        </RowForm>

        <RowForm>
          {/* <PositionsSelect name="position" placeholder="Selecciona una posicion" /> */}

          {/* <ClientSelect name="clientId" label={"Cliente"} placeholder="Selecciona un cliente" /> */}

        </RowForm>

        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}



export const PositionsSelect = (props: Omit<SelectFormInterface, "options">) => {
  const { data, loading } = usePositionsQuery()

  const optionsPositions: {
    key: string;
    value: string | number;
  }[] = data?.positions?.map(item => ({ key: item.id, value: item.name })) || []

  if (!data && loading) return <></>

  return (
    <SelectForm
      options={optionsPositions}
      {...props}

    />
  )
}

export const ClientSelect = (props: Omit<SelectFormInterface, "options">) => {
  const { data, loading } = useClientsOptionsQuery()

  const clientsPositions: {
    key: string;
    value: string | number;
  }[] = data?.clients?.map(item => ({ key: item.id, value: item.name })) || []

  if (!data && loading) return <></>

  return (
    <SelectForm
      options={clientsPositions}
      {...props}

    />
  )
}