import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { addAnswer } from '@/lib/services/qna.service'

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

    const newAnswer = await addAnswer(parseInt(questionId), {
      content,
      authorName,
      authorEmail,
    })

    if (!newAnswer) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    revalidatePath(`/qna/${questionId}`)
    return NextResponse.json(newAnswer, { status: 201 })
  } catch (error) {
    console.error('Error creating answer:', error)
    return NextResponse.json({ error: 'Failed to create answer' }, { status: 500 })
  }
}
