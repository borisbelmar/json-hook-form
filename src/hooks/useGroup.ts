import { Field } from '@/@types'
import { useCallback, useRef, useState } from 'react'

export default function useGroup(fields: Field[]) {
  const hiddenFieldsRef = useRef<Set<string>>(new Set())
  const [allHidden, setAllHidden] = useState(false)

  const onHiddenChange = useCallback((name: string, hidden: boolean) => {
    if (typeof window === 'undefined') {
      return
    }
    if (hidden) {
      hiddenFieldsRef.current.add(name)
    } else {
      hiddenFieldsRef.current.delete(name)
    }

    const allFieldsHidden = fields.length === hiddenFieldsRef.current.size

    setAllHidden(allFieldsHidden)
  }, [fields])

  return {
    allHidden,
    onHiddenChange
  }
}
