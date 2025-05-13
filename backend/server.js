const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');



const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) console.error('Error opening database:', err);
  else console.log('Connected to SQLite DB');
});

// Create users table if it doesn't exist
const initQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT NOT NULL
  )
`;
db.run(initQuery);

// GET /api/users
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/users
app.post('/api/users', (req, res) => {
  const { name, email, role, status } = req.body;
  const id = uuidv4();
  const query = 'INSERT INTO users (id, name, email, role, status) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [id, name, email, role, status], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, name, email, role, status });
  });
});

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?';
  db.run(query, [name, email, role, status, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, name, email, role, status });
  });
});

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted', id });
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
