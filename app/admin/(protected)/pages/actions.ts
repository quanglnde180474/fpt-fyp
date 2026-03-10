'use server'

import { createPage, updatePage, deletePage } from '@/lib/services/pages.service'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPageAction(formData: FormData) {
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

  await createPage({ title, slug, content, category, published, authorId: Number(session.userId) })

  revalidatePath('/admin/pages')
  revalidatePath('/student-portal')
  redirect('/admin/pages')
}

export async function updatePageAction(id: number, formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'on'

  await updatePage(id, { title, slug, content, category, published })

  revalidatePath('/admin/pages')
  revalidatePath(`/admin/pages/${id}`)
  revalidatePath(`/p/${slug}`)
  revalidatePath('/student-portal')
  redirect('/admin/pages')
}

export async function deletePageAction(id: number) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  await deletePage(id)

  revalidatePath('/admin/pages')
  revalidatePath('/student-portal')
}
