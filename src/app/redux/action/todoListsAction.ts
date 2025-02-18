import { TodoListType } from '../../../api/typesAPI/todoListTypes'
import { FilteredValues } from '../../types/businessTypes'
import { AppStatus } from './appAction'

// ---------------------- TYPES ----------------------------

export enum ActionTypeTodoList {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
  CHANGE_FILTER_TODO_LIST = 'CHANGE_FILTER_TODO_LIST',
  CHANGE_TITLE_TODO_LIST = 'CHANGE_TITLE_TODO_LIST',
  CHANGE_ENTITY_STATUS_TODO_LIST = 'CHANGE_ENTITY_STATUS_TODO_LIST',
  SET_TODO_LISTS = 'SET_TODO_LISTS',
  RESET_STATE = 'RESET_STATE',
}

export type CreateTodoListActionType = ReturnType<typeof createTodoListAC>
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type ResetStateActionType = ReturnType<typeof resetStateAC>

export type TAction =
  | CreateTodoListActionType
  | DeleteTodoListActionType
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | ReturnType<typeof changeTodoListEntityStatusAC>
  | SetTodoListsActionType
  | ResetStateActionType

// ------------------ ACTION CREATORS ----------------------

export function createTodoListAC(todoList: TodoListType) {
  return {
    type: ActionTypeTodoList.CREATE_TODO_LIST,
    todoList,
  } as const
}

export function deleteTodoListAC(id: string) {
  return {
    type: ActionTypeTodoList.DELETE_TODO_LIST,
    id,
  } as const
}

export function changeTodoListFilterAC(id: string, filter: FilteredValues) {
  return {
    type: ActionTypeTodoList.CHANGE_FILTER_TODO_LIST,
    id,
    filter,
  } as const
}

export function changeTodoListTitleAC(id: string, newTitle: string) {
  return {
    type: ActionTypeTodoList.CHANGE_TITLE_TODO_LIST,
    id,
    newTitle,
  } as const
}

export function changeTodoListEntityStatusAC(id: string, status: AppStatus) {
  return {
    type: ActionTypeTodoList.CHANGE_ENTITY_STATUS_TODO_LIST,
    id,
    status,
  } as const
}

export function setTodoListsAC(todoLists: TodoListType[]) {
  return {
    type: ActionTypeTodoList.SET_TODO_LISTS,
    todoLists,
  } as const
}

export function resetStateAC() {
  return {
    type: ActionTypeTodoList.RESET_STATE,
  } as const
}
