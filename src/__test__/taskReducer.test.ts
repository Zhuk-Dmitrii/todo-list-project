import { TDataTasks } from '../components/App/App'
import {
  createActionChangeStatusTask,
  createActionChangeTaskTitle,
  createActionCreateTask,
  createActionDeleteTask,
} from '../redux/action/taskAction'
import {
  createActionCreateTodoList,
  createActionDeleteTodoList,
} from '../redux/action/todoListsAction'
import { tasksReducer } from '../redux/reducer/tasksReducer'

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
  const endStateTask = tasksReducer(startStateTask, action)

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
  const endStateTask = tasksReducer(startStateTask, action)

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
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask[todoListId1][0].isDone).toBe(false)
  expect(endStateTask[todoListId1][1].isDone).toBe(true)
  expect(endStateTask[todoListId1][2].isDone).toBe(false)
  expect(endStateTask[todoListId2][0].isDone).toBe(true)
})

test('title todo list task should be changed', () => {
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
  const newTitle = 'water'
  const action = createActionChangeTaskTitle(todoListId2, taskId, newTitle)
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask[todoListId2][0].title).toBe(newTitle)
  expect(endStateTask[todoListId1][0].title).toBe('HTML & CSS')
})

test('new property should be added in task array', () => {
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

  const newTitle = 'new Todo List'
  const action = createActionCreateTodoList(newTitle)
  const endStateTask = tasksReducer(startStateTask, action)

  const keys = Object.keys(endStateTask)
  const newKey = keys.find(key => key !== todoListId1 && key !== todoListId2)

  if (!newKey) {
    throw new Error('key not found')
  }

  expect(keys.length).toBe(3)
  expect(endStateTask[newKey]).toStrictEqual([])
})

test('task array should be deleted', () => {
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

  const action = createActionDeleteTodoList(todoListId2)
  const endStateTask = tasksReducer(startStateTask, action)

  const keys = Object.keys(endStateTask)

  expect(keys.length).toBe(1)
  expect(endStateTask[todoListId2]).toBeUndefined()
})
