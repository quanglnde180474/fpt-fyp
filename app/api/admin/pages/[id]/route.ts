import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { updatePage, deletePage } from '@/lib/services/pages.service'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json()
  const { title, slug, content, category, published } = body

  if (!title || !slug || !content || content === '<p><br></p>') {
    return NextResponse.json({ error: 'Title, slug and content are required' }, { status: 400 })
  }

  const page = await updatePage(numId, { title, slug, content, category, published: !!published })
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(page)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  await deletePage(numId)
  return NextResponse.json({ success: true })
}
