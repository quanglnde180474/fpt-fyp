import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// POST new answer to a question (public - no auth required)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { content, authorName, authorEmail, questionId } = body

    if (!content || !authorName || !questionId) {
      return NextResponse.json(
        { error: 'Content, author name, and question ID are required' },
        { status: 400 }
      )
    }

    // Check if question exists
    const [faq] = await sql`
      SELECT id, answer, category
      FROM faqs
      WHERE id = ${parseInt(questionId)} AND category = 'qna'
    `

    if (!faq) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Parse existing metadata
    let metadata
    try {
      metadata = JSON.parse(faq.answer)
    } catch {
      metadata = { content: '', authorName: 'Unknown', answers: [], views: 0 }
    }

    // Add new answer
    const newAnswer = {
      id: Date.now(),
      content,
      authorName,
      authorEmail: authorEmail || null,
      createdAt: new Date().toISOString(),
    }

    metadata.answers = metadata.answers || []
    metadata.answers.push(newAnswer)

    // Update FAQ entry
    await sql`
      UPDATE faqs
      SET answer = ${JSON.stringify(metadata)}
      WHERE id = ${parseInt(questionId)}
    `

    return NextResponse.json(newAnswer, { status: 201 })
  } catch (error) {
    console.error('Error creating answer:', error)
    return NextResponse.json({ error: 'Failed to create answer' }, { status: 500 })
  }
}
