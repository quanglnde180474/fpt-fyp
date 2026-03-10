import sql from '@/lib/db'

export async function getUserByEmail(email: string) {
  const rows = await sql`
    SELECT id, email, role, "passwordHash"
    FROM users
    WHERE email = ${email} AND active = true
  `
  return (rows[0] as any) ?? null
}
