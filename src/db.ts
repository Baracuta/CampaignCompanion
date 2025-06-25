import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:Baradar90@localhost:5432/master',
});