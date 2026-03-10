'use server'

import {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '@/lib/services/announcements.service'
import { verifySession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createAnnouncementAction(formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'on'

  await createAnnouncement({
    title,
    content,
    category,
    published,
    authorId: Number(session.userId),
  })

  revalidatePath('/admin/announcements')
  revalidatePath('/announcements')
  redirect('/admin/announcements')
}

export async function updateAnnouncementAction(id: number, formData: FormData) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'on'

  await updateAnnouncement(id, { title, content, category, published })

  revalidatePath('/admin/announcements')
  revalidatePath(`/admin/announcements/${id}`)
  revalidatePath('/announcements')
  revalidatePath(`/announcements/${id}`)
  redirect('/admin/announcements')
}

export async function deleteAnnouncementAction(id: number) {
  const session = await verifySession()
  if (!session) redirect('/admin/login')

  await deleteAnnouncement(id)

  revalidatePath('/admin/announcements')
  revalidatePath('/announcements')
}
