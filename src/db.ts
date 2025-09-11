import { Pool } from 'pg';

require("dotenv").config({path: ".env"});
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});