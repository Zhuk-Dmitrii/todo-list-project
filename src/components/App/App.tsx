import { useState } from 'react'
import { Container, IconButton, Paper } from '@mui/material'
import { Grid2 } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'

import { TodoList } from '../TodoList/TodoList'
import { InputForm } from '../InputForm/InputForm'
import { Header } from '../Header/Header'

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

  // -------------------------------- Todo Lists -------------------------------

  function createTodoList(title: string) {
    const newTodoList: TTodoList = {
      id: crypto.randomUUID(),
      filter: FilteredValues.all,
      title,
    }

    tasks[newTodoList.id] = []

    setTodoLists([newTodoList, ...todoLists])
    setTasks({ ...tasks })
  }

  function deleteTodoList(todoListId: string) {
    const newTodoLists = todoLists.filter(todoList => todoList.id !== todoListId)
    setTodoLists(newTodoLists)

    delete tasks[todoListId]
    setTasks({ ...tasks })
  }

  function changeValueForFilterTodoList(todoListId: string, value: FilteredValues) {
    const todoList = todoLists.find(item => item.id === todoListId)

    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    const todoList = todoLists.find(item => item.id == todoListId)

    if (todoList) {
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }

  // -------------------------------- Tasks -------------------------------

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

  function deleteTask(todoListId: string, taskId: string) {
    const updatedTasks = tasks[todoListId].filter(item => item.id !== taskId)
    tasks[todoListId] = updatedTasks

    setTasks({ ...tasks })
  }

  function changeStatusTask(todoListId: string, taskId: string, isDone: boolean) {
    const task = tasks[todoListId].find(task => task.id == taskId)

    if (task) {
      task.isDone = isDone

      setTasks({ ...tasks })
    }
  }

  function changeTaskTitle(todoListId: string, taskId: string, newValue: string) {
    const todoList = tasks[todoListId]
    const task = todoList.find(item => item.id == taskId)

    if (task) {
      task.title = newValue
      setTasks({ ...tasks })
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pt: 6, pb: 2 }}>
        <InputForm
          createItem={createTodoList}
          styleWrapper={{ justifyContent: 'center' }}
          sx={{ maxWidth: '400px', width: '100%' }}
          size="small"
        >
          <IconButton type="submit" color="primary" sx={{ ml: 1, mb: 'auto' }}>
            <AddCircleOutline />
          </IconButton>
        </InputForm>

        <Grid2 container sx={{ mt: 6 }} spacing={4}>
          {todoLists.map(todoList => {
            let filteredTasks = tasks[todoList.id]

            if (todoList.filter == FilteredValues.active) {
              filteredTasks = filteredTasks.filter(task => !task.isDone)
            } else if (todoList.filter == FilteredValues.completed) {
              filteredTasks = filteredTasks.filter(task => task.isDone)
            }

            return (
              <Grid2
                key={todoList.id}
                sx={{ maxWidth: '300px', width: '100%', minHeight: '320px' }}
              >
                <Paper elevation={4} sx={{ p: 1, height: '100%' }}>
                  <TodoList
                    todoListId={todoList.id}
                    title={todoList.title}
                    tasks={filteredTasks}
                    filterValue={todoList.filter}
                    deleteTodoList={deleteTodoList}
                    changeValueForFilterTodoList={changeValueForFilterTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    changeStatusTask={changeStatusTask}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid2>
            )
          })}
        </Grid2>
      </Container>
    </>
  )
}
