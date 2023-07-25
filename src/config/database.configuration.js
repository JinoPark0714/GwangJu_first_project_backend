import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectHost = {
  host : process.env.DATABASE_HOST,
  user : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  port : process.env.DATABASE_PORT,
  database : process.env.DATABASE_NAME,
  charset : process.env.DATABASE_CHARSET
}

export const connectPool = mysql2.createPool(connectHost);

