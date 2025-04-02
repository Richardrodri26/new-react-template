

import { BasicFormProviderZod, ButtonForm, RowForm } from '@/components'
import { TIPOS_VERTICALES } from '@/components/Utils/vertical'
import { DialogHeader } from '@/components/ui/dialog'
import { ComboboxForm, InputForm, SelectForm, SelectFormInterface } from '@/composables'
import { DepartmentAndMunicipality } from '@/composables/DepartmentAndMunicipality'
import { OrderTypes, TypeClientEnum, useCreateClientMutation, useCreatePresupuestoMutation, useUsersQuery } from '@/domain/graphql'
import { useShallowGeneralStore } from '@/domain/store/general.store'
import { ToastyErrorGraph } from '@/lib/utils'
import { apolloClient } from '@/main.config'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
const regexNit = /^\d{9}-\d$/
const createClientSchema = z.object({
  ano: z.string(),
  mes: z.string(),
  workerId: z.string(),
  valor: z.string(),
  descripcion: z.string().optional(),
})

type createClientSchemaType = z.infer<typeof createClientSchema>;

const currentYear = new Date().getFullYear();
  
// Generar opciones de años (3 años atrás hasta 3 años adelante)
const yearOptions: { key: string; value: string | number }[] = Array.from({ length: 7 }, (_, i) => {
  const year = currentYear - 3 + i;
  return {
    key: year.toString(),
    value: year.toString()
  };
});

// Opciones de meses (1-12 con nombres)
const monthOptions: { key: string; value: string | number }[] = [
  { value: 'Enero', key: '1' },
  { value: 'Febrero', key: '2' },
  { value: 'Marzo', key: '3' },
  { value: 'Abril', key: '4'},
  { value: 'Mayo', key: '5' },
  { value: 'Junio', key: '6' },
  { value: 'Julio', key: '7' },
  { value: 'Agosto', key: '8' },
  { value: 'Septiembre', key: '9' },
  { value: 'Octubre', key: '10' },
  { value: 'Noviembre', key: '11' },
  { value: 'Diciembre', key: '12 '}
];

export const CreateClient = () => {
  const [createClient] = useCreatePresupuestoMutation();
  const [setModalStatus] = useShallowGeneralStore(state => [state.setModalStatus])

  const onSubmit = async (data: createClientSchemaType) => {
    try {
      toast.info("Creando presupuesto...")
      const resMutation = await createClient({
        variables: {
          createInput: {
            ano: +data.ano,
            description: data.descripcion,
            mes: +data.mes,
            valor: +data.valor,
            workerId: data.workerId
          }
        }
      });

      if (resMutation.errors) {
        toast.error("¡Oops, hubo un error")
        return
      }
      toast.success("Presupuesto creado con exito")
      apolloClient.cache.evict({ fieldName: "presupuestos" })
      setModalStatus()
    } catch (error) {
      ToastyErrorGraph(error as any)
    }
  }

  const defaultValue = {
    ano: new Date().getFullYear().toString(), 
    mes: (new Date().getMonth() + 1).toString()
  }

  return (
    <>
      <DialogHeader >
        Crear Presupuesto
      </DialogHeader>

      <BasicFormProviderZod submit={onSubmit} schema={createClientSchema} defaultValue={defaultValue}>
        <RowForm>
          <SelectForm options={monthOptions} name={'mes'} placeholder='Selecciona una mes' label={"Mes"} />
          <SelectForm options={yearOptions} name={'ano'} placeholder='Selecciona una año' label={"Año"} />
          <InputForm name='valor' label={"Valor"} type='number' />
          <UserSelect name="workerId" label={"Usuario"} placeholder="Selecciona un usuario" />
        </RowForm>
        <RowForm>
          <InputForm name='descripcion' label={"Descripcion"} />
        </RowForm>

        <ButtonForm>
          Crear
        </ButtonForm>
      </BasicFormProviderZod>
    </>
  )
}
export const UserSelect = (props: Omit<SelectFormInterface, "options">) => {
  const { data, loading } = useUsersQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 999999
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      }
    }
  })

  const userPositions: {
    key: string;
    value: string | number;
  }[] = data?.users?.map(item => ({ key: item.id, value: item?.name  || ""})) || []

  if (!data && loading) return <></>

  return (
    <SelectForm
      options={userPositions}
      {...props}

    />
  )
}