import express from 'express';
import mongoose from 'mongoose';
import { pathToFileURL } from 'node:url';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
}
function createApp() {
    const app = express();
    app.use(express.json());
    app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', apiUrl: getApiBaseUrl() });
    });
    app.get(['/api/users', '/api/users/'], async (_req, res) => {
        const users = await User.find({}).lean();
        res.json(users);
    });
    app.post(['/api/users', '/api/users/'], async (req, res) => {
        const user = await User.create(req.body);
        res.status(201).json(user);
    });
    app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
        const teams = await Team.find({}).populate('members').lean();
        res.json(teams);
    });
    app.post(['/api/teams', '/api/teams/'], async (req, res) => {
        const team = await Team.create(req.body);
        res.status(201).json(team);
    });
    app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
        const activities = await Activity.find({}).populate('user').lean();
        res.json(activities);
    });
    app.post(['/api/activities', '/api/activities/'], async (req, res) => {
        const activity = await Activity.create(req.body);
        res.status(201).json(activity);
    });
    app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
        const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
        res.json(leaderboard);
    });
    app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
        const entry = await LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    });
    app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
        const workouts = await Workout.find({}).populate('user').lean();
        res.json(workouts);
    });
    app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    });
    return app;
}
async function startServer() {
    const app = createApp();
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend listening on port ${PORT}`);
            console.log(`API base URL: ${getApiBaseUrl()}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
const isMainModule = typeof process.argv[1] === 'string' &&
    import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
    startServer();
}
export { createApp, getApiBaseUrl, startServer };
