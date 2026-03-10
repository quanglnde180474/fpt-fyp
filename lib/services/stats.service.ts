import sql from '@/lib/db'

export async function getDashboardStats() {
  const [row] = await sql`
    SELECT
      (SELECT COUNT(*) FROM pages)::int                                           AS total_pages,
      (SELECT COUNT(*) FROM courses)::int                                         AS total_courses,
      (SELECT COUNT(*) FROM announcements WHERE "publishedAt" IS NOT NULL)::int   AS published_announcements,
      (SELECT COUNT(*) FROM faqs WHERE category != 'qna')::int                   AS total_faqs
  `
  return {
    totalPages:               row?.total_pages              ?? 0,
    totalCourses:             row?.total_courses            ?? 0,
    publishedAnnouncements:   row?.published_announcements  ?? 0,
    totalFaqs:                row?.total_faqs               ?? 0,
  }
}
