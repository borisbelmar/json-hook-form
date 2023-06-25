export type Type = 'string' | 'number' | 'boolean' | 'json' | 'array' | 'date' | 'file'

export type FieldType = 'text' | 'textarea' | 'toggle' | 'select' | 'checkbox' | 'radio' | 'combobox' | string

export interface Option {
  value: unknown
  label: string
  helpText?: string
}

export type Condition = {
  field: string
  value?: unknown
  compare?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'empty' | 'notempty'
  operator?: 'and' | 'or'
}

export type ValidationValue<T = unknown> = {
  value?: T
  ref?: string
  errorMessage?: string
  conditions?: Condition[]
}

export interface ValidationObject {
  required?: ValidationValue<boolean> | boolean
  min?: ValidationValue<number | string> | number | string
  max?: ValidationValue<number | string> | number | string
  email?: ValidationValue<boolean> | boolean
  uri?: ValidationValue<boolean> | boolean
  pattern?: ValidationValue<string> | string
  oneOf?: ValidationValue<string[] | number[] | boolean[]> | string[] | number[] | boolean[]
  ref?: ValidationValue<string> | string
  [x: string]: unknown // For custom validation rules
}

export interface ValidationObjectWithType extends ValidationObject {
  type: Type
}

export type Field = {
  name: string
  type: Type
  label: string
  default?: unknown
  helpText?: string
  validations?: ValidationObject
  fieldType?: FieldType
  textType?: 'text' | 'email' | 'password'
  placeholder?: string
  disabled?: boolean | Condition[]
  hidden?: boolean | Condition[]
  options?: Option[]
  editorLanguage?: 'json' | 'yaml' | 'xml' | 'html' | 'css' | 'javascript' | 'typescript' | 'markdown' | 'plaintext' | 'tsx' | 'jsx'
  fileOptions?: {
    uploadLabel?: string
    uploadHelpText?: string
    accept?: string
    multiple?: boolean
    maxSize?: number
  }
}

export interface FieldGroup {
  id: string
  title?: string
  cols?: number
  separator?: boolean
  fields: Field[]
  hidden?: boolean
}

export type DynamicHookFormClasses = {
  root?: string
  group?: string
  'group:title'?: string
  'group:fields'?: string
  'group:separator'?: string
  [x: string]: string | undefined
}

export type FieldProps = {
  field: Field
}

export type FieldComponent = (props: FieldProps) => JSX.Element

export type FieldCollection = Record<FieldType, FieldComponent>
