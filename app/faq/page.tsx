import { neon } from "@neondatabase/serverless";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { FaqList } from "./faq-list";

const sql = neon(process.env.DATABASE_URL!);

export default async function FAQPage() {
  let faqs: any[] = [];
  try {
    faqs = await sql`SELECT * FROM faqs ORDER BY category, "order" ASC`;
  } catch (e) {
    console.error("Error fetching FAQs:", e);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Câu hỏi thường gặp
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Tìm câu trả lời cho các câu hỏi phổ biến từ sinh viên FPT Playbook
          </p>
        </div>
      </div>

      <FaqList faqs={faqs} />

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Vẫn còn câu hỏi?
          </h2>
          <p className="text-muted-foreground mb-6">
            Không tìm thấy câu trả lời bạn đang tìm? Liên hệ với chúng tôi để
            được hỗ trợ.
          </p>
          <Button asChild size="lg">
            <a href="https://www.facebook.com/daihocfptdanang">Liên hệ</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
