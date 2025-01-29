import { TaskType } from '../../api/typesAPI/todoListTypes'
import { UpdateBusinessTaskModelType } from '../types/business'
import {
  createTodoListACtionType,
  DeleteTodoListActionType,
  SetTodoListsActionType,
} from './todoListsAction'

export type TAction =
  | CreateTaskActionType
  | DeleteTaskActionType
  | UpdateTaskActionType
  | createTodoListACtionType
  | DeleteTodoListActionType
  | SetTodoListsActionType
  | SetTasksActionType

export enum ActionTypeTask {
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  SET_TASKS = 'SET_TASKS',
}

type CreateTaskActionType = {
  type: ActionTypeTask.CREATE_TASK
  task: TaskType
}

type DeleteTaskActionType = {
  type: ActionTypeTask.DELETE_TASK
  todoListId: string
  taskId: string
}

type UpdateTaskActionType = {
  type: ActionTypeTask.UPDATE_TASK
  todoListId: string
  taskId: string
  model: UpdateBusinessTaskModelType
}

type SetTasksActionType = {
  type: ActionTypeTask.SET_TASKS
  todoListId: string
  tasks: TaskType[]
}

export function createTaskAC(task: TaskType): CreateTaskActionType {
  return {
    type: ActionTypeTask.CREATE_TASK,
    task,
  }
}

export function deleteTaskAC(todoListId: string, taskId: string): DeleteTaskActionType {
  return {
    type: ActionTypeTask.DELETE_TASK,
    todoListId,
    taskId,
  }
}

export function updateTaskAC(
  todoListId: string,
  taskId: string,
  model: UpdateBusinessTaskModelType,
): UpdateTaskActionType {
  return {
    type: ActionTypeTask.UPDATE_TASK,
    todoListId,
    taskId,
    model,
  }
}

export function setTasksAC(todoListId: string, tasks: TaskType[]): SetTasksActionType {
  return {
    type: ActionTypeTask.SET_TASKS,
    todoListId,
    tasks,
  }
}
