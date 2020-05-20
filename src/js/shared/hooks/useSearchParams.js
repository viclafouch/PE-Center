import { useContext, useCallback } from 'react'
import { DefaultContext } from '@/js/stores/DefaultContext'
import { SET_PAGE, SET_SEARCH_VALUE } from '@/js/stores/reducer/constants'

const useSearchParams = () => {
  const [{ searchParams }, dispatch] = useContext(DefaultContext)

  const setPage = useCallback(
    (page) => {
      dispatch({
        type: SET_PAGE,
        page,
      })
    },
    [dispatch]
  )

  const setSearch = useCallback(
    (val) => {
      dispatch({
        type: SET_SEARCH_VALUE,
        searchValue: val,
      })
    },
    [dispatch]
  )

  return [{ ...searchParams }, { setSearch, setPage }]
}

export default useSearchParams
