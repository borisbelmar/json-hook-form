import { Field, FieldGroup } from '@/@types'

export default function getFlatFields(fields: (Field | FieldGroup)[]) {
  return fields.reduce<Field[]>((acc, groupOrField) => {
    if (!(groupOrField as FieldGroup).fields) {
      return [...acc, groupOrField as Field]
    }
    return [...acc, ...(groupOrField as FieldGroup).fields]
  }, [])
}
