'use server'

import { neon } from '@neondatabase/serverless'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const sql = neon(process.env.DATABASE_URL!)

export async function createPage(formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'on'

  if (!title || !slug || !content || content === '<p><br></p>') {
    throw new Error('Title, slug and content are required')
  }

  await sql`
    INSERT INTO pages (title, slug, content, category, published, "authorId")
    VALUES (${title}, ${slug}, ${content}, ${category}, ${published}, ${Number(session.userId)})
  `

  revalidatePath('/admin/pages')
  redirect('/admin/pages')
}

export async function updatePage(id: number, formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'on'

  await sql`
    UPDATE pages
    SET title = ${title}, slug = ${slug}, content = ${content},
        category = ${category}, published = ${published}, "updatedAt" = NOW()
    WHERE id = ${id}
  `

  revalidatePath('/admin/pages')
  revalidatePath(`/admin/pages/${id}`)
  redirect('/admin/pages')
}

export async function deletePage(id: number) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  await sql`DELETE FROM pages WHERE id = ${id}`

  revalidatePath('/admin/pages')
}
