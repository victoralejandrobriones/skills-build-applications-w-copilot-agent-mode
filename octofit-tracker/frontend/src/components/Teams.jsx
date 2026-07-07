import { useEffect, useState } from 'react';
import { fetchJson } from './ApiService';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/api/teams/')
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
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
