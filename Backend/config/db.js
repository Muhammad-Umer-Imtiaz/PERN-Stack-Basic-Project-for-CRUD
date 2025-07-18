import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv";

dotenv.config({ path: './config/.env' });

const {PGPASSWORD,PGDATABASE,PGUSER,PGHOST}= process.env;
export const sql = neon(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`);