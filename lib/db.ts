/**
 * Shared Supabase-compatible PostgreSQL client using the `postgres` package.
 *
 * Uses a custom URL parser so passwords with special characters (&, ?, *, %, etc.)
 * work correctly without needing to percent-encode them in DATABASE_URL.
 *
 * Required .env variable:
 *   DATABASE_URL – Supabase Transaction/Session pooler connection string
 */
import postgres from 'postgres'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set.')
}

/**
 * Parse a postgres connection string without relying on the built-in URL API,
 * so passwords containing special characters (&, ?, *, %, !) work fine.
 *
 * Format: postgresql://user:password@host:port/database[?options]
 */
function parseConnectionString(connStr: string) {
  // Strip scheme
  const withoutScheme = connStr.replace(/^postgres(?:ql)?:\/\//, '')

  // Split credentials from host — use LAST @ to handle @ in passwords
  const atIdx = withoutScheme.lastIndexOf('@')
  if (atIdx === -1) throw new Error('Invalid DATABASE_URL: missing @')

  const credentialsPart = withoutScheme.slice(0, atIdx)
  const hostPart = withoutScheme.slice(atIdx + 1)

  // Split user:password — only split on FIRST colon
  const colonIdx = credentialsPart.indexOf(':')
  const user = colonIdx >= 0 ? credentialsPart.slice(0, colonIdx) : credentialsPart
  // Raw password — no decoding, handles % / & / ? etc.
  const password = colonIdx >= 0 ? credentialsPart.slice(colonIdx + 1) : ''

  // Parse host:port/database?options
  const queryStart = hostPart.indexOf('?')
  const hostAndDb = queryStart >= 0 ? hostPart.slice(0, queryStart) : hostPart

  const slashIdx = hostAndDb.indexOf('/')
  const hostPort = slashIdx >= 0 ? hostAndDb.slice(0, slashIdx) : hostAndDb
  const database = slashIdx >= 0 ? hostAndDb.slice(slashIdx + 1) : 'postgres'

  const lastColon = hostPort.lastIndexOf(':')
  const host = lastColon >= 0 ? hostPort.slice(0, lastColon) : hostPort
  const port = lastColon >= 0 ? parseInt(hostPort.slice(lastColon + 1), 10) : 5432

  return { host, port, user, password, database }
}

const { host, port, user, password, database } = parseConnectionString(
  process.env.DATABASE_URL
)

const sql = postgres({
  host,
  port,
  user,
  password,
  database,
  ssl: 'require',
  max: 1,            // 1 connection per serverless invocation; pooler handles concurrency
  idle_timeout: 20,  // release idle connections quickly
  max_lifetime: 300, // recycle every 5 min to avoid stale pool
})

export default sql
