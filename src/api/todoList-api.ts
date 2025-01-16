import axios from 'axios'

import {
  TodoListType,
  ResponseTodoLists,
  TaskType,
  UpdateTaskModelType,
  GetResponseTodoListTasks,
  ResponseTodoListTask,
} from './typesAPI/todoListTypes'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': 'ac63a67d-4fd6-4bf1-b175-cf547b98c254',
  },
})

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
    return instance.get<GetResponseTodoListTasks>(`/todo-lists/${todoListID}/tasks`)
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
