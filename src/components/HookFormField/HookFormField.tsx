/* eslint-disable react/jsx-no-useless-fragment */
import { memo } from 'react'
import type { FieldCollection, FieldProps } from '@/@types'
import WithConditions from './components/WithConditions'
import useHookFormField from './hooks/useHookFormField'

interface Props extends FieldProps {
  fieldComponents: FieldCollection
  onHiddenChange?: (name: string, isHidden: boolean) => void
}

function HookFormField({
  field,
  fieldComponents,
  onHiddenChange
}: Props) {
  const {
    FieldComponent,
    hasConditionsWithoutErrors,
    isNotHiddenOrHasErrors,
    isDirectHiddenAndHasNoErrors
  } = useHookFormField({ field, fieldComponents, onHiddenChange })

  if (isDirectHiddenAndHasNoErrors) {
    return null
  }

  if (hasConditionsWithoutErrors) {
    return (
      <WithConditions
        field={field}
        onHiddenChange={onHiddenChange}
        Component={FieldComponent}
      />
    )
  }

  if (isNotHiddenOrHasErrors) {
    return (
      <FieldComponent
        field={field}
      />
    )
  }

  return null
}

export default memo(HookFormField)
