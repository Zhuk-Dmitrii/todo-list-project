import { ChangeEvent } from 'react'
import classNames from 'classnames'

import { TTask } from '../App/App'
import style from './Todo.module.scss'

type TProps = {
  todoListId: string
  task: TTask
  removeTask: (todoListId: string, id: string) => void
  changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
}

export function Todo(props: TProps) {
  function handleRemoveTask() {
    props.removeTask(props.todoListId, props.task.id)
  }

  function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const taskId = props.task.id
    const checked = event.currentTarget.checked

    props.changeStatus(props.todoListId, taskId, checked)
  }

  return (
    <li className={classNames(style.todo, { [style.checked]: props.task.isDone })}>
      <input onChange={handleChangeCheckbox} type="checkbox" checked={props.task.isDone} />
      <span>{props.task.title}</span>
      <button onClick={handleRemoveTask}>x</button>
    </li>
  )
}
