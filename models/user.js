import mysql from 'mysql2';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'dtd200'
};

const connection = await mysql.createConnection(dbConfig);
