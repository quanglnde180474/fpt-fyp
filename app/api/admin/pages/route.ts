import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getAllPages, createPage } from '@/lib/services/pages.service'

export async function GET() {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const pages = await getAllPages()
  return NextResponse.json(pages)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, slug, content, category, published } = body

  if (!title || !slug || !content || content === '<p><br></p>') {
    return NextResponse.json({ error: 'Title, slug and content are required' }, { status: 400 })
  }

  const page = await createPage({
    title,
    slug,
    content,
    category: category ?? 'docs',
    published: !!published,
    authorId: Number(session.userId),
  })

  return NextResponse.json(page, { status: 201 })
}
