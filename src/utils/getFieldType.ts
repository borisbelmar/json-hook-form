import { FieldType, Type } from '@/@types'

const fieldTypeByType: Record<Type, FieldType> = {
  array: 'checkbox',
  boolean: 'toggle',
  string: 'text',
  number: 'text',
  json: 'text',
  date: 'text',
  file: 'text'
}

export default function getFieldType(type: Type, fieldType?: FieldType): FieldType {
  if (fieldType) {
    return fieldType
  }

  return fieldTypeByType[type] || 'text'
}
