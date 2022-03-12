const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: '167.172.245.38',
    user: 'api',
    password: 'PasswordAPI',
    database: 'inventario'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;