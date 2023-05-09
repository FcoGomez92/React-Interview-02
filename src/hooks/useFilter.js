import { useState } from 'react'

export function useFilter () {
  const [filterInput, setFilterInput] = useState('')

  const handleFilterValue = (e) => {
    setFilterInput(e.target.value)
  }

  return { filterValue: filterInput.trim(), handleFilterValue }
}
