import { Field, FieldGroup } from '@/@types'
import getFlatFields from './getFlatFields'

describe('getFlatFields', () => {
  it('should return an empty array when there are no fields or field groups', () => {
    const fields: (Field | FieldGroup)[] = []
    expect(getFlatFields(fields)).toEqual([])
  })

  it('should return the same array when there are no field groups', () => {
    const fields: Field[] = [
      { name: 'field1', type: 'string', label: 'Field 1' },
      { name: 'field2', type: 'string', label: 'Field 2' }
    ]
    expect(getFlatFields(fields)).toEqual(fields)
  })

  it('should flatten fields from field groups', () => {
    const field1: Field = { name: 'field1', type: 'string', label: 'Field 1' }
    const field2: Field = { name: 'field2', type: 'string', label: 'Field 2' }
    const fieldGroup: FieldGroup = {
      id: 'group1',
      title: 'Group 1',
      fields: [
        { name: 'field3', type: 'string', label: 'Field 3' },
        { name: 'field4', type: 'string', label: 'Field 4' }
      ]
    }
    const fields: (Field | FieldGroup)[] = [field1, field2, fieldGroup]
    expect(getFlatFields(fields)).toEqual([
      field1,
      field2,
      ...fieldGroup.fields
    ])
  })
})
