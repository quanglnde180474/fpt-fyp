import { Header } from "@/components/header";
import { getPublishedPages } from "@/lib/services/pages.service";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  docs: "Tài liệu & Hướng dẫn",
  handbook: "Cẩm nang Sinh viên",
  guide: "Hướng dẫn",
};

export default async function StudentPortal() {
  let pagesByCategory: Record<string, any[]> = {};
  try {
    pagesByCategory = await getPublishedPages();
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
  const categories = Object.keys(pagesByCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Student Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tài liệu, hướng dẫn và cẩm nang cho sinh viên FFYB.
          </p>
        </div>
      </div>

      {/* Pages by Category */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {categories.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Chưa có tài liệu nào được đăng.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((cat) => (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 rounded-full bg-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pagesByCategory[cat].map((page: any) => (
                      <Link
                        key={page.id}
                        href={`/p/${page.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-sm transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition shrink-0">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground group-hover:text-primary transition">
                            {page.title}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
