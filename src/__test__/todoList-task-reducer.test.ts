import { createTodoListAC } from '../app/redux/action/todoListsAction'
import { tasksReducer } from '../app/redux/reducer/tasksReducer'
import { todoListsReducer } from '../app/redux/reducer/todoListsReducer'
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

  const action = createTodoListAC(newTodoList)
  const endStateTodoList = todoListsReducer(stateTodoList, action)
  const endStateTask = tasksReducer(stateTask, action)

  const idTodoList = endStateTodoList[0].id
  const keysTask = Object.keys(endStateTask)
  const idTask = keysTask[0]

  expect(idTodoList).toBe(action.todoList.id)
  expect(idTask).toBe(action.todoList.id)
})
