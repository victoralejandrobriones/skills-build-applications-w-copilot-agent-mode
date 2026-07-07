import { useEffect, useState } from 'react';
import { buildApiUrl } from './ApiService';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
    ? 'https://' + import.meta.env.VITE_CODESPACE_NAME + '-8000.app.github.dev'
    : 'http://localhost:8000';
  const endpoint = '/api/teams';

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadTeams = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setTeams(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message || 'Unable to load teams');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [endpoint]);

  const apiUrl = `${apiBaseUrl}${endpoint}`;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
        {loading ? <p className="text-muted">Loading teams…</p> : null}
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.name}>
              <strong>{team.name}</strong>
              <div className="text-muted small">{team.sport} • {team.city}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
