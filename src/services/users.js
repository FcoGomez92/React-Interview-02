const RESULTS_NUMBER = 100
const API_URL = `https://randomuser.me/api/?seed=FcoGomez&results=${RESULTS_NUMBER}`

export const fetchUsers = () => {
  return fetch(API_URL)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching data.')
      }
      return res.json()
    })
    .then(data => data.results)
}
