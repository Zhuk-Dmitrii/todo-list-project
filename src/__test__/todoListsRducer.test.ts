import { FilteredValues, TTodoList } from '../components/App/App'
import {
  CreateActionCreateTodoList,
  CreateActionDeleteTodoList,
  CreateActionChangeFilterTodoList,
  CreateActionChangeTitleTodoList,
} from '../state/action/todoListsAction'
import { todoListsReducer } from '../state/reducer/todoListsReducer'

// --------------------------------------------------------
test('new todo list should be created', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const startStateTodoLists: Array<TTodoList> = [
    { id: todoListId1, title: 'What to learn', filter: FilteredValues.all },
    { id: todoListId2, title: 'What to buy', filter: FilteredValues.active },
  ]

  const newTitleTodoList = 'hello Jest'
  const action = CreateActionCreateTodoList(newTitleTodoList)

  const endStateTodoLists = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoLists.length).toBe(3)
  expect(endStateTodoLists[0].title).toBe(newTitleTodoList)
  expect(endStateTodoLists[0].filter).toBe(FilteredValues.all)
})

// --------------------------------------------------------
test('todo list should be deleted', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const startStateTodoLists: Array<TTodoList> = [
    { id: todoListId1, title: 'What to learn', filter: FilteredValues.all },
    { id: todoListId2, title: 'What to buy', filter: FilteredValues.active },
  ]

  const action = CreateActionDeleteTodoList(todoListId1)

  const endStateTodoList = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList.length).toBe(1)
  expect(endStateTodoList[0].title).toBe('What to buy')
})

test('todo list filter should be changed', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const startStateTodoLists: Array<TTodoList> = [
    { id: todoListId1, title: 'What to learn', filter: FilteredValues.all },
    { id: todoListId2, title: 'What to buy', filter: FilteredValues.active },
  ]

  const newFilter: FilteredValues = FilteredValues.completed
  const action = CreateActionChangeFilterTodoList(todoListId2, newFilter)

  const endStateTodoList: Array<TTodoList> = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].filter).toBe(newFilter)
  expect(endStateTodoList[0].filter).toBe(FilteredValues.all)
})

test('todo list title should be changed', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const startStateTodoLists: Array<TTodoList> = [
    { id: todoListId1, title: 'What to learn', filter: FilteredValues.all },
    { id: todoListId2, title: 'What to buy', filter: FilteredValues.active },
  ]

  const newTitle: string = 'New Title Todo List'
  const action = CreateActionChangeTitleTodoList(todoListId2, newTitle)

  const endStateTodoList: Array<TTodoList> = todoListsReducer(startStateTodoLists, action)

  expect(endStateTodoList[1].title).toBe(newTitle)
  expect(endStateTodoList[0].title).toBe('What to learn')
})
