const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'my_database',
});

app.get('/', (req, res) => {
  const name = 'John Doe'; // Nome a ser inserido no banco de dados
  const sql = `INSERT INTO people (name) VALUES ('${name}')`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('1 record inserted');
  });

  connection.query('SELECT * FROM people', (err, results) => {
    if (err) throw err;
    let names = '';
    results.forEach((row) => {
      names += `<li>${row.name}</li>`;
    });
    const html = `
      <h1>Full Cycle Rocks!</h1>
      <ul>${names}</ul>
    `;
    res.send(html);
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
