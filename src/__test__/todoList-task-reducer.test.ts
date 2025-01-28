import { createTodoListAC } from '../redux/action/todoListsAction'
import { tasksReducer } from '../redux/reducer/tasksReducer'
import { todoListsReducer } from '../redux/reducer/todoListsReducer'
import { TodoListBusinessType, TasksDataType } from '../redux/types/business'

test('to-do list ID should be equal to the tasks list ID', () => {
  const stateTodoList: TodoListBusinessType[] = []
  const stateTask: TasksDataType = {}

  const newTitle = 'new Todo List'
  const action = createTodoListAC(newTitle)
  const endStateTodoList = todoListsReducer(stateTodoList, action)
  const endStateTask = tasksReducer(stateTask, action)

  const idTodoList = endStateTodoList[0].id
  const keysTask = Object.keys(endStateTask)
  const idTask = keysTask[0]

  expect(idTodoList).toBe(action.todoListId)
  expect(idTask).toBe(action.todoListId)
})
