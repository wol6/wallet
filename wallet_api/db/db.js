import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test_wallet',
    password: 'root',
    port: '5432',
})

export default pool