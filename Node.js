const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'example',
  database: process.env.MYSQL_DATABASE || 'mydatabase'
});

// Conectando ao banco de dados MySQL
connection.connect();

// Rota para cadastrar um nome na tabela people
app.get('/add/:name', (req, res) => {
  const name = req.params.name;
  const sql = `INSERT INTO people (name) VALUES ('${name}')`;
  
  connection.query(sql, (error, results) => {
    if (error) throw error;
    console.log(`Name '${name}' added to the database`);
    res.send('Name added to the database');
  });
});

// Rota para listar os nomes cadastrados na tabela people
app.get('/', (req, res) => {
  connection.query('SELECT * FROM people', (error, results) => {
    if (error) throw error;
    
    let names = '';
    results.forEach(result => {
      names += result.name + '<br>';
    });
    
    res.send(`<h1>Full Cycle Rocks!</h1><br>List of names:<br>${names}`);
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
