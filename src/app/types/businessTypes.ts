import { TaskPriority, TaskStatus, TaskType, TodoListType } from '../../api/typesAPI/todoListTypes'
import { AppStatus } from '../redux/action/appAction'

// ------------------- CONSTANTS ------------------------------
export enum FilteredValues {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

// ------------------- TODO LISTS TYPE ------------------------------
export type TodoListBusinessType = TodoListType & {
  filter: FilteredValues
  entityStatus: AppStatus
}

// ------------------- TASKS TYPE ------------------------------
export type TasksDataType = {
  [id: string]: TaskType[]
}

export type UpdateBusinessTaskModelType = {
  title?: string
  description?: string | null
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string | null
  deadline?: string | null
}
