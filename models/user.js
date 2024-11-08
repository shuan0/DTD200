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
        const [result] = await connection.query('SELECT * FROM USER');
        return result;
    }
};
