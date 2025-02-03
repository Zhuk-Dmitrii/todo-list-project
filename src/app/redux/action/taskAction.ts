import { TaskType } from '../../../api/typesAPI/todoListTypes'
import { UpdateBusinessTaskModelType } from '../../types/businessTypes'
import {
  createTodoListActionType,
  DeleteTodoListActionType,
  SetTodoListsActionType,
} from './todoListsAction'

// ---------------------- TYPES ----------------------------

export enum ActionTypeTask {
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  SET_TASKS = 'SET_TASKS',
}

export type TAction =
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | createTodoListActionType
  | DeleteTodoListActionType
  | SetTodoListsActionType

// ------------------ ACTION CREATORS ----------------------

export function createTaskAC(task: TaskType) {
  return {
    type: ActionTypeTask.CREATE_TASK,
    task,
  } as const
}

export function deleteTaskAC(todoListId: string, taskId: string) {
  return {
    type: ActionTypeTask.DELETE_TASK,
    todoListId,
    taskId,
  } as const
}

export function updateTaskAC(
  todoListId: string,
  taskId: string,
  model: UpdateBusinessTaskModelType,
) {
  return {
    type: ActionTypeTask.UPDATE_TASK,
    todoListId,
    taskId,
    model,
  } as const
}

export function setTasksAC(todoListId: string, tasks: TaskType[]) {
  return {
    type: ActionTypeTask.SET_TASKS,
    todoListId,
    tasks,
  } as const
}
