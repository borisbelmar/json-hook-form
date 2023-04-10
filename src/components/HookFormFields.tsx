import { memo } from 'react'
import type { Field, FieldCollection, FieldGroup } from '@/@types'
import HookFormField from './HookFormField/HookFormField'
import HookFormFieldGroup from './HookFormFieldGroup'

interface Props {
  fieldComponents: FieldCollection
  fields: (FieldGroup | Field)[]
}

function HookFormFields({
  fieldComponents,
  fields
}: Props) {
  return (
    <div className="space-y-6">
      {fields.map(fieldOrGroup => {
        if (
          (fieldOrGroup as FieldGroup).fields
          && (fieldOrGroup as FieldGroup).id
        ) {
          const group = fieldOrGroup as FieldGroup
          return (
            <HookFormFieldGroup
              key={group.id}
              fieldComponents={fieldComponents}
              title={group.title}
              cols={group.cols}
              fields={group.fields}
              separator={group.separator}
            />
          )
        }

        const field = fieldOrGroup as Field
        return (
          <HookFormField
            key={field.name}
            fieldComponents={fieldComponents}
            field={field}
          />
        )
      })}
    </div>
  )
}

export default memo(HookFormFields)
