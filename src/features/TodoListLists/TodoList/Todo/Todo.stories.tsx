import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore as createStore } from '@reduxjs/toolkit'

import { tasksReducer } from '../../../../app/redux/reducer/tasksReducer'
import { Todo } from './Todo'
import { TaskPriority, TaskStatus, TaskType } from '../../../../api/typesAPI/todoListTypes'

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

const mockTodo: TaskType = {
  id: '1',
  title: 'Storybook',
  status: TaskStatus.New,
  priority: TaskPriority.Low,
  order: 0,
  todoListId: 'todoList1',
  addedDate: '',
  deadline: '',
  description: '',
  startDate: '',
}

export const TodoIsNotCompleted: Story = {
  args: {
    todoListId: mockTodo.todoListId,
    task: mockTodo,
  },
}

export const TodoIsCompleted: Story = {
  args: {
    task: { ...mockTodo, status: TaskStatus.Completed },
  },
}
