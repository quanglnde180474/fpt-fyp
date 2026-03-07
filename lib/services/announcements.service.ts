import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function getAllAnnouncements() {
  return sql`SELECT * FROM announcements ORDER BY "createdAt" DESC`
}

export async function getAnnouncementById(id: number) {
  const rows = await sql`SELECT * FROM announcements WHERE id = ${id}`
  return rows[0] ?? null
}

export async function createAnnouncement(data: {
  title: string
  content: string
  category: string
  published: boolean
  authorId: number
}) {
  const rows = await sql`
    INSERT INTO announcements (title, content, category, "authorId", "publishedAt")
    VALUES (
      ${data.title}, ${data.content}, ${data.category}, ${data.authorId},
      ${data.published ? new Date().toISOString() : null}
    )
    RETURNING *
  `
  return rows[0]
}

export async function updateAnnouncement(id: number, data: {
  title: string
  content: string
  category: string
  published: boolean
}) {
  const existing = await sql`SELECT "publishedAt" FROM announcements WHERE id = ${id}`
  const alreadyPublished = existing[0]?.publishedAt

  const rows = await sql`
    UPDATE announcements
    SET title = ${data.title}, content = ${data.content}, category = ${data.category},
        "publishedAt" = ${data.published ? (alreadyPublished ?? new Date().toISOString()) : null},
        "updatedAt" = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] ?? null
}

export async function deleteAnnouncement(id: number) {
  await sql`DELETE FROM announcements WHERE id = ${id}`
}
