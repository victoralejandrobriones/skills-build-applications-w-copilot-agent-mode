import { useEffect, useState } from 'react';
import { buildApiUrl } from './ApiService';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endpoint = '/api/users/';

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl(endpoint), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setUsers(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message || 'Unable to load users');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [endpoint]);

  const apiUrl = buildApiUrl(endpoint);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
        {loading ? <p className="text-muted">Loading users…</p> : null}
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
