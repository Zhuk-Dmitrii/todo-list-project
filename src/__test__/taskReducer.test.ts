import { TDataTasks } from '../components/App/App'
import { createActionCreateTask } from '../state/action/taskAction'
import { taskReducer } from '../state/reducer/taskReducer'

test('new todo list task should be created', () => {
  const todoListId1 = 'todoListId1'
  const todoListId2 = 'todoListId2'

  const startStateTodoListTask: TDataTasks = {
    [todoListId1]: [
      { id: crypto.randomUUID(), title: 'HTML & CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS/TS', isDone: true },
      { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    ],
    [todoListId2]: [
      { id: crypto.randomUUID(), title: 'book', isDone: true },
      { id: crypto.randomUUID(), title: 'Milk', isDone: false },
    ],
  }

  const newTitle = 'apple'
  const action = createActionCreateTask(todoListId2, newTitle)
  const endStateTodoListTask = taskReducer(startStateTodoListTask, action)

  expect(endStateTodoListTask['todoListId2'].length).toBe(3)
  expect(endStateTodoListTask['todoListId1'].length).toBe(3)
  expect(endStateTodoListTask['todoListId2'][0].id).toBeDefined()
  expect(endStateTodoListTask['todoListId2'][0].title).toBe(newTitle)
  expect(endStateTodoListTask['todoListId2'][0].isDone).toBe(false)
})
