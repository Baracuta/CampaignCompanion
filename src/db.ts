import { Pool } from 'pg';

require("dotenv").config({path: ".env"});
export const pool = new Pool({
    connectionString: import.meta.env.VITE_DATABASE_URL
});