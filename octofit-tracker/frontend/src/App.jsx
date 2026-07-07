import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness tracking application.
              </p>
              <p className="small text-muted mb-0">
                Define VITE_CODESPACE_NAME in .env.local for Codespaces URLs. If it is unset, the app falls back to localhost.
              </p>
              <nav className="nav nav-pills flex-wrap mt-3">
                <NavLink className="nav-link" to="/users">Users</NavLink>
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </nav>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
