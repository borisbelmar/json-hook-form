import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import type { FieldCollection, FieldProps } from '@/@types'
import getFieldComponent from '../utils/getFieldComponent'

interface Props extends FieldProps {
  fieldComponents: FieldCollection
  onHiddenChange?: (name: string, isHidden: boolean) => void
}

export default function useHookFormField({
  fieldComponents,
  onHiddenChange,
  field
}: Props) {
  const { formState: { errors } } = useFormContext()

  const isDirectHiddenAndHasNoErrors = field.hidden === true && !errors[field.name]
  const hasConditions = (
    Array.isArray(field.hidden) || Array.isArray(field.disabled)
  )
  const hasConditionsWithoutErrors = hasConditions && !errors[field.name]
  const isNotHiddenOrHasErrors = !field.hidden || errors[field.name]

  useEffect(() => {
    if (isDirectHiddenAndHasNoErrors) {
      onHiddenChange?.(field.name, true)
    } else if (isNotHiddenOrHasErrors) {
      onHiddenChange?.(field.name, false)
    }
  }, [field.name, isDirectHiddenAndHasNoErrors, isNotHiddenOrHasErrors, onHiddenChange])

  const FieldComponent = getFieldComponent({ field, fieldComponents })

  return {
    FieldComponent,
    hasConditionsWithoutErrors,
    isNotHiddenOrHasErrors,
    isDirectHiddenAndHasNoErrors
  }
}
