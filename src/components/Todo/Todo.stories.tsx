import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore as createStore } from '@reduxjs/toolkit'

import { tasksReducer } from '../../redux/reducer/tasksReducer'
import { Todo } from './Todo'
import { TTask } from '../../types/todoTypes'

const mockReducer = combineReducers({
  tasks: tasksReducer,
})

const mockStore = createStore(mockReducer)

const meta: Meta<typeof Todo> = {
  title: 'Components/Todo',
  component: Todo,
  decorators: [
    story => (
      <Provider store={mockStore}>
        <div style={{ width: '300px' }}>{story()}</div>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Todo>

const mockTodo: TTask = {
  id: '1',
  title: 'Storybook',
  isDone: false,
}

export const TodoIsNotCompleted: Story = {
  args: {
    todoListId: 'todoList1',
    task: mockTodo,
  },
}

export const TodoIsCompleted: Story = {
  args: {
    task: { ...mockTodo, isDone: true },
  },
}
