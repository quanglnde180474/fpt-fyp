import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getAllAnnouncements, createAnnouncement } from '@/lib/services/announcements.service'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const announcements = await getAllAnnouncements()
  return NextResponse.json(announcements)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, content, category, published } = body

  if (!title || !content || content === '<p><br></p>') {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const announcement = await createAnnouncement({
    title,
    content,
    category: category ?? 'general',
    published: !!published,
    authorId: Number(session.userId),
  })

  return NextResponse.json(announcement, { status: 201 })
}
