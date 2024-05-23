import React, { useState } from 'react'

interface UseFilterReturn {
  filterValue: string
  handleFilterValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function useFilter (): UseFilterReturn {
  const [filterInput, setFilterInput] = useState<string>('')

  const handleFilterValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterInput(e.target.value)
  }

  return { filterValue: filterInput.trim(), handleFilterValue }
}
