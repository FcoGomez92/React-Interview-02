import { useState } from 'react'

export function useToggle (): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(false)

  const toggleValue = (): void => {
    setValue(!value)
  }

  return [value, toggleValue]
}
