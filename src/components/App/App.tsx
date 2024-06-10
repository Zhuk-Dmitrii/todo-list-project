import { useState } from 'react'

import { TodoList } from '../TodoList/TodoList'
import style from './App.module.scss'

type TTodoList = {
  id: string
  title: string
  filter: FilteredValues
}

type TDataTasks = {
  [id: string]: Array<TTask>
}

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

const todoListId1 = crypto.randomUUID()
const todoListId2 = crypto.randomUUID()

const dataTodoLists: Array<TTodoList> = [
  { id: todoListId1, title: 'What to learn', filter: FilteredValues.all },
  { id: todoListId2, title: 'What to buy', filter: FilteredValues.active },
]

const dataTasks: TDataTasks = {
  [todoListId1]: [
    { id: crypto.randomUUID(), title: 'HTML & CSS', isDone: true },
    { id: crypto.randomUUID(), title: 'JS/TS', isDone: true },
    { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
  ],
  [todoListId2]: [
    { id: crypto.randomUUID(), title: 'book', isDone: true },
    { id: crypto.randomUUID(), title: 'Milk', isDone: false },
  ],
}

export function App() {
  const [todoLists, setTodoLists] = useState<Array<TTodoList>>(dataTodoLists)
  const [tasks, setTasks] = useState<TDataTasks>(dataTasks)

  function removeTask(todoListId: string, taskId: string) {
    const updatedTasks = tasks[todoListId].filter(item => item.id !== taskId)
    tasks[todoListId] = updatedTasks

    setTasks({ ...tasks })
  }

  function changeValueForFilter(todoListId: string, value: FilteredValues) {
    const todoList = todoLists.find(item => item.id === todoListId)

    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  function createTask(todoListId: string, title: string) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      isDone: false,
    }

    const newTasks = [newTask, ...tasks[todoListId]]
    tasks[todoListId] = newTasks

    setTasks({ ...tasks })
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    const task = tasks[todoListId].find(task => task.id == taskId)

    if (task) {
      task.isDone = isDone

      setTasks({ ...tasks })
    }
  }

  function deleteTodoList(todoListId: string) {
    const newTodoLists = todoLists.filter(todoList => todoList.id !== todoListId)
    setTodoLists(newTodoLists)

    delete tasks[todoListId]
    setTasks({ ...tasks })
  }

  return (
    <div className={style.app}>
      {todoLists.map(todoList => {
        let filteredTasks = tasks[todoList.id]

        if (todoList.filter == FilteredValues.active) {
          filteredTasks = tasks[todoList.id].filter(task => !task.isDone)
        } else if (todoList.filter == FilteredValues.completed) {
          filteredTasks = tasks[todoList.id].filter(task => task.isDone)
        }

        return (
          <TodoList
            key={todoList.id}
            todoListId={todoList.id}
            title={todoList.title}
            tasks={filteredTasks}
            filterValue={todoList.filter}
            removeTask={removeTask}
            changeValueForFilter={changeValueForFilter}
            createTask={createTask}
            changeStatus={changeStatus}
            deleteTodoList={deleteTodoList}
          />
        )
      })}
    </div>
  )
}
