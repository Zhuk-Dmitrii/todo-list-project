import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { InputToAdd } from './InputToAdd'

const meta: Meta<typeof InputToAdd> = {
  title: 'Components/InputForm',
  component: InputToAdd,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InputToAdd>

export const SmallInputToAdd: Story = {
  args: {
    size: 'small',
    createItem: fn(),
  },

  render: args => <InputToAdd {...args} />,
}
