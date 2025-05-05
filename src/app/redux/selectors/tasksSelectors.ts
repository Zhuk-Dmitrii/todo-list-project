import { TasksDataType } from '../../types/businessTypes'

export const tasksSelectors = {
  tasksForTodoList: (state: TasksDataType, todoListId: string) => state[todoListId],
}
