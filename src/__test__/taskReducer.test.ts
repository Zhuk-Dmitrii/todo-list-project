import { TasksDataType } from '../redux/types/business'
import { TaskPriority, TaskStatus } from '../api/typesAPI/todoListTypes'
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

  const startStateTask: TasksDataType = {
    [todoListId1]: [
      {
        id: crypto.randomUUID(),
        title: 'HTML & CSS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'JS/TS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'ReactJS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: crypto.randomUUID(),
        title: 'book',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'Milk',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
  }

  const newTitle = 'apple'
  const action = createActionCreateTask(todoListId2, newTitle)
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask['todoListId2'].length).toBe(3)
  expect(endStateTask['todoListId1'].length).toBe(3)
  expect(endStateTask['todoListId2'][0].id).toBeDefined()
  expect(endStateTask['todoListId2'][0].title).toBe(newTitle)
  expect(endStateTask['todoListId2'][0].status).toBe(TaskStatus.New)
})

// --------------------------------------------------------------
test('todo list task should be deleted', () => {
  const todoListId1 = 'todoListId1'
  const todoListId2 = 'todoListId2'

  const startStateTask: TasksDataType = {
    [todoListId1]: [
      {
        id: '1',
        title: 'HTML & CSS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '2',
        title: 'JS/TS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '3',
        title: 'ReactJS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: '1',
        title: 'book',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '2',
        title: 'Milk',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
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

  const startStateTask: TasksDataType = {
    [todoListId1]: [
      {
        id: '1',
        title: 'HTML & CSS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '2',
        title: 'JS/TS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '3',
        title: 'ReactJS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: '1',
        title: 'book',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '2',
        title: 'Milk',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
  }

  const taskId = '1'
  const isDone = TaskStatus.New
  const action = createActionChangeStatusTask(todoListId1, taskId, isDone)
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask[todoListId1][0].status).toBe(TaskStatus.New)
  expect(endStateTask[todoListId1][1].status).toBe(TaskStatus.Completed)
  expect(endStateTask[todoListId1][2].status).toBe(TaskStatus.New)
  expect(endStateTask[todoListId2][0].status).toBe(TaskStatus.Completed)
})

test('title todo list task should be changed', () => {
  const todoListId1 = 'todoListId1'
  const todoListId2 = 'todoListId2'

  const startStateTask: TasksDataType = {
    [todoListId1]: [
      {
        id: '1',
        title: 'HTML & CSS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '2',
        title: 'JS/TS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '3',
        title: 'ReactJS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: '1',
        title: 'book',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: '2',
        title: 'Milk',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
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

  const startStateTask: TasksDataType = {
    [todoListId1]: [
      {
        id: crypto.randomUUID(),
        title: 'HTML & CSS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'JS/TS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'ReactJS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: crypto.randomUUID(),
        title: 'book',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'Milk',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
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

  const startStateTask: TasksDataType = {
    [todoListId1]: [
      {
        id: crypto.randomUUID(),
        title: 'HTML & CSS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'JS/TS',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'ReactJS',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId1,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
    [todoListId2]: [
      {
        id: crypto.randomUUID(),
        title: 'book',
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
      {
        id: crypto.randomUUID(),
        title: 'Milk',
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        order: 0,
        todoListId: todoListId2,
        addedDate: '',
        deadline: '',
        description: '',
        startDate: '',
      },
    ],
  }

  const action = createActionDeleteTodoList(todoListId2)
  const endStateTask = tasksReducer(startStateTask, action)

  const keys = Object.keys(endStateTask)

  expect(keys.length).toBe(1)
  expect(endStateTask[todoListId2]).toBeUndefined()
})
