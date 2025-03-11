import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbPool = new Pool({
  user: process.env.PG_USER,      
  host: process.env.PG_HOST,      
  database: process.env.PG_NAME,  
  password: process.env.PG_PASS,  
  port: process.env.PG_PORT || 5432, 
});

export default dbPool; 

