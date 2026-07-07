import { useEffect, useState } from 'react';
import { fetchJson } from './ApiService';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/api/leaderboard/')
      .then((data) => setEntries(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry._id || entry.rank}>
              <strong>#{entry.rank}</strong> • {entry.user?.firstName || 'User'} {entry.user?.lastName || ''}
              <div className="text-muted small">{entry.points} points • streak {entry.streak}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
