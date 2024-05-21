// Instance of mySQL
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_sarbers',
    password        : '6423',
    database        : 'cs340_sarbers'
})

// Export it for use in our application
module.exports.pool = pool;