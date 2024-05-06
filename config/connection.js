const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'Employnow'
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;  
  }
});

module.exports = connection;