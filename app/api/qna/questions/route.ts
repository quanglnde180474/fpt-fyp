import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// GET all Q&A questions (public)
export async function GET() {
  try {
    const questions = await sql`
      SELECT id, question, answer, "createdAt"
      FROM faqs
      WHERE category = 'qna'
      ORDER BY "createdAt" DESC
    `

    // Parse the answer field which stores JSON metadata
    const questionsWithParsedAnswers = questions.map((q: any) => {
      let metadata
      try {
        metadata = q.answer ? JSON.parse(q.answer) : { answers: [] }
      } catch {
        metadata = { answers: [] }
      }
      return {
        id: q.id,
        title: q.question,
        createdAt: q.createdAt,
        answerCount: metadata.answers?.length || 0,
        ...metadata,
      }
    })

    return NextResponse.json(questionsWithParsedAnswers)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

// POST new question (public - no auth required)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, content, authorName, authorEmail } = body

    if (!title || !content || !authorName) {
      return NextResponse.json(
        { error: 'Title, content, and author name are required' },
        { status: 400 }
      )
    }

    // Store metadata in the answer field
    const metadata = {
      content,
      authorName,
      authorEmail: authorEmail || null,
      views: 0,
      answers: [],
    }

    // Create FAQ entry with category 'qna'
    const [question] = await sql`
      INSERT INTO faqs (question, answer, category, "order", "createdAt")
      VALUES (${title}, ${JSON.stringify(metadata)}, 'qna', 0, NOW())
      RETURNING id, question, answer, "createdAt"
    `

    return NextResponse.json({ id: question.id, title: question.question, ...metadata, createdAt: question.createdAt }, { status: 201 })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
