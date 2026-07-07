import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        firstName: 'Maya',
        lastName: 'Chen',
        email: 'maya.chen@example.com',
        age: 29,
        fitnessGoal: 'Build endurance',
        city: 'Seattle',
      },
      {
        firstName: 'Jordan',
        lastName: 'Lopez',
        email: 'jordan.lopez@example.com',
        age: 34,
        fitnessGoal: 'Increase strength',
        city: 'Austin',
      },
      {
        firstName: 'Alicia',
        lastName: 'Ng',
        email: 'alicia.ng@example.com',
        age: 27,
        fitnessGoal: 'Improve mobility',
        city: 'Denver',
      },
    ]);

    await Team.insertMany([
      {
        name: 'River Runners',
        sport: 'Running',
        city: 'Seattle',
        members: [users[0]._id, users[1]._id],
        coach: 'Nina Brooks',
      },
      {
        name: 'Peak Power',
        sport: 'CrossFit',
        city: 'Austin',
        members: [users[1]._id, users[2]._id],
        coach: 'Marcus Hill',
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 45,
        distanceKm: 7.2,
        caloriesBurned: 420,
        date: new Date('2026-07-01'),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 60,
        caloriesBurned: 500,
        date: new Date('2026-07-02'),
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 180,
        date: new Date('2026-07-03'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[0]._id,
        points: 980,
        rank: 1,
        streak: 7,
      },
      {
        user: users[1]._id,
        points: 905,
        rank: 2,
        streak: 4,
      },
      {
        user: users[2]._id,
        points: 842,
        rank: 3,
        streak: 3,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Tempo Run',
        focus: 'Cardio',
        durationMinutes: 40,
        difficulty: 'Intermediate',
        user: users[0]._id,
      },
      {
        name: 'Upper Body Circuit',
        focus: 'Strength',
        durationMinutes: 50,
        difficulty: 'Advanced',
        user: users[1]._id,
      },
      {
        name: 'Mobility Flow',
        focus: 'Recovery',
        durationMinutes: 30,
        difficulty: 'Beginner',
        user: users[2]._id,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

void seedDatabase();
