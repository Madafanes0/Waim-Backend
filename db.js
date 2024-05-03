const { Pool } = require('pg');
require('dotenv').config(); // Ensure this is called if your environment variables are stored in a .env file

console.log(typeof process.env.DB_PASSWORD); // Should output 'string'
console.log(process.env.DB_PASSWORD); 

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false // For development purposes only; for production, set up proper SSL handling
    }
});

module.exports = pool;