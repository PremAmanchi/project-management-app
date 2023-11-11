const mysql = require('mysql');

// AWS RDS MySQL database connection parameters
const dbConfig = {
  host: 'database-2.c3nr38sgjofr.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Qwerty!23',
  database: 'my_db',
  port: 3306
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');
});