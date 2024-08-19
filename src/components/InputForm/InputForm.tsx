import classNames from 'classnames'
import { ChangeEvent, FormEvent, useState } from 'react'

import style from './InputForm.module.scss'

type TInputForm = {
  createItem: (title: string) => void
  className?: string
}

export function InputForm(props: TInputForm) {
  const [titleTodo, setTitleTodo] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitleTodo(event.target.value)
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (titleTodo.trim() === '') {
      setError('Title is required')
      setTitleTodo('')

      return
    }

    props.createItem(titleTodo.trim())
    setTitleTodo('')
  }

  return (
    <form onSubmit={handleSubmit} className={classNames(style.form, props.className)}>
      <div className={style.inputTextContainer}>
        <input
          className={classNames({ [style.errorInput]: error })}
          onChange={handleChangeTitle}
          value={titleTodo}
          type="text"
        />
        <button className={classNames(style.btn, style.btnSubmit)}>add</button>
      </div>
      {error && <p className={style.errorMessage}>{error}</p>}
    </form>
  )
}
