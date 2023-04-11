import { render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Field } from '@/@types'
import WithConditions from './WithConditions'

const testField: Field = {
  name: 'testField',
  type: 'string',
  label: 'Test Field'
}

const TestComponent = ({ field }: { field: Field }) => <div>{field.label}</div>
const TestFormProvider = ({ children }: { children: React.ReactNode }) => {
  const values = useForm()
  return (
    <FormProvider {...values}>
      {children}
    </FormProvider>
  )
}

describe('WithConditions', () => {
  it('renders the wrapped component when not hidden', () => {
    render(
      <TestFormProvider>
        <WithConditions field={testField} Component={TestComponent} />
      </TestFormProvider>
    )
    expect(screen.getByText('Test Field')).toBeInTheDocument()
  })

  it('does not render the wrapped component when hidden', () => {
    const hiddenField: Field = {
      ...testField,
      hidden: true
    }
    render(
      <TestFormProvider>
        <WithConditions field={hiddenField} Component={TestComponent} />
      </TestFormProvider>
    )
    expect(screen.queryByText('Test Field')).not.toBeInTheDocument()
  })

  it('calls onHiddenChange when isHidden changes', () => {
    const onHiddenChange = jest.fn()
    const hiddenField: Field = {
      ...testField,
      hidden: true
    }
    const { rerender } = render(
      <TestFormProvider>
        <WithConditions
          field={hiddenField}
          Component={TestComponent}
          onHiddenChange={onHiddenChange}
        />
      </TestFormProvider>
    )

    rerender(
      <TestFormProvider>
        <WithConditions
          field={testField}
          Component={TestComponent}
          onHiddenChange={onHiddenChange}
        />
      </TestFormProvider>
    )

    expect(onHiddenChange).toHaveBeenCalledTimes(2)
    expect(onHiddenChange).toHaveBeenCalledWith('testField', false)
  })
})
