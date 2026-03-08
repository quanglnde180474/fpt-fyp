import { neon } from "@neondatabase/serverless";
import { Header } from "@/components/header";
import Link from "next/link";
import { MessageSquare, Plus, Eye, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sql = neon(process.env.DATABASE_URL!);

export const revalidate = 0; // Disable cache for real-time updates

export default async function QnAPage() {
  let questions: any[] = [];
  try {
    const faqs = await sql`
      SELECT id, question, answer, "createdAt"
      FROM faqs
      WHERE category = 'qna'
      ORDER BY "createdAt" DESC
    `;

    // Parse metadata from answer field
    questions = faqs.map((faq: any) => {
      let metadata;
      try {
        metadata = JSON.parse(faq.answer);
      } catch {
        metadata = { authorName: "Unknown", views: 0, answers: [] };
      }
      return {
        id: faq.id,
        title: faq.question,
        authorName: metadata.authorName || "Unknown",
        views: metadata.views || 0,
        answerCount: metadata.answers?.length || 0,
        createdAt: faq.createdAt,
      };
    });
  } catch (e) {
    console.error("Error fetching questions:", e);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-7 w-7 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">
                Q&A Cộng đồng
              </h1>
            </div>
            <Button asChild size="lg">
              <Link href="/qna/new">
                <Plus className="h-4 w-4 mr-2" />
                Đặt câu hỏi
              </Link>
            </Button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Đặt câu hỏi và nhận câu trả lời từ cộng đồng sinh viên FPT. Không
            cần đăng nhập.
          </p>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {questions.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!
              </p>
              <Button asChild>
                <Link href="/qna/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Đặt câu hỏi đầu tiên
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q) => (
                <Link
                  key={q.id}
                  href={`/qna/${q.id}`}
                  className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-sm transition"
                >
                  <h2 className="font-semibold text-lg text-foreground group-hover:text-primary transition mb-2">
                    {q.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {q.answerCount} câu trả lời
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {q.views} lượt xem
                    </span>
                    <span>Bởi {q.authorName}</span>
                    <span>
                      {new Date(q.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
