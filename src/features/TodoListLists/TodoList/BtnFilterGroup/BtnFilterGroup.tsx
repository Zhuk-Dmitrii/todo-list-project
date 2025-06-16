import React, { MouseEvent, useCallback } from 'react'
import { Box, Button } from '@mui/material'

import { FilteredValuesType } from '../../../../app/types/businessTypes'
import { changeTodoListFilter } from '../../../../app/redux/slices/todoListsSlice'
import { useAppDispatch } from '../../../../app/hooks/reduxHooks'

type TProps = {
  todoListId: string
  todoListFilter: FilteredValuesType
}

export const BtnFilterGroup = React.memo(({ todoListId, todoListFilter }: TProps) => {
  const dispatch = useAppDispatch()

  const handleClickBtnFilter = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const targetValue = event.currentTarget.value as FilteredValuesType

      const action = changeTodoListFilter({ id: todoListId, filter: targetValue })
      dispatch(action)
    },
    [todoListId, dispatch],
  )

  return (
    <Box sx={{ height: '30px', display: 'flex', gap: 1, mt: 'auto' }}>
      <Button
        onClick={handleClickBtnFilter}
        value={'all'}
        variant={todoListFilter === 'all' ? 'contained' : 'outlined'}
        color="primary"
        children={'All'}
        sx={{ height: '100%' }}
      />
      <Button
        onClick={handleClickBtnFilter}
        value={'active'}
        variant={todoListFilter === 'active' ? 'contained' : 'outlined'}
        color="secondary"
        children={'Active'}
        sx={{ height: '100%' }}
      />
      <Button
        onClick={handleClickBtnFilter}
        value={'completed'}
        variant={todoListFilter == 'completed' ? 'contained' : 'outlined'}
        color="success"
        children={'Completed'}
        sx={{ height: '100%' }}
      />
    </Box>
  )
})
