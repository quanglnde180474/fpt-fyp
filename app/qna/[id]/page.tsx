import { neon } from "@neondatabase/serverless";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerForm } from "./answer-form";

const sql = neon(process.env.DATABASE_URL!);

export const revalidate = 0; // Disable cache for real-time updates

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const questionId = parseInt(id);

  if (isNaN(questionId)) {
    notFound();
  }

  let question: any = null;
  let answers: any[] = [];

  try {
    const [faqData] = await sql`
      SELECT id, question, answer, "createdAt"
      FROM faqs
      WHERE id = ${questionId} AND category = 'qna'
    `;

    if (!faqData) {
      notFound();
    }

    // Parse metadata from answer field
    let metadata;
    try {
      metadata = JSON.parse(faqData.answer);
    } catch {
      metadata = {
        content: "",
        authorName: "Unknown",
        authorEmail: null,
        views: 0,
        answers: [],
      };
    }

    question = {
      id: faqData.id,
      title: faqData.question,
      content: metadata.content || "",
      authorName: metadata.authorName || "Unknown",
      authorEmail: metadata.authorEmail,
      views: metadata.views || 0,
      createdAt: faqData.createdAt,
    };

    answers = metadata.answers || [];
  } catch (e) {
    console.error("Error fetching question:", e);
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/qna">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-8">
          {/* Question */}
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold text-foreground">
                {question.title}
              </h1>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {question.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {question.views} lượt xem
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {answers.length} câu trả lời
              </span>
              <span>
                {new Date(question.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="prose prose-sm max-w-none text-foreground">
              <p className="whitespace-pre-wrap">{question.content}</p>
            </div>
          </div>

          {/* Answers */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {answers.length > 0
                ? `${answers.length} Câu trả lời`
                : "Chưa có câu trả lời"}
            </h2>

            <div className="space-y-4 mb-8">
              {answers.map((answer: any) => (
                <div
                  key={answer.id}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{answer.authorName}</span>
                    <span>•</span>
                    <span>
                      {new Date(answer.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none text-foreground">
                    <p className="whitespace-pre-wrap">{answer.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Form */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Viết câu trả lời của bạn
              </h3>
              <AnswerForm questionId={questionId} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
