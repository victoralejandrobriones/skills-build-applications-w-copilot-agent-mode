import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Backend listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
startServer();
