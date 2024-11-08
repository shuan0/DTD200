import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'dtd200'
};

const connection = await mysql.createConnection(dbConfig);

export class UserModel {
    static async getAll() {
        const [result] = await connection.query('SELECT * FROM player');
        return result;
    }

    static async getUser({ username, password }) {
        const result = await connection.query(`SELECT * FROM player WHERE (username = "${username}" AND password = "${password}")`);
        return result[0][0];
    }
};
