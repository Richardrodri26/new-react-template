import React, { useState, useEffect } from 'react';
import { BasicFormProviderZod, ButtonForm, RowForm } from "@/components";
import { DialogHeader } from "@/components/ui/dialog"
import { InputDateForm, InputForm, SelectForm } from "@/composables";
import { TypeParameterEnum, useCreateMarcaProyectoMutation, useCreateParameterMutation, useCreateTipoProyectoMutation } from "@/domain/graphql";
import { useShallowGeneralStore } from "@/domain/store/general.store";
import { toast } from "sonner";
import { z } from "zod";
import { apolloClient } from "@/main.config";
import { ToastyErrorGraph } from '@/lib/utils';

// Define un esquema base para la creación de parámetros
const createParameterSchema = z.object({
  name: z.string(),
  // descripcion: z.string(),
});

// Tipo para inferir el esquema de creación
type CreateParameterSchemaType = z.infer<typeof createParameterSchema>;

export const CreateParameter = () => {
  const [createMutation] = useCreateMarcaProyectoMutation();
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus]);
  const onSubmit = async (data: CreateParameterSchemaType) => {
    try {
      toast.info("Creando marca de proyecto...");

      const resMutation = await createMutation({
        variables: {
          createInput: {
            nombre: data.name
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error!");
        return;
      }

      toast.success("Marca de proyecto creado con éxito");

      // Limpiar la caché después de crear el parámetro (si es necesario)
      apolloClient.cache.evict({ fieldName: "marcaProyectos" });

      setModalStatus(); // Cerrar el modal después de la creación exitosa

    } catch (error) {
      console.error('Error creando parámetro:', error);
      // Manejo de errores con Toast o mensaje de error específico
      ToastyErrorGraph(error as any);
    }
  };

  // Renderizar el formulario
  return (
    <>
      <DialogHeader>
        Crear marca de proyecto
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createParameterSchema}>
        <RowForm>
          <InputForm name='name' label={"Nombre"} />
        </RowForm>
        {/* <RowForm>
          <InputForm name='descripcion' label={"Descripción"} />
        </RowForm> */}
        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  );
};
