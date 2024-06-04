import { ChangeEvent } from 'react'

import { TTask } from '../App/App'
import style from './Todo.module.scss'

type TProps = {
  task: TTask
  removeTask: (id: string) => void
  changeStatus: (id: string, isDone: boolean) => void
}

export function Todo(props: TProps) {
  function handleRemoveTask() {
    props.removeTask(props.task.id)
  }

  function handleChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
    const id = props.task.id
    const checked = event.currentTarget.checked

    props.changeStatus(id, checked)
  }

  return (
    <li className={style.todo}>
      <input onChange={handleChangeCheckbox} type="checkbox" checked={props.task.isDone} />
      <span>{props.task.title}</span>
      <button onClick={handleRemoveTask}>x</button>
    </li>
  )
}
