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

app.post('/api/save', express.json(), async (req, res) => {
  const data = req.body;
  const filePath = path.join(root_path, '/plan.json');

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Save to database
  await pool.query('INSERT INTO plans (data) VALUES ($1)', [JSON.stringify(data)]);

  //try {
  //  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  //  res.json({ message: 'Data saved successfully' });
  //} catch (error) {
  //  res.status(500).json({ error: `Failed to save data; ${error}` });
  //}
});

/* All other requests return the React app, so it can handle routing */
app.get('*', (req, res) => {
  res.sendFile(path.join(root_path, '/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
