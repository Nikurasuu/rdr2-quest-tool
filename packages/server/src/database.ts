import { Pool } from 'pg';
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'database',
    database: 'Quests',
});

export class Database{
    constructor() {
        this.init();
    }

    init = async () => {
        console.log("Initializing database");
        const client = await pool.connect();
        const result = await client.query('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = \'quests\')');
        if (!result.rows[0].exists) {
            console.log("Creating table");
            await client.query('CREATE TABLE quests (id SERIAL PRIMARY KEY, name VARCHAR(255), description VARCHAR(255))');
        } else {
            console.log("Table already exists");
        }
        console.log("Database initialized");
        client.release();
    }
    
    fetch = async (select: string, from: string) => {
        const client = await pool.connect();
        const result = await client.query(`SELECT ${select} FROM ${from}`);
        client.release();
        return result.rows;
    }

    add = async (table: string, columns: string[], values: string[]) => {
        const client = await pool.connect();
        const placeholders = values.map((values, index) => `$${index + 1}`);
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;
        await client.query(query, values);
        client.release();
      }

    delete = async (table: string, where: string) => {
        const client = await pool.connect();
        await client.query(`DELETE FROM ${table} WHERE ${where}`);
        client.release();
    }

    edit = async (table: string, set: string, where: string) => {
        const client = await pool.connect();
        const query = `UPDATE ${table} SET ${set} WHERE ${where}`;
        await client.query(query);
        client.release();
    } 
} 