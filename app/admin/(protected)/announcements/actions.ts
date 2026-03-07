'use server'

import { neon } from '@neondatabase/serverless'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const sql = neon(process.env.DATABASE_URL!)

export async function createAnnouncement(formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const publish = formData.get('published') === 'on'

  await sql`
    INSERT INTO announcements (title, content, category, "authorId", "publishedAt")
    VALUES (
      ${title}, ${content}, ${category}, ${Number(session.userId)},
      ${publish ? new Date().toISOString() : null}
    )
  `

  revalidatePath('/admin/announcements')
  redirect('/admin/announcements')
}

export async function updateAnnouncement(id: number, formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const publish = formData.get('published') === 'on'

  // Fetch existing to preserve original publishedAt if already published
  const existing = await sql`SELECT "publishedAt" FROM announcements WHERE id = ${id}`
  const alreadyPublished = existing[0]?.publishedAt

  await sql`
    UPDATE announcements
    SET title = ${title}, content = ${content}, category = ${category},
        "publishedAt" = ${publish ? (alreadyPublished ?? new Date().toISOString()) : null},
        "updatedAt" = NOW()
    WHERE id = ${id}
  `

  revalidatePath('/admin/announcements')
  redirect('/admin/announcements')
}

export async function deleteAnnouncement(id: number) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  await sql`DELETE FROM announcements WHERE id = ${id}`

  revalidatePath('/admin/announcements')
}
