import { instance } from './client'
import {
  TodoListType,
  ResponseTodoLists,
  TaskType,
  UpdateTaskModelType,
  ResponseGetTodoListTasks,
  ResponseTodoListTask,
} from './typesAPI/todoListTypes'

export const todoListsAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>('/todo-lists')
  },
  createTodoList(title: string) {
    return instance.post<ResponseTodoLists<{ item: TodoListType }>>('/todo-lists', { title })
  },
  updateTodoList(id: string, title: string) {
    return instance.put<ResponseTodoLists>(`/todo-lists/${id}`, { title })
  },
  deleteTodoList(id: string) {
    return instance.delete<ResponseTodoLists>(`/todo-lists/${id}`)
  },
  getTodoListTasks(todoListID: string) {
    return instance.get<ResponseGetTodoListTasks>(`/todo-lists/${todoListID}/tasks`)
  },
  createTodoListTask(todoListID: string, taskTitle: string) {
    return instance.post<ResponseTodoListTask<{ item: TaskType }>>(
      `/todo-lists/${todoListID}/tasks`,
      {
        title: taskTitle,
      },
    )
  },
  updateTodoListTask(todoListID: string, taskID: string, modelTask: UpdateTaskModelType) {
    return instance.put<ResponseTodoListTask<{ item: TaskType }>>(
      `/todo-lists/${todoListID}/tasks/${taskID}`,
      modelTask,
    )
  },
  deleteTodoListTask(todoListID: string, taskID: string) {
    return instance.delete<ResponseTodoListTask>(`/todo-lists/${todoListID}/tasks/${taskID}`)
  },
}
