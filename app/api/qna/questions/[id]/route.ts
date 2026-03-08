import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// GET single question by ID (public)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questionId = parseInt(id);

    if (isNaN(questionId)) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 })
    }

    const [faq] = await sql`
      SELECT id, question, answer, category, "createdAt"
      FROM faqs
      WHERE id = ${questionId} AND category = 'qna'
    `

    if (!faq) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Parse the stored metadata
    let metadata
    try {
      metadata = JSON.parse(faq.answer)
    } catch {
      metadata = { content: '', authorName: 'Unknown', answers: [], views: 0 }
    }

    // Increment view count
    metadata.views = (metadata.views || 0) + 1
    
    await sql`
      UPDATE faqs
      SET answer = ${JSON.stringify(metadata)}
      WHERE id = ${questionId}
    `

    return NextResponse.json({
      id: faq.id,
      title: faq.question,
      ...metadata,
      createdAt: faq.createdAt,
    })
  } catch (error) {
    console.error('Error fetching question:', error)
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 })
  }
}
