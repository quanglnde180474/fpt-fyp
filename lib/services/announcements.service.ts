import sql from '@/lib/db'

/** Admin: all announcements, no content */
export async function getAllAnnouncements() {
  return sql`SELECT id, title, category, "publishedAt", "createdAt", "updatedAt", "authorId" FROM announcements ORDER BY "createdAt" DESC`
}

/** Public list — strips HTML and returns a 200-char excerpt */
export async function getPublishedAnnouncements() {
  return sql`
    SELECT
      id,
      title,
      category,
      "publishedAt",
      LEFT(regexp_replace(content, '<[^>]+>', ' ', 'g'), 200) AS content
    FROM announcements
    WHERE "publishedAt" IS NOT NULL
    ORDER BY "publishedAt" DESC
  `
}

/** Public detail — needs full content */
export async function getPublishedAnnouncementById(id: number) {
  const rows = await sql`
    SELECT id, title, category, content, "publishedAt"
    FROM announcements
    WHERE id = ${id} AND "publishedAt" IS NOT NULL
  `
  return rows[0] ?? null
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
  const rows = await sql`
    UPDATE announcements
    SET title = ${data.title}, content = ${data.content}, category = ${data.category},
        "publishedAt" = CASE
          WHEN ${data.published} THEN COALESCE("publishedAt", NOW())
          ELSE NULL
        END,
        "updatedAt" = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] ?? null
}

export async function deleteAnnouncement(id: number) {
  await sql`DELETE FROM announcements WHERE id = ${id}`
}
