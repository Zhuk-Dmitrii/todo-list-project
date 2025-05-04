import { updateTask, createTask, deleteTask, getTasks } from '../app/redux/slices/tasksSlice'
import { createTodoList, deleteTodoList, getTodoList } from '../app/redux/slices/todoListsSlice'
import { tasksReducer } from '../app/redux/slices/tasksSlice'
import { TasksDataType, UpdateBusinessTaskModelType } from '../app/types/businessTypes'
import { TaskPriority, TaskStatus, TaskType, TodoListType } from '../api/typesAPI/todoListTypes'

// ------------------------- INITIAL DATA -------------------------------------
let todoListId1: string
let todoListId2: string
let startStateTask: TasksDataType = {}

beforeEach(() => {
  todoListId1 = 'todoListId1'
  todoListId2 = 'todoListId2'

  startStateTask = {
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
})

// ---------------------------- TESTS ----------------------------------
test('new todo list task should be created', () => {
  const newTask: TaskType = {
    id: '123',
    title: 'New Task',
    status: TaskStatus.Completed,
    priority: TaskPriority.Low,
    order: 0,
    todoListId: todoListId1,
    addedDate: '',
    deadline: '',
    description: '',
    startDate: '',
  }
  const action = createTask.fulfilled({ task: newTask }, 'mockRequestID', {
    todoListId: newTask.todoListId,
    title: newTask.title,
  })
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask['todoListId2'].length).toBe(2)
  expect(endStateTask['todoListId1'].length).toBe(4)
  expect(endStateTask['todoListId1'][0].id).toBeDefined()
  expect(endStateTask['todoListId1'][0].title).toBe(newTask.title)
  expect(endStateTask['todoListId1'][0].status).toBe(TaskStatus.Completed)
})

// --------------------------------------------------------------
test('todo list task should be deleted', () => {
  const taskId = '1'
  const action = deleteTask.fulfilled({ todoListId: todoListId1, taskId }, 'mockRequestID', {
    taskId,
    todoListId: todoListId1,
  })
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask[todoListId1].length).toBe(2)
  expect(endStateTask[todoListId2].length).toBe(2)
  expect(endStateTask[todoListId1].every(task => task.id !== taskId)).toBeTruthy()
})

// --------------------------------------------------------------
test('status todo list task should be changed', () => {
  const taskId = '1'
  const model: UpdateBusinessTaskModelType = {
    status: TaskStatus.New,
  }
  const action = updateTask.fulfilled({ todoListId: todoListId1, taskId, model }, 'mockRequestID', {
    todoListId: todoListId1,
    taskId,
    businessModel: model,
  })
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask[todoListId1][0].status).toBe(TaskStatus.New)
  expect(endStateTask[todoListId1][1].status).toBe(TaskStatus.Completed)
  expect(endStateTask[todoListId1][2].status).toBe(TaskStatus.New)
  expect(endStateTask[todoListId2][0].status).toBe(TaskStatus.Completed)
})

// --------------------------------------------------------------
test('title todo list task should be changed', () => {
  const taskId = '1'
  const model: UpdateBusinessTaskModelType = {
    title: 'water',
  }
  const action = updateTask.fulfilled({ todoListId: todoListId2, taskId, model }, 'mockRequestID', {
    todoListId: todoListId2,
    taskId,
    businessModel: model,
  })
  const endStateTask = tasksReducer(startStateTask, action)

  expect(endStateTask[todoListId2][0].title).toBe(model.title)
  expect(endStateTask[todoListId1][0].title).toBe('HTML & CSS')
})

// --------------------------------------------------------------
test('new property should be added in task array', () => {
  const newTodoList: TodoListType = {
    id: 'todoList1',
    addedDate: '',
    order: 0,
    title: 'new todo list title',
  }
  const action = createTodoList.fulfilled(
    { todoList: newTodoList },
    'mockRequestID',
    newTodoList.title,
  )
  const endStateTask = tasksReducer(startStateTask, action)

  const keys = Object.keys(endStateTask)
  const newKey = keys.find(key => key !== todoListId1 && key !== todoListId2)

  if (!newKey) {
    throw new Error('key not found')
  }

  expect(keys.length).toBe(3)
  expect(endStateTask[newKey]).toStrictEqual([])
})

// --------------------------------------------------------------
test('task array should be deleted', () => {
  const action = deleteTodoList.fulfilled({ id: todoListId2 }, 'mockRequestID', todoListId2)
  const endStateTask = tasksReducer(startStateTask, action)

  const keys = Object.keys(endStateTask)

  expect(keys.length).toBe(1)
  expect(endStateTask[todoListId2]).toBeUndefined()
})

// --------------------------------------------------------------
test('empty arrays should be added when we set todo lists', () => {
  const startState = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'active',
      addedDate: '',
      order: 0,
    },
  ]

  const action = getTodoList.fulfilled(startState, 'mockRequestID')
  const endState = tasksReducer({}, action)

  expect(endState[todoListId1]).toStrictEqual([])
  expect(endState[todoListId2]).toStrictEqual([])
})

// --------------------------------------------------------------
test('tasks should be set for todo list', () => {
  const startState = {
    todoListId1: [],
    todoListId2: [],
  }
  const action = getTasks.fulfilled(
    { todoListId: todoListId1, tasks: startStateTask[todoListId1] },
    'mockRequestID',
    todoListId1,
  )

  const endState = tasksReducer(startState, action)

  expect(endState[todoListId1].length).toBe(3)
  expect(endState[todoListId2].length).toBe(0)
})
