import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAllQuestions, createQuestion } from '@/lib/services/qna.service'
import type { NextRequest } from 'next/server'

// GET all Q&A questions (public)
export async function GET() {
  try {
    const questions = await getAllQuestions()
    return NextResponse.json(questions)
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

    const question = await createQuestion({ title, content, authorName, authorEmail })
    revalidatePath('/qna')
    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
