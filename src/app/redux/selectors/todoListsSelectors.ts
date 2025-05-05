import { TodoListBusinessType } from '../../types/businessTypes'

export const todoListsSelectors = {
  todoLists: (state: TodoListBusinessType[]) => state,
}
