import { TodoListBusinessType, FilteredValues } from '../redux/types/business'
import {
  createActionCreateTodoList,
  createActionDeleteTodoList,
  createActionChangeFilterTodoList,
  createActionChangeTitleTodoList,
} from '../redux/action/todoListsAction'
import { todoListsReducer } from '../redux/reducer/todoListsReducer'

// --------------------------------------------------------
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
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: FilteredValues.active,
      addedDate: '',
      order: 0,
    },
  ]
})

// --------------------------------------------------------
test('new todo list should be created', () => {
  const newTitleTodoList = 'hello Jest'
  const action = createActionCreateTodoList(newTitleTodoList)

  const endStateTodoLists = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoLists.length).toBe(3)
  expect(endStateTodoLists[0].title).toBe(newTitleTodoList)
  expect(endStateTodoLists[0].filter).toBe(FilteredValues.all)
})

// --------------------------------------------------------
test('todo list should be deleted', () => {
  const action = createActionDeleteTodoList(todoListId1)

  const endStateTodoList = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList.length).toBe(1)
  expect(endStateTodoList[0].title).toBe('What to buy')
})

// --------------------------------------------------------
test('todo list filter should be changed', () => {
  const newFilter: FilteredValues = FilteredValues.completed
  const action = createActionChangeFilterTodoList(todoListId2, newFilter)

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].filter).toBe(newFilter)
  expect(endStateTodoList[0].filter).toBe(FilteredValues.all)
})

// --------------------------------------------------------
test('todo list title should be changed', () => {
  const newTitle: string = 'New Title Todo List'
  const action = createActionChangeTitleTodoList(todoListId2, newTitle)

  const endStateTodoList: TodoListBusinessType[] = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].title).toBe(newTitle)
  expect(endStateTodoList[0].title).toBe('What to learn')
})
