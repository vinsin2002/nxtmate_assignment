const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vinsin@_132linux',
  database: 'nxtmate',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(bodyParser.json());

// CRUD operations
app.get('/api/users', (req, res) => {
    console.log(" fetch data accessed ");
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error retrieving users');
    } else {
      res.json(result);
    }
  });
});

app.post('/api/users', (req, res) => {
    console.log(" post data accessed ");
  const { name, dob, gender } = req.body;
  db.query('INSERT INTO users (name, dob, gender) VALUES (?, ?, ?)', [name, dob, gender], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error creating user');
    } else {
      res.json({ id: result.insertId });
    }
  });
});

app.put('/api/users/:id', (req, res) => {
    console.log(" update data accessed ");
  const { id } = req.params;
  const { name, dob, gender } = req.body;
  db.query('UPDATE users SET name=?, dob=?, gender=? WHERE id=?', [name, dob, gender, id], (err) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error updating user');
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/users/:id', (req, res) => {
    console.log(" delete data accessed ");
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id=?', [id], (err) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error deleting user');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
