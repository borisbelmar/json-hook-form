import { memo } from 'react'
import { FieldValues, FormProvider } from 'react-hook-form'
import type { Field, FieldCollection, FieldGroup } from '../@types'
import useDynamicHookForm from '../hooks/useDynamicHookForm'
import HookFormFields from './HookFormFields'
import HookFormDebugBox from './HookFormDebugBox'

interface Props {
  fieldComponents: FieldCollection
  fields: (FieldGroup | Field)[]
  onSubmit: (data: FieldValues) => void
  debug?: boolean
}

function HookForm({
  fieldComponents,
  fields,
  onSubmit,
  debug = false
}: Props) {
  const methods = useDynamicHookForm(
    fields
  )

  return (
    <FormProvider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...methods}
    >
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <HookFormFields
          fieldComponents={fieldComponents}
          fields={fields}
        />
        <div className="flex gap-2 pt-8">
          <button
            type="submit"
            className="rounded-md bg-primary-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => methods.reset()}
            className="rounded-md bg-white/10 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
            Reset
          </button>
        </div>
        {debug && (
          <HookFormDebugBox />
        )}
      </form>
    </FormProvider>
  )
}

export default memo(HookForm)
