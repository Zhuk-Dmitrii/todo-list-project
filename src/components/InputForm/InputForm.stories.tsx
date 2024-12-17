import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { InputForm } from './InputForm'

const meta: Meta<typeof InputForm> = {
  title: 'Components/InputForm',
  component: InputForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InputForm>

export const SmallInputForm: Story = {
  args: {
    size: 'small',
    createItem: fn(),
  },

  render: args => <InputForm {...args} />,
}
