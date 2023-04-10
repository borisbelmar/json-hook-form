import { FieldErrors } from 'react-hook-form'

export default function getErrorMessage(
  errors: FieldErrors,
  key: string
) {
  const error = errors[key]
  if (!error) {
    return undefined
  }

  const message = error?.message

  if (message) {
    return message
  }

  return Object.values(error)?.[0]?.message
}
