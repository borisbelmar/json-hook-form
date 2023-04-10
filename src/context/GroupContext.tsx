import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { Field } from '@/@types'

interface GroupContextValue {
  allHidden: boolean
  onHiddenChange: (name: string, hidden: boolean) => void
}

const GroupContext = createContext<GroupContextValue | null>(null)

interface GroupProviderProps {
  children: React.ReactNode
  fields: Field[]
}

export function GroupProvider({ fields, children }: GroupProviderProps) {
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

  const value = useMemo(() => ({ allHidden, onHiddenChange }), [allHidden, onHiddenChange])

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  )
}

export function useGroup() {
  const contex = useContext(GroupContext)

  if (!contex) {
    throw new Error('useGroup must be used within a GroupProvider')
  }

  return contex
}
