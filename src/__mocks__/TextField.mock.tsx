import { FieldProps } from '@/@types'
import { useFormContext } from 'react-hook-form'

export default function TextFieldMock({ field }: FieldProps) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label className="block">
        {field.label}
      </label>
      <input
        {...register(field.name)}
        type={field.textType || 'text'}
        placeholder={field.placeholder}
        className="border border-gray-300 rounded-md block"
      />
    </div>
  )
}
