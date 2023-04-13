import { render } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import type { Field, FieldCollection, FieldProps } from '@/@types'
import HookFormField from './HookFormField'

const TestComponent = ({ field }: FieldProps) => <div data-testid={field.name}>{field.label}</div>

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

describe('HookFormField', () => {
  it('should render the FieldComponent when no conditions are provided', () => {
    const { getByTestId } = render(
      <HookFormField field={testField} fieldComponents={fieldComponents} />,
      { wrapper }
    )

    expect(getByTestId(testField.name)).toBeInTheDocument()
    expect(getByTestId(testField.name).textContent).toBe(testField.label)
  })

  it('should not render the FieldComponent when the field is explicitly hidden', () => {
    const hiddenField = { ...testField, hidden: true }
    const { queryByTestId } = render(
      <HookFormField field={hiddenField} fieldComponents={fieldComponents} />,
      { wrapper }
    )

    expect(queryByTestId(testField.name)).not.toBeInTheDocument()
  })
})
