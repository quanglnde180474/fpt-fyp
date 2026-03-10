import sql from '@/lib/db'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QnaMetadata {
  content: string
  authorName: string
  authorEmail?: string | null
  views: number
  answers: QnaAnswer[]
}

export interface QnaAnswer {
  id: number
  content: string
  authorName: string
  authorEmail?: string | null
  createdAt: string
}

function parseMetadata(raw: string | null): QnaMetadata {
  try {
    return raw ? JSON.parse(raw) : { content: '', authorName: 'Unknown', answers: [], views: 0 }
  } catch {
    return { content: '', authorName: 'Unknown', answers: [], views: 0 }
  }
}

// ─── Public reads ─────────────────────────────────────────────────────────────

/** List page — only lightweight fields, no full content blob */
export async function getAllQuestions() {
  const rows = await sql`
    SELECT id, question, answer, "createdAt"
    FROM faqs
    WHERE category = 'qna'
    ORDER BY "createdAt" DESC
  `
  return rows.map((row: any) => {
    const meta = parseMetadata(row.answer)
    return {
      id: row.id,
      title: row.question,
      authorName: meta.authorName ?? 'Unknown',
      views: meta.views ?? 0,
      answerCount: meta.answers?.length ?? 0,
      createdAt: row.createdAt,
    }
  })
}

/** Detail page — full metadata */
export async function getQuestionById(id: number) {
  const rows = await sql`
    SELECT id, question, answer, "createdAt"
    FROM faqs
    WHERE id = ${id} AND category = 'qna'
  `
  const row = rows[0]
  if (!row) return null

  const meta = parseMetadata(row.answer)
  return {
    id: row.id,
    title: row.question,
    content: meta.content ?? '',
    authorName: meta.authorName ?? 'Unknown',
    authorEmail: meta.authorEmail ?? null,
    views: meta.views ?? 0,
    answers: meta.answers ?? [],
    createdAt: row.createdAt,
    _rawMetadata: meta, // kept for mutation helpers
  }
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createQuestion(data: {
  title: string
  content: string
  authorName: string
  authorEmail?: string | null
}) {
  const metadata: QnaMetadata = {
    content: data.content,
    authorName: data.authorName,
    authorEmail: data.authorEmail ?? null,
    views: 0,
    answers: [],
  }
  const rows = await sql`
    INSERT INTO faqs (question, answer, category, "order", "createdAt")
    VALUES (${data.title}, ${JSON.stringify(metadata)}, 'qna', 0, NOW())
    RETURNING id, question, "createdAt"
  `
  return { id: rows[0].id, title: rows[0].question, ...metadata, createdAt: rows[0].createdAt }
}

export async function addAnswer(questionId: number, answer: {
  content: string
  authorName: string
  authorEmail?: string | null
}) {
  const rows = await sql`
    SELECT id, answer FROM faqs
    WHERE id = ${questionId} AND category = 'qna'
  `
  const row = rows[0]
  if (!row) return null

  const meta = parseMetadata(row.answer)
  const newAnswer: QnaAnswer = {
    id: Date.now(),
    content: answer.content,
    authorName: answer.authorName,
    authorEmail: answer.authorEmail ?? null,
    createdAt: new Date().toISOString(),
  }
  meta.answers = meta.answers ?? []
  meta.answers.push(newAnswer)

  await sql`UPDATE faqs SET answer = ${JSON.stringify(meta)} WHERE id = ${questionId}`
  return newAnswer
}

export async function incrementViews(questionId: number) {
  const rows = await sql`SELECT answer FROM faqs WHERE id = ${questionId} AND category = 'qna'`
  const row = rows[0]
  if (!row) return

  const meta = parseMetadata(row.answer)
  meta.views = (meta.views ?? 0) + 1
  await sql`UPDATE faqs SET answer = ${JSON.stringify(meta)} WHERE id = ${questionId}`
}
