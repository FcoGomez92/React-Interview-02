export function UsersTable ({ users, isColoured, deleteUser, changeSort }) {
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
        {users && users.length > 0 && users.map(user => (
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
