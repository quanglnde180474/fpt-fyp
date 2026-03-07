import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function getPages() {
  try {
    const result = await sql`SELECT * FROM pages ORDER BY created_at DESC`
    return result as any[]
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const result = await sql`SELECT * FROM pages WHERE slug = ${slug}`
    return result[0] as any
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function getCourses() {
  try {
    const result = await sql`SELECT * FROM courses ORDER BY name`
    return result as any[]
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export async function getSchedules() {
  try {
    const result = await sql`SELECT * FROM schedules ORDER BY date`
    return result as any[]
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return []
  }
}

export async function getServices() {
  try {
    const result = await sql`SELECT * FROM services ORDER BY name`
    return result as any[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getAnnouncements() {
  try {
    const result = await sql`SELECT * FROM announcements WHERE published = true ORDER BY created_at DESC`
    return result as any[]
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}

export async function getFaqs() {
  try {
    const result = await sql`SELECT * FROM faqs WHERE published = true ORDER BY category, id`
    return result as any[]
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

// Admin queries
export async function createPage(data: any) {
  try {
    const result = await sql`
      INSERT INTO pages (title, slug, content, category, published, created_at, updated_at)
      VALUES (${data.title}, ${data.slug}, ${data.content}, ${data.category}, true, NOW(), NOW())
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error creating page:', error)
    return null
  }
}

export async function updatePage(id: string, data: any) {
  try {
    const result = await sql`
      UPDATE pages 
      SET title = ${data.title}, content = ${data.content}, category = ${data.category}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error updating page:', error)
    return null
  }
}

export async function deletePage(id: string) {
  try {
    await sql`DELETE FROM pages WHERE id = ${id}`
    return true
  } catch (error) {
    console.error('Error deleting page:', error)
    return false
  }
}
