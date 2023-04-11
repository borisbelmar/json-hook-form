import type { Field, FieldCollection, FieldComponent } from '@/@types'
import getFieldComponent from './getFieldComponent'

describe('getFieldComponent', () => {
  const dummyComponentText = (() => null) as unknown as FieldComponent
  const dummyComponentNumber = (() => null) as unknown as FieldComponent

  const fieldComponents: FieldCollection = {
    text: dummyComponentText,
    number: dummyComponentNumber
  }

  const defaultField: Field = {
    name: 'test',
    type: 'string',
    label: 'Test'
  }

  it('should return the correct FieldComponent for a given fieldType', () => {
    const field: Field = {
      ...defaultField,
      fieldType: 'number'
    }

    const result = getFieldComponent({ field, fieldComponents })
    expect(result).toBe(dummyComponentNumber)
  })

  it('should return the correct FieldComponent for a default fieldType', () => {
    const field: Field = {
      ...defaultField
    }

    const result = getFieldComponent({ field, fieldComponents })
    expect(result).toBe(dummyComponentText)
  })

  it('should throw an error when FieldComponent for a given fieldType is not found', () => {
    const field: Field = {
      ...defaultField,
      fieldType: 'unknown'
    }

    expect(() => getFieldComponent({ field, fieldComponents })).toThrowError(
      'Field component for type unknown not found'
    )
  })
})
