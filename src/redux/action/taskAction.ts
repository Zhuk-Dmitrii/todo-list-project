import { TaskStatus, TaskType } from '../../api/typesAPI/todoListTypes'
import {
  createTodoListACtionType,
  DeleteTodoListActionType,
  SetTodoListsActionType,
} from './todoListsAction'

export type TAction =
  | CreateTaskActionType
  | DeleteTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | createTodoListACtionType
  | DeleteTodoListActionType
  | SetTodoListsActionType
  | SetTasksActionType

export enum ActionTypeTask {
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK',
  CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
  SET_TASKS = 'SET_TASKS',
}

type CreateTaskActionType = {
  type: ActionTypeTask.CREATE_TASK
  todoListId: string
  title: string
}

type DeleteTaskActionType = {
  type: ActionTypeTask.DELETE_TASK
  todoListId: string
  taskId: string
}

type ChangeTaskStatusActionType = {
  type: ActionTypeTask.CHANGE_STATUS_TASK
  todoListId: string
  taskId: string
  status: TaskStatus
}

type ChangeTaskTitleActionType = {
  type: ActionTypeTask.CHANGE_TASK_TITLE
  todoListId: string
  taskId: string
  title: string
}

type SetTasksActionType = {
  type: ActionTypeTask.SET_TASKS
  todoListId: string
  tasks: TaskType[]
}

export function createTaskAC(todoListId: string, title: string): CreateTaskActionType {
  return {
    type: ActionTypeTask.CREATE_TASK,
    todoListId,
    title,
  }
}

export function deleteTaskAC(todoListId: string, taskId: string): DeleteTaskActionType {
  return {
    type: ActionTypeTask.DELETE_TASK,
    todoListId,
    taskId,
  }
}

export function changeTaskStatusAC(
  todoListId: string,
  taskId: string,
  status: TaskStatus,
): ChangeTaskStatusActionType {
  return {
    type: ActionTypeTask.CHANGE_STATUS_TASK,
    todoListId,
    taskId,
    status,
  }
}

export function changeTaskTitleAC(
  todoListId: string,
  taskId: string,
  title: string,
): ChangeTaskTitleActionType {
  return {
    type: ActionTypeTask.CHANGE_TASK_TITLE,
    todoListId,
    taskId,
    title,
  }
}

export function setTasksAC(todoListId: string, tasks: TaskType[]): SetTasksActionType {
  return {
    type: ActionTypeTask.SET_TASKS,
    todoListId,
    tasks,
  }
}
