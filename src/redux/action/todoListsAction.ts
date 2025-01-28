import { TodoListType } from '../../api/typesAPI/todoListTypes'
import { FilteredValues } from '../types/business'

export enum ActionTypeTodoList {
  CREATE_TODO_LIST = 'CREATE_TODO_LIST',
  DELETE_TODO_LIST = 'DELETE_TODO_LIST',
  CHANGE_FILTER_TODO_LIST = 'CHANGE_FILTER_TODO_LIST',
  CHANGE_TITLE_TODO_LIST = 'CHANGE_TITLE_TODO_LIST',
  SET_TODO_LISTS = 'SET_TODO_LISTS',
}

export type createTodoListACtionType = {
  type: ActionTypeTodoList.CREATE_TODO_LIST
  todoList: TodoListType
}

export type DeleteTodoListActionType = {
  type: ActionTypeTodoList.DELETE_TODO_LIST
  id: string
}

export type ChangeTodoListFilterActionType = {
  type: ActionTypeTodoList.CHANGE_FILTER_TODO_LIST
  id: string
  value: FilteredValues
}

export type ChangeTodoListTitleActionType = {
  type: ActionTypeTodoList.CHANGE_TITLE_TODO_LIST
  id: string
  newTitle: string
}

export type SetTodoListsActionType = {
  type: ActionTypeTodoList.SET_TODO_LISTS
  todoLists: TodoListType[]
}

export type TAction =
  | createTodoListACtionType
  | DeleteTodoListActionType
  | ChangeTodoListFilterActionType
  | ChangeTodoListTitleActionType
  | SetTodoListsActionType

export function createTodoListAC(todoList: TodoListType): createTodoListACtionType {
  return {
    type: ActionTypeTodoList.CREATE_TODO_LIST,
    todoList,
  }
}

export function deleteTodoListAC(id: string): DeleteTodoListActionType {
  return {
    type: ActionTypeTodoList.DELETE_TODO_LIST,
    id,
  }
}

export function changeTodoListFilterAC(
  id: string,
  value: FilteredValues,
): ChangeTodoListFilterActionType {
  return {
    type: ActionTypeTodoList.CHANGE_FILTER_TODO_LIST,
    id,
    value,
  }
}

export function changeTodoListTitleAC(id: string, newTitle: string): ChangeTodoListTitleActionType {
  return {
    type: ActionTypeTodoList.CHANGE_TITLE_TODO_LIST,
    id,
    newTitle,
  }
}

export function setTodoListsAC(todoLists: TodoListType[]): SetTodoListsActionType {
  return {
    type: ActionTypeTodoList.SET_TODO_LISTS,
    todoLists,
  }
}
