import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { updateAnnouncement, deleteAnnouncement } from '@/lib/services/announcements.service'
import { revalidatePath } from 'next/cache'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json()
  const { title, content, category, published } = body

  if (!title || !content || content === '<p><br></p>') {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const announcement = await updateAnnouncement(numId, { title, content, category, published: !!published })
  if (!announcement) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  revalidatePath('/announcements')
  return NextResponse.json(announcement)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  await deleteAnnouncement(numId)
  revalidatePath('/announcements')
  return NextResponse.json({ success: true })
}
