import { useEffect, useState } from 'react';
import { buildApiUrl, fetchJson } from './ApiService';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const endpoint = '/api/teams/';

  useEffect(() => {
    fetchJson(endpoint)
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message));
  }, []);

  const apiUrl = buildApiUrl(endpoint);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
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
