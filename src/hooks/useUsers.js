import { useState, useEffect, useRef, useMemo } from 'react'
import { fetchUsers } from '../services/users'

const sortProperties = {
  first: (u) => u.name.first,
  last: (u) => u.name.last,
  country: (u) => u.location.country
}

export function useUsers ({ filterValue }) {
  const [users, setUsers] = useState([])
  const [sortBy, setSortBy] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const initialUsersRef = useRef(null)
  const prevFilteredUsersRef = useRef([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
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

  const deleteUser = (idToDelete) => {
    const newList = users.filter(user => user.login.uuid !== idToDelete)
    setUsers(newList)
  }

  const resetUsers = () => {
    const value = initialUsersRef.current
    setUsers(value)
  }

  const handleSort = (e) => {
    const property = e.target.dataset.name
    setSortBy(property)
  }
  const handleSortByCountryButton = () => {
    setSortBy(prevSt => {
      return !prevSt ? 'country' : ''
    })
  }

  const filteredUsers = useMemo(() => {
    console.log('filtrados')
    if (users.length === 0 || !filterValue) return users
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
    return filteredUsers && sortBy
      ? filteredUsers.toSorted((a, b) => sortProperties[sortBy](a).localeCompare(sortProperties[sortBy](b)))
      : filteredUsers
  }, [filteredUsers, sortBy])

  return { sortedUsers, error, loading, resetUsers, handleSort, handleSortByCountryButton, deleteUser, sortBy }
}
