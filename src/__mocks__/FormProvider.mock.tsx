/* eslint-disable @typescript-eslint/ban-types */
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  children: React.ReactNode
  defaultValues?: { [key: string]: {} }
}

const FormProviderMock = ({ children, defaultValues }: Props) => {
  const values = useForm({
    defaultValues
  })
  return (
    <FormProvider {...values}>
      {children}
    </FormProvider>
  )
}

export default FormProviderMock
