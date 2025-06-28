
import { BasicFormProviderZod, ButtonForm, RowForm } from "@/components";
import { DialogHeader } from "@/components/ui/dialog"
import { InputDateForm, InputForm, SelectForm } from "@/composables";
import { TypeParameterEnum, useCreateParameterMutation, useUpdateParameterMutation } from "@/domain/graphql";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { ToastyErrorGraph } from "@/lib/utils";
import { apolloClient } from "@/main.config";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const createParameterSchema = z.object({
  codigo: z.string(),
  descripcion: z.string(),
  name: z.string(),
  type: z.string(),
  valueInt: z.string().optional(),
  valueString: z.string().optional(),
  valueDate: z.date().optional(),
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

export const UpdateParameter = () => {
  const [updateMutation] = useUpdateParameterMutation()
  const [setModalStatus, modalStatus] = useShallowGeneralStore(state => [state.setModalStatus, state.modalStatus])
  
  const parameterId = modalStatus?.content?.id
  const parameterData = modalStatus?.content?.data

  const defaultData = {
    codigo: parameterData?.codigo,
    descripcion: parameterData?.descripcion,
    name: parameterData?.name,
    type: parameterData?.type,
    valueInt: "" +parameterData?.valueInt,
    valueString: parameterData?.valueString || "",
    valueDate: new Date(parameterData?.valueDate) || new Date()
  }
  const [type, setType] = useState<TypeParameterEnum | ''>(defaultData.type as TypeParameterEnum); // Estado para almacenar el tipo seleccionado

  const onSubmit = async (data: createParameterSchemaType) => {
    try {
      toast.info("Actualizando parametro...")
      const resMutation = await updateMutation({
        variables: {
          updateInput: {
            ...data,
            valueInt: data.valueInt ? +data.valueInt : undefined,
            valueDate: data.valueDate ? data.valueDate : undefined,
            valueString: data.valueString ? data.valueString : undefined,
            id: parameterId || "",
            type: data.type as TypeParameterEnum
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }

      toast.success("Parametro actualizado con exito")

      apolloClient.cache.evict({ fieldName: "parameters" })

      setModalStatus()


    } catch (error) {
      ToastyErrorGraph(error as any)
    }
  }

  return (
    <>
      <DialogHeader>
        Actualizar parametro
      </DialogHeader>

      <BasicFormProviderZod defaultValue={defaultData} submit={onSubmit} schema={createParameterSchema}>
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
        <RowForm>
            <InputForm name='valueInt' label={"Valor Número"} type="number"/>
            <InputForm name='valueString' label={"Valor Texto"} />
            <InputDateForm name='valueDate' label={"Valor Fecha"} />
        </RowForm>

        <ButtonForm>
          Actualizar
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
