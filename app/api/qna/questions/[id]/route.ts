import { NextRequest, NextResponse } from 'next/server'
import { getQuestionById, incrementViews } from '@/lib/services/qna.service'

// GET single question by ID (public)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const questionId = parseInt(id)

    if (isNaN(questionId)) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 })
    }

    const question = await getQuestionById(questionId)
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Fire-and-forget view increment — don't block the response
    incrementViews(questionId).catch(() => {})

    return NextResponse.json(question)
  } catch (error) {
    console.error('Error fetching question:', error)
    return NextResponse.json({ error: 'Failed to fetch question' }, { status: 500 })
  }
}
