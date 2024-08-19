import { ChangeEvent, useState } from 'react'

type TEditableSpan = {
  className?: string
  title: string
  changeValue: (newValue: string) => void
}

export function EditableSpan(props: TEditableSpan) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  function activateEditMode() {
    setEditMode(true)
    setTitle(props.title)
  }

  function disableEditMode() {
    setEditMode(false)
    props.changeValue(title)
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value)
  }

  return editMode ? (
    <input
      className={props.className}
      onChange={handleChangeInput}
      onBlur={disableEditMode}
      value={title}
      autoFocus
    />
  ) : (
    <span className={props.className} onDoubleClick={activateEditMode}>
      {props.title}
    </span>
  )
}
