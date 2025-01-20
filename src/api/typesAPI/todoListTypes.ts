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
  status: TaskStatus
  priority: TaskPriority
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

export type ResponseGetTodoListTasks = {
  items: TaskType[]
  totalCount: number
  error: string | null
}

export type ResponseTodoListTask<D = object> = {
  resultCode: number
  messages: string[]
  data: D
}

// ----------------------------- OTHER ----------------------
export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
