/* eslint-disable react/jsx-no-useless-fragment */
import { memo, useEffect, useMemo } from 'react'
import type { Field, FieldComponent, FieldProps } from '@/@types'
import useFieldHidden from '../hooks/useFieldConditions'

interface Props extends FieldProps {
  Component: FieldComponent
  field: Field
  onHiddenChange?: (name: string, isHidden: boolean) => void
}

function WithConditions({
  field,
  onHiddenChange,
  Component
}: Props) {
  const { isDisabled, isHidden } = useFieldHidden({ field })

  useEffect(() => {
    onHiddenChange?.(field.name, isHidden)
  }, [isHidden, onHiddenChange, field.name])

  const fieldWithDisabled = useMemo(() => ({ ...field, disabled: isDisabled }), [field, isDisabled])

  if (isHidden) {
    return null
  }

  return (
    <Component field={fieldWithDisabled} />
  )
}

export default memo(WithConditions)
