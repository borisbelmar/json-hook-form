import { useMemo } from 'react'
import { DeepPartial, FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationObjectWithType, yupSchemaGenerator } from '@borisbelmar/yup-schema-generator'
import getDefaultValuesAndValidations from '@/utils/getDefaultValuesAndValidations'
import type { Field, FieldGroup } from '../@types'

type Accumulator = [
  Record<string, unknown>,
  Record<string, ValidationObjectWithType>
]

export default function useDynamicHookForm<T extends FieldValues>(
  fields: (Field | FieldGroup)[]
): UseFormReturn<T> {
  const [
    defaultValues,
    validations
  ]: Accumulator = useMemo(() => getDefaultValuesAndValidations(fields), [fields])

  const schema = useMemo(() => yupSchemaGenerator(validations), [validations])

  const resolver = useMemo(() => yupResolver(schema), [schema])

  const methods = useForm<T>({
    defaultValues: defaultValues as DeepPartial<T>,
    resolver
  })

  return methods
}
