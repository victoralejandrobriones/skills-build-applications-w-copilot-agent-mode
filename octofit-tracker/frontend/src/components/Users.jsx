import { useEffect, useState } from 'react';
import { buildApiUrl, fetchJson } from './ApiService';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const endpoint = '/api/users/';

  useEffect(() => {
    fetchJson(endpoint)
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  const apiUrl = buildApiUrl(endpoint);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.email}>
              <strong>{user.firstName} {user.lastName}</strong>
              <div className="text-muted small">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
