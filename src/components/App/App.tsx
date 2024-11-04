import { useReducer } from 'react'
import { Container, IconButton, Paper } from '@mui/material'
import { Grid2 } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'

import { todoListsReducer } from '../../redux/reducer/todoListsReducer'
import { taskReducer } from '../../redux/reducer/taskReducer'
import {
  createActionCreateTodoList,
  createActionDeleteTodoList,
  createActionChangeFilterTodoList,
  createActionChangeTitleTodoList,
} from '../../redux/action/todoListsAction'
import {
  createActionCreateTask,
  createActionDeleteTask,
  createActionChangeStatusTask,
  createActionChangeTaskTitle,
} from '../../redux/action/taskAction'
import { TodoList } from '../TodoList/TodoList'
import { InputForm } from '../InputForm/InputForm'
import { Header } from '../Header/Header'

export type TTodoList = {
  id: string
  title: string
  filter: FilteredValues
}

export type TDataTasks = {
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
  // const [todoLists, setTodoLists] = useState<Array<TTodoList>>(dataTodoLists)
  // const [tasks, setTasks] = useState<TDataTasks>(dataTasks)
  const [todoLists, dispatchTodoList] = useReducer(todoListsReducer, dataTodoLists)
  const [tasks, dispatchTasks] = useReducer(taskReducer, dataTasks)

  // -------------------------------- Todo Lists -------------------------------

  function createTodoList(title: string) {
    const action = createActionCreateTodoList(title)

    dispatchTodoList(action)
    dispatchTasks(action)
  }

  function deleteTodoList(todoListId: string) {
    const action = createActionDeleteTodoList(todoListId)

    dispatchTodoList(action)
    dispatchTasks(action)
  }

  function changeFilterTodoList(todoListId: string, value: FilteredValues) {
    const action = createActionChangeFilterTodoList(todoListId, value)

    dispatchTodoList(action)
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    const action = createActionChangeTitleTodoList(todoListId, newTitle)

    dispatchTodoList(action)
  }

  // -------------------------------- Tasks -------------------------------

  function createTask(todoListId: string, title: string) {
    const action = createActionCreateTask(todoListId, title)

    dispatchTasks(action)
  }

  function deleteTask(todoListId: string, taskId: string) {
    const action = createActionDeleteTask(todoListId, taskId)

    dispatchTasks(action)
  }

  function changeStatusTask(todoListId: string, taskId: string, isDone: boolean) {
    const action = createActionChangeStatusTask(todoListId, taskId, isDone)

    dispatchTasks(action)
  }

  function changeTaskTitle(todoListId: string, taskId: string, newValue: string) {
    const action = createActionChangeTaskTitle(todoListId, taskId, newValue)

    dispatchTasks(action)
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
                    changeFilterTodoList={changeFilterTodoList}
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
