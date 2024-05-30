import { useState } from 'react'

import { TodoList } from './TodoList'
import './App.css'

export type TTask = {
  id: number
  title: string
  isDone: boolean
}

export enum FilteredValues {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

const data: Array<TTask> = [
  { id: 1, title: 'HTML & CSS', isDone: true },
  { id: 2, title: 'JS/TS', isDone: true },
  { id: 3, title: 'ReactJS', isDone: false },
]

export function App() {
  const [tasks, setTasks] = useState(data)
  const [valueForFilter, setValueForFilter] = useState(FilteredValues.all)
  let filteredTasks = tasks

  if (valueForFilter == FilteredValues.active) {
    filteredTasks = tasks.filter(task => !task.isDone)
  } else if (valueForFilter == FilteredValues.completed) {
    filteredTasks = tasks.filter(task => task.isDone)
  }

  function removeTask(id: number) {
    const updatedTasks = tasks.filter(item => item.id !== id)
    setTasks(updatedTasks)
  }

  function changeValueForFilter(value: FilteredValues) {
    setValueForFilter(value)
  }

  return (
    <div className="app">
      <TodoList
        title={'What to learn'}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeValueForFilter={changeValueForFilter}
      />
    </div>
  )
}
