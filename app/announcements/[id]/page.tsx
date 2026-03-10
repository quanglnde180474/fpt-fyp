import { getPublishedAnnouncementById } from "@/lib/services/announcements.service";
import { Header } from "@/components/header";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sanitizeQuillHtml } from "@/lib/utils";

export const revalidate = 300;

const CATEGORY_LABELS: Record<string, string> = {
  general: "Chung",
  academic: "Học tập",
  event: "Sự kiện",
  urgent: "Khẩn cấp",
};

const CATEGORY_COLORS: Record<string, string> = {
  general: "bg-blue-100 text-blue-700",
  academic: "bg-green-100 text-green-700",
  event: "bg-purple-100 text-purple-700",
  urgent: "bg-red-100 text-red-700",
};

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) notFound();

  const ann = await getPublishedAnnouncementById(numId);
  if (!ann) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/announcements"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả thông báo
          </Link>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[ann.category] ?? "bg-muted text-muted-foreground"}`}
            >
              {CATEGORY_LABELS[ann.category] ?? ann.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(ann.publishedAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{ann.title}</h1>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <article
            className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:bg-muted prose-code:px-1 prose-code:rounded
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-li:text-muted-foreground
            prose-img:max-w-full prose-img:rounded-lg
            break-words
            [&_table]:w-full [&_table]:overflow-x-auto [&_table]:block [&_table]:max-w-full"
            dangerouslySetInnerHTML={{
              __html: sanitizeQuillHtml(ann.content),
            }}
          />
        </div>
      </section>
    </div>
  );
}
