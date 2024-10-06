import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseURL = process.env.DATABASE_URL;
if (!databaseURL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(databaseURL);
const db = drizzle(sql, { schema });

export default db;
