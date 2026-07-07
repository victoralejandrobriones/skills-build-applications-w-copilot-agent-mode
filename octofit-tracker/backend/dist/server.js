import express from 'express';
import mongoose from 'mongoose';
import { pathToFileURL } from 'node:url';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
mongoose.set('bufferCommands', false);
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
}
function isDatabaseConnected() {
    return mongoose.connection.readyState === 1;
}
function createApp() {
    const app = express();
    app.use(express.json());
    app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', apiUrl: getApiBaseUrl() });
    });
    app.get(['/api/users', '/api/users/'], async (_req, res) => {
        if (!isDatabaseConnected()) {
            res.json([]);
            return;
        }
        try {
            const users = await User.find({}).lean();
            res.json(users);
        }
        catch (error) {
            console.error('Failed to fetch users', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.post(['/api/users', '/api/users/'], async (req, res) => {
        if (!isDatabaseConnected()) {
            res.status(503).json({ error: 'Database unavailable' });
            return;
        }
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Failed to create user', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
        if (!isDatabaseConnected()) {
            res.json([]);
            return;
        }
        try {
            const teams = await Team.find({}).populate('members').lean();
            res.json(teams);
        }
        catch (error) {
            console.error('Failed to fetch teams', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.post(['/api/teams', '/api/teams/'], async (req, res) => {
        if (!isDatabaseConnected()) {
            res.status(503).json({ error: 'Database unavailable' });
            return;
        }
        try {
            const team = await Team.create(req.body);
            res.status(201).json(team);
        }
        catch (error) {
            console.error('Failed to create team', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
        if (!isDatabaseConnected()) {
            res.json([]);
            return;
        }
        try {
            const activities = await Activity.find({}).populate('user').lean();
            res.json(activities);
        }
        catch (error) {
            console.error('Failed to fetch activities', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.post(['/api/activities', '/api/activities/'], async (req, res) => {
        if (!isDatabaseConnected()) {
            res.status(503).json({ error: 'Database unavailable' });
            return;
        }
        try {
            const activity = await Activity.create(req.body);
            res.status(201).json(activity);
        }
        catch (error) {
            console.error('Failed to create activity', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
        if (!isDatabaseConnected()) {
            res.json([]);
            return;
        }
        try {
            const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
            res.json(leaderboard);
        }
        catch (error) {
            console.error('Failed to fetch leaderboard', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
        if (!isDatabaseConnected()) {
            res.status(503).json({ error: 'Database unavailable' });
            return;
        }
        try {
            const entry = await LeaderboardEntry.create(req.body);
            res.status(201).json(entry);
        }
        catch (error) {
            console.error('Failed to create leaderboard entry', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
        if (!isDatabaseConnected()) {
            res.json([]);
            return;
        }
        try {
            const workouts = await Workout.find({}).populate('user').lean();
            res.json(workouts);
        }
        catch (error) {
            console.error('Failed to fetch workouts', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
        if (!isDatabaseConnected()) {
            res.status(503).json({ error: 'Database unavailable' });
            return;
        }
        try {
            const workout = await Workout.create(req.body);
            res.status(201).json(workout);
        }
        catch (error) {
            console.error('Failed to create workout', error);
            res.status(503).json({ error: 'Database unavailable' });
        }
    });
    return app;
}
async function startServer() {
    const app = createApp();
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB unavailable; continuing without a database connection', error);
    }
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
}
const isMainModule = typeof process.argv[1] === 'string' &&
    import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
    startServer();
}
export { createApp, getApiBaseUrl, startServer };
