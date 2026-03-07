import { neon } from "@neondatabase/serverless";
import { Header } from "@/components/header";
import Link from "next/link";
import { Megaphone, ChevronRight } from "lucide-react";

const sql = neon(process.env.DATABASE_URL!);

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

export default async function AnnouncementsPage() {
  let announcements: any[] = [];
  try {
    announcements = await sql`
      SELECT id, title, category, content, "publishedAt"
      FROM announcements
      WHERE "publishedAt" IS NOT NULL
      ORDER BY "publishedAt" DESC
    `;
  } catch (e) {
    console.error("Error fetching announcements:", e);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Megaphone className="h-7 w-7 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Tin tức</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Cập nhật thông tin mới nhất về trường, sự kiện và các thông báo quan
            trọng dành cho sinh viên FPT Playbook.
          </p>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          {announcements.length === 0 ? (
            <div className="text-center py-20">
              <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Chưa có thông báo nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <Link
                  key={ann.id}
                  href={`/announcements/${ann.id}`}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[ann.category] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {CATEGORY_LABELS[ann.category] ?? ann.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(ann.publishedAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-1">
                      {ann.title}
                    </h2>
                    <p
                      className="text-sm text-muted-foreground mt-1 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          ann.content?.replace(/<[^>]+>/g, " ").slice(0, 120) +
                          "…",
                      }}
                    />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
