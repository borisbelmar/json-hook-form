/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */

import { renderHook } from '@testing-library/react-hooks'
import { useForm, FormProvider } from 'react-hook-form'
import type { Field } from '@/@types'
import useFieldConditions from './useFieldConditions'

interface WrapperProps {
  children: React.ReactNode
}

const wrapper = ({ children }: WrapperProps) => {
  const formMethods = useForm()
  return <FormProvider {...formMethods}>{children}</FormProvider>
}

describe('useFieldConditions', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    (console.error as unknown as jest.SpyInstance)?.mockRestore()
  })

  const testField: Field = {
    name: 'test',
    type: 'string',
    label: 'Test Field'
  }

  it('should return isHidden and isDisabled as false when no conditions are provided', () => {
    const { result } = renderHook(() => useFieldConditions({ field: testField }), { wrapper })

    expect(result.current.isHidden).toBe(false)
    expect(result.current.isDisabled).toBe(false)
  })

  it('should return isHidden as true when the field is explicitly hidden', () => {
    const hiddenField = { ...testField, hidden: true }
    const { result } = renderHook(() => useFieldConditions({ field: hiddenField }), { wrapper })

    expect(result.current.isHidden).toBe(true)
  })

  it('should return isDisabled as true when the field is explicitly disabled', () => {
    const disabledField = { ...testField, disabled: true }
    const { result } = renderHook(() => useFieldConditions({ field: disabledField }), { wrapper })

    expect(result.current.isDisabled).toBe(true)
  })

  it('should return isHidden as true when the conditions are met', () => {
    const hiddenField: Field = {
      ...testField,
      hidden: [{ field: 'otherField', compare: 'eq', value: 'hide' }]
    }
    const { result } = renderHook(() => useFieldConditions({ field: hiddenField }), {
      wrapper: ({ children }: WrapperProps) => {
        const formMethods = useForm({ defaultValues: { otherField: 'hide' } })
        return <FormProvider {...formMethods}>{children}</FormProvider>
      }
    })

    expect(result.current.isHidden).toBe(true)
  })

  it('should return isDisabled as true when the conditions are met', () => {
    const disabledField: Field = {
      ...testField,
      disabled: [{ field: 'otherField', compare: 'eq', value: 'disable' }]
    }

    const { result } = renderHook(() => useFieldConditions({ field: disabledField }), {
      wrapper: ({ children }: WrapperProps) => {
        const formMethods = useForm({ defaultValues: { otherField: 'disable' } })
        return <FormProvider {...formMethods}>{children}</FormProvider>
      }
    })

    expect(result.current.isDisabled).toBe(true)
  })
})
