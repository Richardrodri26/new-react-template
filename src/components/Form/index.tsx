import { yupResolver } from '@hookform/resolvers/yup';
import { DeepPartial, FieldErrors, FormProvider, useForm, UseFormReturn, DefaultValues, SubmitErrorHandler, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { HTMLAttributes } from 'react';
import { Form } from '../ui/form';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '../ui/button';

interface ISubmitModulesFormYup<T> {
  children: React.ReactNode;
  schema?: yup.ObjectSchema<DeepPartial<T>>;
  submit?: (data: T, methods?: UseFormReturn<DeepPartial<T>, any, any>) => void;
  onError?: (handler: FieldErrors<any>) => void;
  defaultValue?: any;
  values?: any;
  className?: string;
}
// million-ignore
export function BasicFormProviderYup<T>({ children, submit, onError, defaultValue, values, schema, className }: ISubmitModulesFormYup<T>) {
  // hooks
  const currentMethods = useForm({
    defaultValues: defaultValue ?? {},
    values: values,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: schema ? yupResolver(schema) : undefined,
  });

  return (
    <form onSubmit={submit ? currentMethods.handleSubmit(data => submit(data), onError) : undefined} className={className}>
      <FormProvider {...currentMethods}>{children}</FormProvider>
    </form>
  );
}

// Definimos un tipo auxiliar para DeepPartial que trabaje mejor con Zod
type DeepPartialWithZod<T extends z.ZodObject<any, any>> = {
    [K in keyof T]?: T[K] extends z.ZodObject<any, any> ? DeepPartialWithZod<T[K]> : T[K];
  };
  
  interface ISubmitModulesFormZod<T extends z.ZodObject<any, any> = z.ZodObject<any, any>> {
    children: React.ReactNode;
    schema?: T;
    submit?: (data: T['_input']) => void;
    onError?: SubmitErrorHandler<DeepPartialWithZod<T>>; // Ajustamos el tipo de la función de manejo de errores
    defaultValue?: DefaultValues<DeepPartialWithZod<T>>;
    values?: any;
    className?: string;
  }
  
  export function BasicFormProviderZod<T extends z.ZodObject<any, any>>({ children, submit, onError, defaultValue, values, schema, className = 'p-10' }: ISubmitModulesFormZod<T>) {
    // hooks
    const currentMethods = useForm({
      defaultValues: defaultValue,
      mode: 'onTouched',
      reValidateMode: 'onChange',
      resolver: schema ? zodResolver(schema) : undefined,
    });
  
    return (
      <form onSubmit={submit ? currentMethods.handleSubmit(data => submit(data), onError) : undefined} className={className}>
        {/* <FormProvider {...currentMethods}>{children}</FormProvider> */}
        <Form  {...currentMethods}>
          {children}
        </Form>
      </form>
    );
  }

  export const RowForm = (props: HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn('mb-2.5 flex w-full flex-1 gap-2.5', props.className)} {...props} />;
  };

  export const ButtonForm = ({ ...rest }: ButtonProps) => {
    const { formState: { isValid } } = useFormContext()
    return (
      <Button disabled={!isValid} {...rest}  />
    )
  }