import { useFormContext, useWatch } from 'react-hook-form'
import { checkConditions } from '@borisbelmar/yup-schema-generator'
import type { Condition, Field } from '@/@types'

interface Props {
  field: Field
}

const EMPTY_ARRAY: Condition[] = []

export default function useFieldConditions({ field }: Props) {
  const { control } = useFormContext()
  const hidden = Array.isArray(field.hidden) ? field.hidden as Condition[] : EMPTY_ARRAY
  const disabled = Array.isArray(field.disabled) ? field.disabled as Condition[] : EMPTY_ARRAY

  const fieldValues = useWatch({
    control
  })

  const isHidden = field.hidden === true
    ? true
    : checkConditions({
      conditions: hidden,
      parent: fieldValues
    })

  const isDisabled = field.disabled === true
    ? true
    : checkConditions({
      conditions: disabled,
      parent: fieldValues
    })

  return {
    isHidden,
    isDisabled
  }
}
