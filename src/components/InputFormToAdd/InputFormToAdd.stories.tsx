import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { InputFormToAdd } from './InputFormToAdd'

const meta: Meta<typeof InputFormToAdd> = {
  title: 'Components/InputForm',
  component: InputFormToAdd,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InputFormToAdd>

export const SmallInputFormToAdd: Story = {
  args: {
    size: 'small',
    createItem: fn(),
  },

  render: args => <InputFormToAdd {...args} />,
}
