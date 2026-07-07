import { useEffect, useState } from 'react';
import { fetchJson } from './ApiService';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJson('/api/workouts/')
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout._id || workout.name}>
              <strong>{workout.name}</strong>
              <div className="text-muted small">{workout.focus} • {workout.durationMinutes} min</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workouts;
