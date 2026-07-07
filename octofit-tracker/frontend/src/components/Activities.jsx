import { useEffect, useState } from 'react';
import { buildApiUrl, fetchJson } from './ApiService';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const endpoint = '/api/activities/';

  useEffect(() => {
    fetchJson(endpoint)
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message));
  }, []);

  const apiUrl = buildApiUrl(endpoint);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.type}>
              <strong>{activity.type}</strong>
              <div className="text-muted small">{activity.durationMinutes} min • {activity.caloriesBurned} kcal</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
