const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'iRdmmgj2TKynObDs3ACB',
    host: 'users-test.c3nr38sgjofr.us-east-1.rds.amazonaws.com',
    port:5432,
    database:"users-test"
})

module.exports = pool