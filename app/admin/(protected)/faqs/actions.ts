'use server'

import { createFaq, updateFaq, deleteFaq } from '@/lib/services/faqs.service'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createFaqAction(formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string
  const category = formData.get('category') as string
  const order = Number(formData.get('order') || 0)

  await createFaq({ question, answer, category, order })

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  redirect('/admin/faqs')
}

export async function updateFaqAction(id: number, formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string
  const category = formData.get('category') as string
  const order = Number(formData.get('order') || 0)

  await updateFaq(id, { question, answer, category, order })

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
  redirect('/admin/faqs')
}

export async function deleteFaqAction(id: number) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  await deleteFaq(id)

  revalidatePath('/admin/faqs')
  revalidatePath('/faq')
}
