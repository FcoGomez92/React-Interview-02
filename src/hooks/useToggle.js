import { useState } from 'react'

export function useToggle () {
  const [value, setValue] = useState(false)

  const toggleValue = () => {
    setValue(!value)
  }

  return [value, toggleValue]
}
