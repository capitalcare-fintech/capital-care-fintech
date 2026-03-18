import mysql from "mysql2/promise";

let pool = null;

export function getDB() {
  if (pool) return pool;

  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "arsh032206",
    database: "capitalcare_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}
