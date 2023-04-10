import { useWatch } from 'react-hook-form'

export default function HookFormDebugBox() {
  const formState = useWatch()

  return (
    <div className="fixed bottom-5 right-5 p-4 bg-gray-100 dark:bg-gray-800 rounded-md opacity-25 hover:opacity-75">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Form State
      </h3>
      <pre className="text-xs text-gray-800 dark:text-gray-100">
        {JSON.stringify(formState, null, 2)}
      </pre>
    </div>
  )
}
