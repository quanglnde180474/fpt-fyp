'use server'

import { neon } from '@neondatabase/serverless'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const sql = neon(process.env.DATABASE_URL!)

export async function createFaq(formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string
  const category = formData.get('category') as string
  const order = Number(formData.get('order') || 0)

  await sql`
    INSERT INTO faqs (question, answer, category, "order")
    VALUES (${question}, ${answer}, ${category}, ${order})
  `

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  redirect('/admin/faqs')
}

export async function updateFaq(id: number, formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string
  const category = formData.get('category') as string
  const order = Number(formData.get('order') || 0)

  await sql`
    UPDATE faqs
    SET question = ${question}, answer = ${answer},
        category = ${category}, "order" = ${order}
    WHERE id = ${id}
  `

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  redirect('/admin/faqs')
}

export async function deleteFaq(id: number) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  await sql`DELETE FROM faqs WHERE id = ${id}`

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
}
