const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// 1. GET all chapters
app.get('/api/chapters', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM chapters ORDER BY id ASC;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 2. POST create a new event dynamically
app.post('/api/events', async (req, res) => {
  const { chapter_id, name, description, event_type, event_date, location } = req.body;

  if (!chapter_id || !name || !event_date) {
    return res.status(400).json({ error: 'chapter_id, name, and event_date are required' });
  }

  try {
    const queryText = `
      INSERT INTO events (chapter_id, name, description, event_type, event_date, location)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [chapter_id, name, description, event_type, event_date, location];

    const result = await db.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert event into database' });
  }
});

// 3. GET all events
app.get('/api/events', async (req, res) => {
  try {
    const queryText = `
      SELECT e.*, c.name AS chapter_name 
      FROM events e
      JOIN chapters c ON e.chapter_id = c.id
      ORDER BY e.event_date ASC;
    `;
    const result = await db.query(queryText);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// 4. POST create a new feed post
app.post('/api/posts', async (req, res) => {
  const { profile_id, content } = req.body;

  if (!profile_id || !content) {
    return res.status(400).json({ error: 'profile_id and content are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO posts (profile_id, content) VALUES ($1, $2) RETURNING *;',
      [profile_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// 5. GET social feed
app.get('/api/posts', async (req, res) => {
  try {
    const queryText = `
      SELECT p.id, p.content, p.created_at, pr.name AS author_name, pr.major
      FROM posts p
      JOIN profiles pr ON p.profile_id = pr.id
      ORDER BY p.created_at DESC;
    `;
    const result = await db.query(queryText);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
});

// 6. POST create a new user profile
app.post('/api/profiles', async (req, res) => {
  const { name, email, major, chapter_id } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO profiles (name, email, major, chapter_id) VALUES ($1, $2, $3, $4) RETURNING *;',
      [name, email, major, chapter_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});