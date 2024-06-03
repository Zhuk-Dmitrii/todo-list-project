import { useState } from 'react'

import { TodoList } from './TodoList'
import './App.css'

export type TTask = {
  id: string
  title: string
  isDone: boolean
}

export enum FilteredValues {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

const data: Array<TTask> = [
  { id: crypto.randomUUID(), title: 'HTML & CSS', isDone: true },
  { id: crypto.randomUUID(), title: 'JS/TS', isDone: true },
  { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
]

export function App() {
  const [tasks, setTasks] = useState<TTask[]>(data)
  const [valueForFilter, setValueForFilter] = useState<FilteredValues>(FilteredValues.all)
  let filteredTasks = tasks

  if (valueForFilter == FilteredValues.active) {
    filteredTasks = tasks.filter(task => !task.isDone)
  } else if (valueForFilter == FilteredValues.completed) {
    filteredTasks = tasks.filter(task => task.isDone)
  }

  function removeTask(id: string) {
    const updatedTasks = tasks.filter(item => item.id !== id)
    setTasks(updatedTasks)
  }

  function changeValueForFilter(value: FilteredValues) {
    setValueForFilter(value)
  }

  function createTask(title: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      isDone: false,
    }
    const newTasks = [newTask, ...tasks]

    setTasks(newTasks)
  }

  return (
    <div className="app">
      <TodoList
        title={'What to learn'}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeValueForFilter={changeValueForFilter}
        createTask={createTask}
      />
    </div>
  )
}
