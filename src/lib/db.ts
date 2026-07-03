import mysql from "mysql2/promise";
import type { Pool, PoolOptions } from "mysql2/promise";
import type { SslOptions } from "mysql2";

/**
 * Single shared pool per Node process (safe for Next.js App Router hot reload in dev).
 */
const globalForMysql = globalThis as unknown as { __mysqlPool?: Pool };

function isRemoteHost(host: string): boolean {
  const h = host.trim().toLowerCase();
  return h !== "localhost" && h !== "127.0.0.1" && !h.endsWith(".local");
}

function resolveSsl(host: string): SslOptions | undefined {
  if (!isRemoteHost(host)) return undefined;
  if (process.env.DB_SSL === "false") return undefined;

  // Railway public MySQL proxy often uses a chain Node does not fully trust;
  // strict verification causes HANDSHAKE_SSL_ERROR. Default to lenient TLS.
  // Set DB_SSL_REJECT_UNAUTHORIZED=true only if you install the correct CA bundle.
  const strict = process.env.DB_SSL_REJECT_UNAUTHORIZED === "true";

  return {
    rejectUnauthorized: strict,
  };
}

function resolvePassword(): string {
  return (
    process.env.DB_PASSWORD ??
    process.env.DB_PASS ??
    process.env.DATABASE_PASSWORD ??
    ""
  );
}

function buildPoolConfig(): PoolOptions {
  const host = process.env.DB_HOST?.trim();
  const user = process.env.DB_USER?.trim();
  const database = process.env.DB_NAME?.trim();
  const password = resolvePassword();

  if (!host || !user || !database) {
    throw new Error(
      "[db] Missing required env: DB_HOST, DB_USER, and DB_NAME must be set.",
    );
  }

  const portRaw = process.env.DB_PORT ?? "3306";
  const port = Number.parseInt(portRaw, 10);
  if (Number.isNaN(port) || port < 1 || port > 65535) {
    throw new Error(`[db] Invalid DB_PORT: ${portRaw}`);
  }

  const connectTimeout = Number.parseInt(
    process.env.DB_CONNECT_TIMEOUT ?? "20000",
    10,
  );

  const connectionLimit = Number.parseInt(
    process.env.DB_POOL_LIMIT ?? "10",
    10,
  );

  const family =
    process.env.DB_CONNECT_FAMILY === "4"
      ? 4
      : process.env.DB_CONNECT_FAMILY === "6"
        ? 6
        : undefined;

  const ssl = resolveSsl(host);

  return {
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: Number.isFinite(connectionLimit) ? connectionLimit : 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,   // send keepalive after 10s idle
    connectTimeout: Number.isFinite(connectTimeout) ? connectTimeout : 20000,
    // Railway proxy drops idle connections — reduce pool size to avoid exhaustion
    idleTimeout: 60000,             // release idle connections after 60s
    maxIdle: 5,
    ...(family ? { family } : {}),
    ...(ssl ? { ssl } : {}),
  };
}

/**
 * Returns the shared mysql2 connection pool. Do not call createConnection per request.
 */
export function getDB(): Pool {
  const existing = globalForMysql.__mysqlPool;
  if (existing) return existing;

  const config = buildPoolConfig();
  console.log(`[db] Connecting to ${config.host}:${config.port} / ${config.database} as ${config.user}`);
  const pool = mysql.createPool(config);
  globalForMysql.__mysqlPool = pool;

  // Test the connection on first pool creation
  pool.getConnection()
    .then((conn) => {
      console.log("[db] ✓ Connection pool established successfully");
      conn.release();
    })
    .catch((err) => {
      console.error("[db] ✗ Connection pool test failed:", err.message);
    });

  return pool;
}

/** Alias for clarity in new code */
export const getPool = getDB;

export async function closePool(): Promise<void> {
  const pool = globalForMysql.__mysqlPool;
  if (!pool) return;
  await pool.end();
  globalForMysql.__mysqlPool = undefined;
}

export function isDbConfigError(err: unknown): boolean {
  return err instanceof Error && err.message.startsWith("[db]");
}
