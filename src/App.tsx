import './style.css'
import { UsersTable } from './components/UsersTable'
import { useFilter } from './hooks/useFilter'
import { useUsers } from './hooks/useUsers'
import { useToggle } from './hooks/useToggle'

export function App (): JSX.Element {
  const { filterValue, handleFilterValue } = useFilter()
  const { sortedUsers, error, loading, deleteUser, resetUsers, handleSort, handleSortByCountryButton, sortBy } = useUsers({ filterValue })
  const [isColoured, toggleValue] = useToggle()

  return (
    <div className='app-container'>
      <header>
        <h1>Random Users React Test</h1>
        <section className='actions-container'>
          <button onClick={toggleValue}>{!isColoured ? 'Show Colors' : 'Hide Colors'}</button>
          <button onClick={handleSortByCountryButton}>{sortBy === '' ? 'Sort By Country' : 'Back to Unsort'}</button>
          <button onClick={resetUsers}>Reset Users</button>
          <input type='text' placeholder='Filter by country' value={filterValue} onChange={handleFilterValue} />
        </section>
      </header>
      <main className='users-container'>
        <UsersTable users={sortedUsers} isColoured={isColoured} deleteUser={deleteUser} changeSort={handleSort} />
      </main>
      <footer>
        {error !== '' && <p style={{ color: '#ff5252' }}>{error}</p>}
        {loading && <p style={{ fontWeight: '600' }}>Loading...</p>}
        {error === '' && !loading && sortedUsers !== null && sortedUsers.length === 0 && <p>No users found.</p>}
      </footer>
    </div>
  )
}
