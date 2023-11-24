const { Client } = require('pg');

// AWS RDS database connection parameters
const dbConfig = {
  host: 'database-3.c3nr38sgjofr.us-east-1.rds.amazonaws.com',
  user: 'postgres',
  password: '-',
  database: 'database-3',
  port: 5432
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database

client.connect()
  .then(() => {
    console.log('Connected to the database');
    
    // You can execute SQL queries here
    // For example:
    client.query('SELECT * FROM your_table', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        console.log('Query result:', result.rows);
      }

      // Close the database connection when you're done
      client.end();
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });