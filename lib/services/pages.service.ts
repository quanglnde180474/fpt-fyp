import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function getAllPages() {
  return sql`SELECT * FROM pages ORDER BY "updatedAt" DESC`
}

export async function getPageById(id: number) {
  const rows = await sql`SELECT * FROM pages WHERE id = ${id}`
  return rows[0] ?? null
}

export async function createPage(data: {
  title: string
  slug: string
  content: string
  category: string
  published: boolean
  authorId: number
}) {
  const rows = await sql`
    INSERT INTO pages (title, slug, content, category, published, "authorId")
    VALUES (${data.title}, ${data.slug}, ${data.content}, ${data.category}, ${data.published}, ${data.authorId})
    RETURNING *
  `
  return rows[0]
}

export async function updatePage(id: number, data: {
  title: string
  slug: string
  content: string
  category: string
  published: boolean
}) {
  const rows = await sql`
    UPDATE pages
    SET title = ${data.title}, slug = ${data.slug}, content = ${data.content},
        category = ${data.category}, published = ${data.published}, "updatedAt" = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] ?? null
}

export async function deletePage(id: number) {
  await sql`DELETE FROM pages WHERE id = ${id}`
}
