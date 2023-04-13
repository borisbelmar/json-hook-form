import useGroup from '@/hooks/useGroup'
import clsx from 'clsx'
import { memo } from 'react'
import type { Field, FieldCollection } from '../@types'
import getTailwindGridByCols from '../utils/getTailwindGridCols'
import HookFormField from './HookFormField/HookFormField'

interface Props {
  title?: string
  cols?: number
  separator?: boolean
  fields: Field[]
  fieldComponents: FieldCollection
}

function HookFormFieldGroup({
  title,
  cols = 1,
  separator,
  fields,
  fieldComponents
}: Props) {
  const { allHidden, onHiddenChange } = useGroup(fields)

  return (
    <div className={clsx(allHidden && 'hidden')}>
      {title && (
        <h3
          className={clsx(
            'text-2xl font-bold mb-4'
          )}
        >
          {title}
        </h3>
      )}
      <ul
        className={clsx(
          'grid gap-4',
          getTailwindGridByCols(cols)
        )}
      >
        {fields.map(field => (
          <HookFormField
            key={field.name}
            fieldComponents={fieldComponents}
            field={field}
            onHiddenChange={onHiddenChange}
          />
        ))}
      </ul>
      {separator && (
        <hr
          className={clsx('my-8 opacity-50')}
        />
      )}
    </div>
  )
}

export default memo(HookFormFieldGroup)
