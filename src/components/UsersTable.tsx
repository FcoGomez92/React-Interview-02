import { type UserUUID, type User } from '../types'

interface UsersTableProps {
  users: User[]
  isColoured: boolean
  deleteUser: (uuid: UserUUID) => void
  changeSort: (e: React.MouseEvent<HTMLTableCellElement>) => void
}

export function UsersTable ({ users, isColoured, deleteUser, changeSort }: UsersTableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th data-name='first' onClick={changeSort}>Name</th>
          <th data-name='last' onClick={changeSort}>Last name</th>
          <th data-name='country' onClick={changeSort}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {(users != null) && users.length > 0 && users.map(user => (
          <tr key={user.login.uuid} className={isColoured ? 'isColoured' : ''}>
            <td>
              <img src={user.picture.thumbnail} alt='User Avatar' />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => deleteUser(user.login.uuid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
