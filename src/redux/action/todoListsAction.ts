import { TodoListType } from '../../api/typesAPI/todoListTypes'
import { FilteredValues } from '../types/businessTypes'

// ---------------------- TYPES ----------------------------

export enum ActionTypeTodoList {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
  CHANGE_FILTER_TODO_LIST = 'CHANGE_FILTER_TODO_LIST',
  CHANGE_TITLE_TODO_LIST = 'CHANGE_TITLE_TODO_LIST',
  SET_TODO_LISTS = 'SET_TODO_LISTS',
}

export type createTodoListACtionType = ReturnType<typeof createTodoListAC>
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export type TAction =
  | createTodoListACtionType
  | DeleteTodoListActionType
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListTitleAC>
  | SetTodoListsActionType

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

export function changeTodoListFilterAC(id: string, value: FilteredValues) {
  return {
    type: ActionTypeTodoList.CHANGE_FILTER_TODO_LIST,
    id,
    value,
  } as const
}

export function changeTodoListTitleAC(id: string, newTitle: string) {
  return {
    type: ActionTypeTodoList.CHANGE_TITLE_TODO_LIST,
    id,
    newTitle,
  } as const
}

export function setTodoListsAC(todoLists: TodoListType[]) {
  return {
    type: ActionTypeTodoList.SET_TODO_LISTS,
    todoLists,
  } as const
}
