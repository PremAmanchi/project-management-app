const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

// Configure express-session
app.use(
  session({
    secret: 'your_secret_key', // Change this to a secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware to parse JSON data
app.use(express.json());

// AWS RDS MySQL database connection parameters
const dbConfig = {
  host: 'database-2.c3nr38sgjofr.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Qwerty!23',
  database: 'my_db',
  port: 3306
};

let connection;
async function createdbConnection() {
  connection = await mysql.createConnection(dbConfig);
}

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

// Add a user
app.post('/user', async (req, res) => {
  try {
    if (req.session.user) {
      var passwordGenrated = '';
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

      for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        passwordGenrated += str.charAt(char)
      }
      console.log(passwordGenrated)
      const { firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate } = req.body;

      // Hash the user's password
      const hashedPassword = await hashPassword(passwordGenrated);

      // Insert user into the database
      const [results, fields] = await connection.execute('INSERT INTO users (firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstname, lastname, overview, email, phonenumber, address, country, userrole, technologies, joiningdate, hashedPassword]);

      res.json({ message: 'User added successfully', defaultpassword: passwordGenrated });
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by empid
app.delete('/users/:empid', async (req, res) => {
  try {
    if (req.session.user) {
      const empid = req.params.empid;

      // Delete user from the database
      const [results, fields] = await connection.execute('DELETE FROM users WHERE empid = ?', [empid]);

      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user by empid
app.get('/users/:empid', async (req, res) => {
  try {
    if (req.session.user) {
      const empid = req.params.empid;

      // Retrieve user from the database
      const [results, fields] = await connection.execute('SELECT * FROM users WHERE empid = ?', [empid]);

      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(results[0]);
      }
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by empid
app.put('/users/:empid', async (req, res) => {
  try {
    if (req.session.user) {
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
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    if (req.session.user) {
      // Retrieve all users from the database
      const [results, fields] = await connection.execute('SELECT * FROM users');
      res.json(results);
    } else {
      res.status(401).json({ message: 'Please Login' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Project Management

// add a project
app.post('/project', async (req, res) => {
  try {
    if (req.session.user) {
      const { name, unit, description, value, technologies, manager, client, startdate, enddate, status } = req.body;

      // Insert project into the database
      const [results, fields] = await connection.execute('INSERT INTO projects (name, unit, description, value, technologies, manager, client, startdate, enddate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, unit, description, value, technologies, manager, client, startdate, enddate, status]);

      res.json({ message: 'Project added successfully' });
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a project by projectid
app.delete('/projects/:projectid', async (req, res) => {
  try {
    if (req.session.user) {
      const projectid = req.params.projectid;

      // Delete project from the database
      const [results, fields] = await connection.execute('DELETE FROM projects WHERE projectid = ?', [projectid]);

      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Project not found' });
      } else {
        res.json({ message: 'Project deleted successfully' });
      }
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a project by projectid
app.get('/projects/:projectid', async (req, res) => {
  try {
    if (req.session.user) {
      const projectid = req.params.projectid;

      // Retrieve project from the database
      const [results, fields] = await connection.execute('SELECT * FROM projects WHERE projectid = ?', [projectid]);

      if (results.length === 0) {
        res.status(404).json({ error: 'Project not found' });
      } else {
        res.json(results[0]);
      }
    } else {
      res.status(401).json({ message: 'Please Login' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a project by projectid
app.put('/projects/:projectid', async (req, res) => {
  try {
    if (req.session.user) {
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
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all projects
app.get('/projects', async (req, res) => {
  try {
    if (req.session.user) {
      // Retrieve all projects from the database
      const [results, fields] = await connection.execute('SELECT * FROM projects');
      res.json(results);
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { empid, password } = req.body;

    // Retrieve user data from the database
    const [results, fields] = await connection.execute('SELECT * FROM users WHERE empid = ?', [empid]);

    if (results.length === 1) {
      const user = results[0];

      // Verify the user's password
      const isPasswordValid = await verifyPassword(password, user.password);

      if (isPasswordValid) {
        // Store user information in the session
        req.session.user = user;
        res.status(200).json({ message: 'Login successful', user: user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/login', (req, res) => {
  try {
    if (req.session.user) {
      var user = req.session.user
      res.status(200).json({ message: 'Login successful', user: user });
    } else {
      res.status(401).json({ message: 'Please Login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.get('/logout', (req, res) => {
  // Destroy the session to log out the user
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  createdbConnection();
  console.log(`Server is running on port ${port}`);
});
