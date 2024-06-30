import React, { useState, useEffect } from 'react';
import { BasicFormProviderZod, ButtonForm, RowForm } from "@/components";
import { DialogHeader } from "@/components/ui/dialog"
import { InputDateForm, InputForm, SelectForm } from "@/composables";
import { TypeParameterEnum, useCreateParameterMutation } from "@/domain/graphql";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { toast } from "sonner";
import { z } from "zod";
import { apolloClient } from "@/main.config";

// Define un esquema base para la creación de parámetros
const createParameterSchema = z.object({
  codigo: z.string(),
  descripcion: z.string(),
  name: z.string(),
  type: z.string(),
  valueInt: z.string().optional(),
  valueString: z.string().optional(),
  valueDate: z.date().optional(),
});

// Tipo para inferir el esquema de creación
type CreateParameterSchemaType = z.infer<typeof createParameterSchema>;

// Opciones disponibles para el tipo de parámetro
const typeOptions = [
  {
    key: TypeParameterEnum.Date,
    value: "Fecha"
  },
  // {
  //   key: TypeParameterEnum.File,
  //   value: "Archivo"
  // },
  {
    key: TypeParameterEnum.Number,
    value: "Número"
  },
  {
    key: TypeParameterEnum.String,
    value: "Texto"
  },
];

export const CreateParameter = () => {
  const [createMutation] = useCreateParameterMutation();
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);
  const [type, setType] = useState<TypeParameterEnum | ''>(''); // Estado para almacenar el tipo seleccionado

  const onSubmit = async (data: CreateParameterSchemaType) => {
    try {
      toast.info("Creando parámetro...");

      // Crear un objeto para enviar al backend
      const createInput: any = {
        ...data,
        valueInt: data.valueInt ? +data.valueInt : undefined,
        type: data.type as TypeParameterEnum,
      };

      const resMutation = await createMutation({
        variables: {
          createInput,
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error!");
        return;
      }

      toast.success("Parámetro creado con éxito");

      // Limpiar la caché después de crear el parámetro (si es necesario)
      apolloClient.cache.evict({ fieldName: "parameters" });

      setModalStatus(); // Cerrar el modal después de la creación exitosa

    } catch (error) {
      console.error('Error creando parámetro:', error);
      // Manejo de errores con Toast o mensaje de error específico
      // ToastyErrorGraph(error as any);
    }
  };

  // Renderizar el formulario
  return (
    <>
      <DialogHeader>
        Crear parámetro
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createParameterSchema}>
        <RowForm>
          <InputForm name='codigo' label={"Código"} />
          <InputForm name='name' label={"Nombre"} />
        </RowForm>

        <RowForm>
          <SelectForm
            name='type'
            label={"Tipo"}
            placeholder="Selecciona un tipo"
            options={typeOptions}
            onChange={(value) => setType(value as TypeParameterEnum)}
          />
          <InputForm name='descripcion' label={"Descripción"} />
          {/* Ejemplo de campo condicional para 'Número' */}

        </RowForm>

        <RowForm>
          <InputForm name='valueInt' label={"Valor Número"} type='number' />
          <InputForm name='valueString' label={"Valor Texto"} />
          <InputDateForm name='valueDate' label={"Valor Fecha"} />
        </RowForm>

        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  );
};
