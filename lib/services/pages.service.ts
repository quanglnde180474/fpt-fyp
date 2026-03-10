import sql from '@/lib/db'

export async function getAllPages() {
  return sql`SELECT id, title, slug, category, published, "authorId", "createdAt", "updatedAt" FROM pages ORDER BY "updatedAt" DESC`
}

export async function getPublishedPages(): Promise<Record<string, any[]>> {
  const rows = await sql`
    SELECT id, title, slug, category, "updatedAt"
    FROM pages
    WHERE published = true
    ORDER BY category, "updatedAt" DESC
  `
  const grouped: Record<string, any[]> = {}
  for (const row of rows) {
    const cat = row.category as string
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(row)
  }
  return grouped
}

export async function getPageById(id: number) {
  const rows = await sql`
    SELECT id, title, slug, content, category, published, "authorId", "updatedAt"
    FROM pages WHERE id = ${id}
  `
  return rows[0] ?? null
}

export async function getPageBySlug(slug: string) {
  const rows = await sql`
    SELECT id, title, slug, content, category, "updatedAt"
    FROM pages
    WHERE slug = ${slug} AND published = true
  `
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
