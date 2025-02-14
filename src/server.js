import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const app = express();
const port = process.env.PORT || 3000;

/* Get the root directory of the app */
const root_path = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* Serve static files from the React app */
app.use(express.static(path.join(root_path, '/dist')));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  user: 'planner',
  host: '/var/run/postgresql',
});

app.post('/api/save', express.json(), async (req, res) => {
  const data = req.body;

  try {
    const today = new Date();
    const tzOffset = today.getTimezoneOffset();
    const date = new Date(today.getTime() - tzOffset * 60 * 1000).toISOString().split('T')[0];
    const query = `
      INSERT INTO plan (date, plan)
      VALUES ($1, $2)
      ON CONFLICT (date) DO UPDATE
      SET plan = $2`;
    await pool.query(query, [date, JSON.stringify(data)]);
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: `Failed to save data; ${error}` });
  }
});

app.get('/api/load', express.json(), async (_, res) => {
  try {
    const query = `SELECT plan FROM plan ORDER BY date DESC LIMIT 1`;
    const result = await pool.query(query);
    const resp =
      result.rows.length === 0
        ? {
            range: {
              startDate: '',
              endDate: '',
            },
            people: [],
            tasks: [],
          }
        : result.rows[0].plan;
    res.json(resp);
  } catch (error) {
    res.status(500).json({ error: `Failed to load data; ${error}` });
  }
});

/* All other requests return the React app, so it can handle routing */
app.get('*', (req, res) => {
  res.sendFile(path.join(root_path, '/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
