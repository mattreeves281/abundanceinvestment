import pg from "pg";

const { Pool } = pg;

export function createPool(connectionString) {
  return new Pool({
    connectionString,
    ssl: connectionString?.includes("sslmode=require")
      ? undefined
      : { rejectUnauthorized: false },
    max: 3
  });
}
