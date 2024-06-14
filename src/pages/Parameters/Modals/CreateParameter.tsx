import { BasicFormProviderZod, ButtonForm, RowForm } from "@/components";
import { DialogHeader } from "@/components/ui/dialog"
import { InputForm, SelectForm } from "@/composables";
import { TypeParameterEnum, useCreateParameterMutation } from "@/domain/graphql";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { toast } from "sonner";
import { z } from "zod";

const createParameterSchema = z.object({
  codigo: z.string(),
  descripcion: z.string(),
  name: z.string(),
  type: z.string(),
})

type createParameterSchemaType = z.infer<typeof createParameterSchema>;

const typeOptions: {
  key: string;
  value: string;
}[] = [
    {
      key: TypeParameterEnum.Date,
      value: "Fecha"
    },
    {
      key: TypeParameterEnum.File,
      value: "Archivo"
    },
    {
      key: TypeParameterEnum.Number,
      value: "Número"
    },
    {
      key: TypeParameterEnum.String,
      value: "Texto"
    },
  ]

export const CreateParameter = () => {
  const [createMutation] = useCreateParameterMutation()
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus])

  const onSubmit = async (data: createParameterSchemaType) => {
    try {
      toast.info("Creando parametro...")
      const resMutation = await createMutation({
        variables: {
          createInput: {
            ...data,
            type: data.type as TypeParameterEnum

          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Parametro creado con exito")

      apolloClient.cache.evict({ fieldName: "parameters" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }
  }

  return (
    <>
      <DialogHeader>
        Crear parameter
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createParameterSchema}>
        <RowForm>
          <InputForm name='codigo' label={"Código"} />
          <InputForm name='name' label={"Nombre"} />
        </RowForm>

        <RowForm>

          {/* <InputForm name='type' label={"Tipo"} /> */}
          {/* <InputForm name='type' label={"Tipo"} /> */}
          <SelectForm name='type' label={"Tipo"} placeholder="Selecciona un tipo" options={ typeOptions} />

          <InputForm name='descripcion' label={"Descripción"} />

        </RowForm>

        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
