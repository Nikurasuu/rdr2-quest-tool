import { Pool } from 'pg';
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'database',
    database: 'Quests',
});

export class Database{
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

    fetchAllQuests = async () => {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM quests');
        client.release();
        return result.rows;
    }

    addQuest = async (quest: { name: string; description: string; }) => {
        const client = await pool.connect();
        await client.query('INSERT INTO quests (name, description) VALUES ($1, $2)', [quest.name, quest.description]);
        client.release();
    }

    deleteQuest = async (id: any) => {
        const client = await pool.connect();
        await client.query('DELETE FROM quests WHERE id = $1', [id]);
        client.release();
    }

    editQuest = async (id: number, newQuest: { name: string; description: string; }) => {
        const client = await pool.connect();
        await client.query('UPDATE quests SET name = $1, description = $2 WHERE id = $3', [newQuest.name, newQuest.description, id]);
        client.release();
    }
} 