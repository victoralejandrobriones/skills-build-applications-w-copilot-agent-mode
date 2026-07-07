import { useEffect, useState } from 'react';
import { buildApiUrl } from './ApiService';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
    ? 'https://' + import.meta.env.VITE_CODESPACE_NAME + '-8000.app.github.dev'
    : 'http://localhost:8000';
  const endpoint = '/api/activities';

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadActivities = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (isActive) {
          setActivities(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch (err) {
        if (!isActive || err.name === 'AbortError') {
          return;
        }

        setError(err.message || 'Unable to load activities');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [endpoint]);

  const apiUrl = `${apiBaseUrl}${endpoint}`;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        <div className="small text-muted mb-2">{apiUrl}</div>
        {error ? <p className="text-danger">{error}</p> : null}
        {loading ? <p className="text-muted">Loading activities…</p> : null}
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
