/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import { renderHook } from '@testing-library/react-hooks'
import { useForm, FormProvider } from 'react-hook-form'
import type { Field, FieldCollection, FieldComponent } from '@/@types'
import useHookFormField from './useHookFormField'

const TestComponent = (() => null) as unknown as FieldComponent

const fieldComponents: FieldCollection = {
  text: TestComponent
}

interface WrapperProps {
  children: React.ReactNode
}

const wrapper = ({ children }: WrapperProps) => {
  const formMethods = useForm()
  return <FormProvider {...formMethods}>{children}</FormProvider>
}

const testField: Field = {
  name: 'test',
  type: 'string',
  label: 'Test Field'
}

describe('useHookFormField', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    (console.error as unknown as jest.SpyInstance)?.mockRestore()
  })

  it('should return FieldComponent and initial values when no conditions are provided', () => {
    const { result } = renderHook(
      () => useHookFormField({ field: testField, fieldComponents }),
      { wrapper }
    )

    expect(result.current.FieldComponent).toBe(TestComponent)
    expect(result.current.hasConditionsWithoutErrors).toBe(false)
    expect(result.current.isNotHiddenOrHasErrors).toBe(true)
    expect(result.current.isDirectHiddenAndHasNoErrors).toBe(false)
  })

  it('should return isDirectHiddenAndHasNoErrors as true when the field is explicitly hidden and has no errors', () => {
    const hiddenField = { ...testField, hidden: true }
    const { result } = renderHook(
      () => useHookFormField({ field: hiddenField, fieldComponents }),
      { wrapper }
    )

    expect(result.current.isDirectHiddenAndHasNoErrors).toBe(true)
  })

  it('should return hasConditionsWithoutErrors as true when the field has conditions and no errors', () => {
    const conditionalField: Field = {
      ...testField,
      hidden: [{ field: 'otherField', compare: 'eq', value: 'hide' }],
      disabled: [{ field: 'otherField', compare: 'eq', value: 'disable' }]
    }
    const { result } = renderHook(
      () => useHookFormField({ field: conditionalField, fieldComponents }),
      { wrapper }
    )

    expect(result.current.hasConditionsWithoutErrors).toBe(true)
  })

  it('should return isNotHiddenOrHasErrors as false when the field is hidden and has errors', () => {
    const hiddenFieldWithError = { ...testField, hidden: true }
    const { result } = renderHook(
      () => useHookFormField({
        field: hiddenFieldWithError,
        fieldComponents,
        onHiddenChange: () => {}
      }),
      {
        wrapper: ({ children }: WrapperProps) => {
          const formMethods = useForm({
            defaultValues: { test: '' },
            mode: 'onChange'
          })
          formMethods.setError('test', { type: 'required', message: 'Required field' })
          return <FormProvider {...formMethods}>{children}</FormProvider>
        }
      }
    )

    expect(result.current.isNotHiddenOrHasErrors).toBeFalsy()
  })
})
