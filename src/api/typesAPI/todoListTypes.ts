// ----------------------------- TODO LIST ----------------------
export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseTodoLists<D = object> = {
  resultCode: number
  messages: string[]
  data: D
}

// ----------------------------- TASK ----------------------
export type TaskType = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelType = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}

export type GetResponseTodoListTasks = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

export type ResponseTodoListTask<D = object> = {
  resultCode: number
  messages: string[]
  data: D
}
