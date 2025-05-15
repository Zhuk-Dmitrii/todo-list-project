import {
  changeTodoListFilter,
  changeTodoListEntityStatus,
  todoListsReducer,
} from '../app/redux/slices/todoListsSlice'
import {
  createTodoList,
  deleteTodoList,
  changeTodoListTitle,
  getTodoList,
} from '../app/redux/thunks'
import { TodoListType } from '../api/typesAPI/todoListTypes'
import { TodoListBusinessType, FilteredValuesType } from '../app/types/businessTypes'

// ----------------------- INITIAL DATA ---------------------------------
let todoListId1: string
let todoListId2: string
let startStateTodoLists: TodoListBusinessType[] = []

beforeEach(() => {
  todoListId1 = crypto.randomUUID()
  todoListId2 = crypto.randomUUID()

  startStateTodoLists = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'active',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
  ]
})

// --------------------------- TESTS -----------------------------
test('new todo list should be created', () => {
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

  const endStateTodoLists = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoLists.length).toBe(3)
  expect(endStateTodoLists[0].title).toBe(newTodoList.title)
  expect(endStateTodoLists[0].filter).toBe('all')
})

// --------------------------------------------------------
test('todo list should be deleted', () => {
  const action = deleteTodoList.fulfilled({ id: todoListId1 }, 'mockRequestID', todoListId1)

  const endStateTodoList = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList.length).toBe(1)
  expect(endStateTodoList[0].title).toBe('What to buy')
})

// --------------------------------------------------------
test('todo list filter should be changed', () => {
  const newFilter: FilteredValuesType = 'completed'
  const action = changeTodoListFilter({ id: todoListId2, filter: newFilter })

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].filter).toBe(newFilter)
  expect(endStateTodoList[0].filter).toBe('all')
})

// --------------------------------------------------------
test('todo list title should be changed', () => {
  const newTitle: string = 'New Title Todo List'
  const action = changeTodoListTitle.fulfilled(
    { id: todoListId2, title: newTitle },
    'mockRequestID',
    { id: todoListId2, title: newTitle },
  )

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].title).toBe(newTitle)
  expect(endStateTodoList[0].title).toBe('What to learn')
})

// --------------------------------------------------------
test('todo list status should be changed', () => {
  const action = changeTodoListEntityStatus({ id: todoListId2, status: 'loading' })

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].entityStatus).toBe('loading')
  expect(endStateTodoList[0].entityStatus).toBe('idle')
})

// --------------------------------------------------------
test('todo list should be set', () => {
  const action = getTodoList.fulfilled(startStateTodoLists, 'mockRequestID')

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer([], action)

  expect(endStateTodoList.length).toBe(2)
  expect(endStateTodoList[0].filter).toBeDefined()
})
