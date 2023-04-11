import { Field } from '@/@types'
import FormProviderMock from '@/__mocks__/FormProvider.mock'
import TextFieldMock from '@/__mocks__/TextField.mock'
import type { Meta, StoryObj } from '@storybook/react'

import WithConditions from './WithConditions'

const mockField: Field = {
  name: 'testField',
  type: 'string',
  label: 'Test Field',
  placeholder: 'Test Field',
  hidden: false
}

const meta: Meta<typeof WithConditions> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'WithConditions',
  component: WithConditions,
  decorators: [
    Story => (
      <FormProviderMock>
        <Story />
      </FormProviderMock>
    )
  ],
  argTypes: {
    Component: {
      table: {
        disable: true
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof WithConditions>

/*
 *👇 Render functions are a framework specific feature
 * to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const WithNotHiddenComponent: Story = {
  args: {
    field: mockField
  },
  render: ({ field }) => (
    <WithConditions field={field} Component={TextFieldMock} />
  )
}

export const WithHiddenComponent: Story = {
  args: {
    field: {
      ...mockField,
      hidden: true
    }
  },
  render: ({ field }) => (
    <WithConditions field={field} Component={TextFieldMock} />
  )
}

export const WithHiddenConditions: Story = {
  args: {
    field: {
      ...mockField,
      hidden: [
        {
          field: 'testField2',
          compare: 'eq',
          value: 'test'
        }
      ]
    }
  },
  render: ({ field }) => (
    <div className="space-y-2">
      <TextFieldMock field={{ name: 'testField2', label: 'Test Field 2', type: 'string', placeholder: 'Write "test" to hide ' }} />
      <WithConditions field={field} Component={TextFieldMock} />
    </div>
  )
}
