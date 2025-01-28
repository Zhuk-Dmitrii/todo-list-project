import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import { tasksReducer } from '../../redux/reducer/tasksReducer'
import { todoListsReducer } from '../../redux/reducer/todoListsReducer'
import { App } from './App'

const mockReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
})

const mockStore = createStore(mockReducer, applyMiddleware(thunk))

const meta: Meta<typeof App> = {
  title: 'Components/App',
  component: App,
  decorators: [story => <Provider store={mockStore}>{story()}</Provider>],
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof App>

export const DefaultApp: Story = {}
