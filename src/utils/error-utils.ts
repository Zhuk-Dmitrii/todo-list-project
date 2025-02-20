import { ResponseTodoLists, ResponseTodoListTask } from '../api/typesAPI/todoListTypes'
import { setAppErrorAC, setAppStatusAC } from '../app/redux/reducer/appReducer'
import { AppDispatch } from '../app/types/storeTypes'

export function handleServerErrorApp<D>(
  data: ResponseTodoLists<D> | ResponseTodoListTask<D>,
  dispatch: AppDispatch,
) {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('some error'))
  }

  dispatch(setAppStatusAC('failed'))
}

export function handleNetworkErrorApp(errorMessage: string, dispatch: AppDispatch) {
  dispatch(dispatch(setAppErrorAC(errorMessage)))
  dispatch(setAppStatusAC('failed'))
}
