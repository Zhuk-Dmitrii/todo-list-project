import { ResponseTodoLists, ResponseTodoListTask } from '../api/typesAPI/todoListTypes'
import { setAppError, setAppStatus } from '../app/redux/slices/appSlice'
import { AppDispatch } from '../app/types/storeTypes'

export function handleServerErrorApp<D>(
  data: ResponseTodoLists<D> | ResponseTodoListTask<D>,
  dispatch: AppDispatch,
) {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('some error'))
  }

  dispatch(setAppStatus('failed'))
}

export function handleNetworkErrorApp(errorMessage: string, dispatch: AppDispatch) {
  dispatch(setAppError(errorMessage))
  dispatch(setAppStatus('failed'))
}
