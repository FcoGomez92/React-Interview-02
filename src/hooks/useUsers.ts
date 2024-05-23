import { useState, useEffect, useRef, useMemo } from 'react'
import { fetchUsers } from '../services/users'
import { type UserUUID, type User } from '../types.d'

const sortProperties = {
  first: (u: User) => u.name.first,
  last: (u: User) => u.name.last,
  country: (u: User) => u.location.country
} as const

interface UseUsersProps {
  filterValue: string
}

type SortBy = keyof typeof sortProperties | ''

interface UseUsersReturnType {
  sortedUsers: User[]
  error: string
  loading: boolean
  resetUsers: () => void
  handleSort: (e: React.MouseEvent<HTMLTableCellElement>) => void
  handleSortByCountryButton: () => void
  deleteUser: (idToDelete: UserUUID) => void
  sortBy: SortBy
}

export function useUsers ({ filterValue }: UseUsersProps): UseUsersReturnType {
  const [users, setUsers] = useState<User[]>([])
  const [sortBy, setSortBy] = useState<SortBy>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const initialUsersRef = useRef<User[]>([])
  const prevFilteredUsersRef = useRef<User[]>([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = (): void => {
    setError('')
    setLoading(true)
    fetchUsers()
      .then(results => {
        setUsers(results)
        initialUsersRef.current = results
      })
      .catch(error => {
        console.error({ error: error.message })
        setError(error.message)
      })
      .finally(() => { setLoading(false) })
  }

  const deleteUser = (idToDelete: UserUUID): void => {
    const newList = users.filter(user => user.login.uuid !== idToDelete)
    setUsers(newList)
  }

  const resetUsers = (): void => {
    const value = initialUsersRef.current
    if (value != null) {
      setUsers(value)
    }
  }

  const handleSort = (e: React.MouseEvent<HTMLTableCellElement>): void => {
    const property = e.currentTarget.dataset.name as SortBy
    setSortBy(property)
  }
  const handleSortByCountryButton = (): void => {
    setSortBy(prevSt => {
      return prevSt === '' ? 'country' : ''
    })
  }

  const filteredUsers = useMemo(() => {
    console.log('filtrados')
    if (users.length === 0 || filterValue === '') return users
    const newFilteredUsers = users.filter(user => user.location.country.toLowerCase().includes(filterValue.toLowerCase()))
    const areEqual = JSON.stringify(prevFilteredUsersRef.current) === JSON.stringify(newFilteredUsers)
    if (!areEqual) {
      prevFilteredUsersRef.current = newFilteredUsers
      return newFilteredUsers
    }
    return prevFilteredUsersRef.current
  }, [users, filterValue])

  const sortedUsers = useMemo(() => {
    console.log('ordenados')
    return filteredUsers.length > 0 && sortBy !== ''
      ? filteredUsers.toSorted((a, b) => sortProperties[sortBy](a).localeCompare(sortProperties[sortBy](b)))
      : filteredUsers
  }, [filteredUsers, sortBy])

  return { sortedUsers, error, loading, resetUsers, handleSort, handleSortByCountryButton, deleteUser, sortBy }
}
