import sql from '@/lib/db'

// ─── Public ──────────────────────────────────────────────────────────────────

/** For the public /faq page — excludes qna-category rows */
export async function getPublishedFaqs() {
  return sql`
    SELECT id, question, answer, category, "order"
    FROM faqs
    WHERE category != 'qna'
    ORDER BY category, "order" ASC
  `
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/** Full list for admin table */
export async function getAllFaqs() {
  return sql`
    SELECT id, question, answer, category, "order"
    FROM faqs
    WHERE category != 'qna'
    ORDER BY category, "order" ASC
  `
}

export async function getFaqById(id: number) {
  const rows = await sql`
    SELECT id, question, answer, category, "order"
    FROM faqs
    WHERE id = ${id}
  `
  return rows[0] ?? null
}

export async function createFaq(data: {
  question: string
  answer: string
  category: string
  order: number
}) {
  await sql`
    INSERT INTO faqs (question, answer, category, "order")
    VALUES (${data.question}, ${data.answer}, ${data.category}, ${data.order})
  `
}

export async function updateFaq(id: number, data: {
  question: string
  answer: string
  category: string
  order: number
}) {
  await sql`
    UPDATE faqs
    SET question = ${data.question}, answer = ${data.answer},
        category = ${data.category}, "order" = ${data.order}
    WHERE id = ${id}
  `
}

export async function deleteFaq(id: number) {
  await sql`DELETE FROM faqs WHERE id = ${id}`
}
