import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Field } from '../@types'

export default function useHiddenFields(fields: Field[]) {
  const [hiddenFields, setHiddenFields] = useState<Set<string>>(new Set())
  const { formState: { errors } } = useFormContext()

  const totalFields = fields.length

  const handleHiddenChange = useCallback((name: string, isHidden: boolean) => {
    setHiddenFields(prev => {
      const newSet = new Set(prev)
      if (isHidden) {
        newSet.add(name)
      } else {
        newSet.delete(name)
      }
      return newSet
    })
  }, [])

  const hasErrors = Array.from(hiddenFields).some(name => errors[name])

  return {
    allHidden: hiddenFields.size === totalFields && !hasErrors,
    handleHiddenChange
  }
}
