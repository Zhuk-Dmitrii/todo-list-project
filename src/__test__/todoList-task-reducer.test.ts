import { createTodoList } from '../app/redux/thunks'
import { tasksReducer } from '../app/redux/slices/tasksSlice'
import { todoListsReducer } from '../app/redux/slices/todoListsSlice'
import { TodoListBusinessType, TasksDataType } from '../app/types/businessTypes'
import { TodoListType } from '../api/typesAPI/todoListTypes'

test('to-do list ID should be equal to the tasks list ID', () => {
  const stateTodoList: TodoListBusinessType[] = []
  const stateTask: TasksDataType = {}

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
  const endStateTodoList = todoListsReducer(stateTodoList, action)
  const endStateTask = tasksReducer(stateTask, action)

  const idTodoList = endStateTodoList[0].id
  const keysTask = Object.keys(endStateTask)
  const idTask = keysTask[0]

  expect(idTodoList).toBe(action.payload.todoList.id)
  expect(idTask).toBe(action.payload.todoList.id)
})
