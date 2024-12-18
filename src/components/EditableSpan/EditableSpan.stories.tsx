import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { EditableSpan } from './EditableSpan'

const meta: Meta<typeof EditableSpan> = {
  title: 'Components/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof EditableSpan>

export const DefaultEditableSpan: Story = {
  args: {
    title: 'Storybook',
    changeValue: fn(),
    sx: {
      typography: {
        cursor: 'pointer',
      },
    },
  },

  render: args => <EditableSpan {...args} />,
}
