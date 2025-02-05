import {
  createTodoListAC,
  deleteTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  setTodoListsAC,
  changeTodoListEntityStatusAC,
} from '../app/redux/action/todoListsAction'
import { todoListsReducer } from '../app/redux/reducer/todoListsReducer'
import { TodoListType } from '../api/typesAPI/todoListTypes'
import { TodoListBusinessType, FilteredValues } from '../app/types/businessTypes'

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
      filter: FilteredValues.all,
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: FilteredValues.active,
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

  const action = createTodoListAC(newTodoList)

  const endStateTodoLists = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoLists.length).toBe(3)
  expect(endStateTodoLists[0].title).toBe(newTodoList.title)
  expect(endStateTodoLists[0].filter).toBe(FilteredValues.all)
})

// --------------------------------------------------------
test('todo list should be deleted', () => {
  const action = deleteTodoListAC(todoListId1)

  const endStateTodoList = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList.length).toBe(1)
  expect(endStateTodoList[0].title).toBe('What to buy')
})

// --------------------------------------------------------
test('todo list filter should be changed', () => {
  const newFilter: FilteredValues = FilteredValues.completed
  const action = changeTodoListFilterAC(todoListId2, newFilter)

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].filter).toBe(newFilter)
  expect(endStateTodoList[0].filter).toBe(FilteredValues.all)
})

// --------------------------------------------------------
test('todo list title should be changed', () => {
  const newTitle: string = 'New Title Todo List'
  const action = changeTodoListTitleAC(todoListId2, newTitle)

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].title).toBe(newTitle)
  expect(endStateTodoList[0].title).toBe('What to learn')
})

// --------------------------------------------------------
test('todo list status should be changed', () => {
  const action = changeTodoListEntityStatusAC(todoListId2, 'loading')

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].entityStatus).toBe('loading')
  expect(endStateTodoList[0].entityStatus).toBe('idle')
})

// --------------------------------------------------------
test('todo list should be set', () => {
  const action = setTodoListsAC(startStateTodoLists)

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer([], action)

  expect(endStateTodoList.length).toBe(2)
  expect(endStateTodoList[0].filter).toBeDefined()
})
