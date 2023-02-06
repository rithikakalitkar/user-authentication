const express = require('express');
const SQLite = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5001;
app.use(cors());
let database = new SQLite.Database('sqliteDB/database/myDatabase.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

database.run(`CREATE TABLE IF NOT EXISTS userinfo (
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT PRIMARY KEY,
    emailID TEXT NOT NULL, 
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Table created successfully.');
  });


app.use(express.json());

app.get('/users', (req, res) => {
  database.all(`SELECT * FROM userinfo`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

app.post('/signup', (req, res) => {
  const { firstname, lastname, username, emailID, password } = req.body;
  
  database.run(`INSERT INTO userinfo (firstname, lastname, username, emailID, password) VALUES (?, ?, ?, ?, ?)`, [firstname, lastname, username, emailID, password], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ "userCreated": true });
  });
});

app.post('/logincheck', (req, res) => {
  const { username, password } = req.body;
  database.all(`SELECT * FROM userinfo WHERE username = ?`, [username], function(err, rows) {
    if (!err) {
      if(password === rows[0].password){
        res.send(rows[0]);
      }
      else{
        res.send({ "username": false });

      }
    }
    else{
      return console.log(err.message);
    }
  });
});

app.put('/users/:id', (req, res) => {
  const { username, email } = req.body;
  const { id } = req.params;
  database.run(`UPDATE users SET username = ?, email = ? WHERE id = ?`, [username, email, id], function(err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

