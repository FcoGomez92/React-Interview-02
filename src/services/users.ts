import { type User, type APIData } from '../types.d'
const RESULTS_NUMBER = 100
const API_URL = `https://randomuser.me/api/?seed=FcoGomez&results=${RESULTS_NUMBER}`

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error('Error fetching data.')
  }
  const data = await res.json() as APIData
  return data.results
}
