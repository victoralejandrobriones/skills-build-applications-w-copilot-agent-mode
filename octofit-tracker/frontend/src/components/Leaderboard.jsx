import { useEffect, useState } from 'react';
import { buildApiUrl } from './ApiService';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const endpoint = '/api/leaderboard/';

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadEntries = async () => {
      try {
        const response = await fetch(buildApiUrl(endpoint), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setEntries(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message || 'Unable to load leaderboard');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadEntries();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [endpoint]);

  const apiUrl = buildApiUrl(endpoint);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
        {loading ? <p className="text-muted">Loading leaderboard…</p> : null}
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
