import { Field, FieldGroup } from '@/@types'
import { ValidationObjectWithType } from '@borisbelmar/yup-schema-generator'
import getFlatFields from './getFlatFields'

export default function getDefaultValuesAndValidations(
  fields: (Field | FieldGroup)[]
): [
  Record<string, unknown>,
  Record<string, ValidationObjectWithType>
] {
  return getFlatFields(fields).reduce((acc, field) => ([
    {
      ...acc[0],
      [field.name]: field.default
    },
    {
      ...acc[1],
      [field.name]: field.validations
        ? { ...field.validations, type: field.type }
        : { type: field.type }
    }
  ]), [{}, {}])
}
