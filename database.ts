import { Pool, QueryResult } from 'pg';
// npm install pg
// Configure your database connection parameters
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Change to your database port
});

// Export a function to connect to the database
export async function connectToDatabase() {
  try {
    const client = await pool.connect();
    return {
      query: async (queryString: string, values?: any[]): Promise<QueryResult> => {
        const result = await client.query(queryString, values);
        return result;
      },
      close: async (): Promise<void> => {
        await client.release();
      },
    };
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}
