import type { FieldCollection, FieldProps } from '@/@types'

interface Props extends FieldProps {
  fieldComponents: FieldCollection
  onHiddenChange?: (name: string, isHidden: boolean) => void
}

const getFieldComponent = ({ field, fieldComponents }: Props) => {
  const type = field.fieldType || 'text'

  const FieldComponent = fieldComponents[type]

  if (!FieldComponent) {
    throw new Error(`Field component for type ${type} not found`)
  }

  return FieldComponent
}

export default getFieldComponent
