import { Field, FieldGroup } from '@/@types'
import getDefaultValuesAndValidations from './getDefaultValuesAndValidations'

describe('getDefaultValuesAndValidations', () => {
  it('should return empty objects for default values and validations when there are no fields or field groups', () => {
    const fields: (Field | FieldGroup)[] = []
    expect(getDefaultValuesAndValidations(fields)).toEqual([{}, {}])
  })

  it('should return default values and validations for fields', () => {
    const fields: Field[] = [
      {
        name: 'field1',
        type: 'string',
        label: 'Field 1',
        default: 'value1',
        validations: { required: true }
      },
      {
        name: 'field2',
        type: 'string',
        label: 'Field 2',
        default: 'value2',
        validations: { required: true }
      }
    ]
    expect(getDefaultValuesAndValidations(fields)).toEqual([
      {
        field1: 'value1',
        field2: 'value2'
      },
      {
        field1: { required: true, type: 'string' },
        field2: { required: true, type: 'string' }
      }
    ])
  })

  it('should return default values and validations for fields within field groups', () => {
    const fieldGroup: FieldGroup = {
      id: 'group1',
      title: 'Group 1',
      fields: [
        {
          name: 'field3',
          type: 'string',
          label: 'Field 3',
          default: 'value3',
          validations: { required: true }
        },
        {
          name: 'field4',
          type: 'string',
          label: 'Field 4',
          default: 'value4',
          validations: { required: true }
        }
      ]
    }
    const fields: (Field | FieldGroup)[] = [fieldGroup]
    expect(getDefaultValuesAndValidations(fields)).toEqual([
      {
        field3: 'value3',
        field4: 'value4'
      },
      {
        field3: { required: true, type: 'string' },
        field4: { required: true, type: 'string' }
      }
    ])
  })
})
