import { FieldError } from 'react-hook-form'
import getErrorMessage from './getErrorMessage'

describe('getErrorMessage', () => {
  it('should return undefined when there is no error', () => {
    const errors = {}
    const key = 'field'
    expect(getErrorMessage(errors, key)).toBeUndefined()
  })

  it('should return the error message when it is present', () => {
    const errors: { [key: string]: FieldError } = {
      field: { type: 'required', message: 'Field is required' }
    }
    const key = 'field'
    expect(getErrorMessage(errors, key)).toBe('Field is required')
  })

  it('should return undefined when there is no message for the error', () => {
    const errors: { [key: string]: FieldError } = {
      field: { type: 'required' }
    }
    const key = 'field'
    expect(getErrorMessage(errors, key)).toBeUndefined()
  })
})
