import { TDataTasks } from '../components/App/App'
import {
  createActionChangeStatusTask,
  createActionCreateTask,
  createActionDeleteTask,
} from '../state/action/taskAction'
import { taskReducer } from '../state/reducer/taskReducer'

// --------------------------------------------------------------
test('new todo list task should be created', () => {
  const todoListId1 = 'todoListId1'
  const todoListId2 = 'todoListId2'

  const startStateTask: TDataTasks = {
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

  const newTitle = 'apple'
  const action = createActionCreateTask(todoListId2, newTitle)
  const endStateTask = taskReducer(startStateTask, action)

  expect(endStateTask['todoListId2'].length).toBe(3)
  expect(endStateTask['todoListId1'].length).toBe(3)
  expect(endStateTask['todoListId2'][0].id).toBeDefined()
  expect(endStateTask['todoListId2'][0].title).toBe(newTitle)
  expect(endStateTask['todoListId2'][0].isDone).toBe(false)
})

// --------------------------------------------------------------
test('todo list task should be deleted', () => {
  const todoListId1 = 'todoListId1'
  const todoListId2 = 'todoListId2'

  const startStateTask: TDataTasks = {
    [todoListId1]: [
      { id: '1', title: 'HTML & CSS', isDone: true },
      { id: '2', title: 'JS/TS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
    ],
  }

  const taskId = '1'
  const action = createActionDeleteTask(todoListId1, taskId)
  const endStateTask = taskReducer(startStateTask, action)

  expect(endStateTask[todoListId1].length).toBe(2)
  expect(endStateTask[todoListId2].length).toBe(2)
  expect(endStateTask[todoListId1].every(task => task.id !== taskId)).toBeTruthy()
})

// --------------------------------------------------------------
test('status todo list task should be changed', () => {
  const todoListId1 = 'todoListId1'
  const todoListId2 = 'todoListId2'

  const startStateTask: TDataTasks = {
    [todoListId1]: [
      { id: '1', title: 'HTML & CSS', isDone: true },
      { id: '2', title: 'JS/TS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'book', isDone: true },
      { id: '2', title: 'Milk', isDone: false },
    ],
  }

  const taskId = '1'
  const isDone = false
  const action = createActionChangeStatusTask(todoListId1, taskId, isDone)
  const endStateTask = taskReducer(startStateTask, action)

  expect(endStateTask[todoListId1][0].isDone).toBe(false)
  expect(endStateTask[todoListId1][1].isDone).toBe(true)
  expect(endStateTask[todoListId1][2].isDone).toBe(false)
  expect(endStateTask[todoListId2][0].isDone).toBe(true)
})
