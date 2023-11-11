const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Configure express-session
app.use(
  session({
    secret: 'your_secret_key', // Change this to a secret key
    resave: false,
    saveUninitialized: true,
  })
);

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

// Middleware to parse JSON data
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Hash a password before storing it in the database
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Verify a password during login
async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// User Management

// Insert a user
app.post('/users', async (req, res) => {
  try {
    const { firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, password } = req.body;

    // Hash the user's password
    const hashedPassword = await hashPassword(password);

    // Insert user into the database
    const [results, fields] = await connection.execute('INSERT INTO users (firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, hashedPassword]);

    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by empid
app.delete('/users/:empid', async (req, res) => {
  try {
    const empid = req.params.empid;

    // Delete user from the database
    const [results, fields] = await connection.execute('DELETE FROM users WHERE empid = ?', [empid]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user by empid
app.get('/users/:empid', async (req, res) => {
  try {
    const empid = req.params.empid;

    // Retrieve user from the database
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE empid = ?', [empid]);

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by empid
app.put('/users/:empid', async (req, res) => {
  try {
    const empid = req.params.empid;
    const { firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, password } = req.body;

    // Hash the user's password
    const hashedPassword = await hashPassword(password);

    // Update user in the database
    const [results, fields] = await connection.execute('UPDATE users SET firstname = ?, lastname = ?, overview = ?, email = ?, phonenumber = ?, address = ?, country = ?, userrole = ?, technologies = ?, joiningdate = ?, password = ? WHERE empid = ?',
      [firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, hashedPassword, empid]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const [results, fields] = await connection.execute('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Project Management

// Insert a project
app.post('/projects', async (req, res) => {
  try {
    const { name, unit, description, value, technologies, manager, client, startdate, enddate, status } = req.body;

    // Insert project into the database
    const [results, fields] = await connection.execute('INSERT INTO projects (name, unit, description, value, technologies, manager, client, startdate, enddate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, unit, description, value, technologies, manager, client, startdate, enddate, status]);

    res.json({ message: 'Project added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a project by projectid
app.delete('/projects/:projectid', async (req, res) => {
  try {
    const projectid = req.params.projectid;

    // Delete project from the database
    const [results, fields] = await connection.execute('DELETE FROM projects WHERE projectid = ?', [projectid]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json({ message: 'Project deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a project by projectid
app.get('/projects/:projectid', async (req, res) => {
  try {
    const projectid = req.params.projectid;

    // Retrieve project from the database
    const [results, fields] = await connection.execute('SELECT * FROM projects WHERE projectid = ?', [projectid]);

    if (results.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a project by projectid
app.put('/projects/:projectid', async (req, res) => {
  try {
    const projectid = req.params.projectid;
    const { name, unit, description, value, technologies, manager, client, startdate, enddate, status } = req.body;

    // Update project in the database
    const [results, fields] = await connection.execute('UPDATE projects SET name = ?, unit = ?, description = ?, value = ?, technologies = ?, manager = ?, client = ?, startdate = ?, enddate = ?, status = ? WHERE projectid = ?',
      [name, unit, description, value, technologies, manager, client, startdate, enddate, status, projectid]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json({ message: 'Project updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all projects
app.get('/projects', async (req, res) => {
  try {
    // Retrieve all projects from the database
    const [results, fields] = await connection.execute('SELECT * FROM projects');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.get('/logout', (req, res) => {
  // Destroy the session to log out the user
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
});

// Your API is now set up with user and project management, session management, password hashing, and authentication.

