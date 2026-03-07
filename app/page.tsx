import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Users, Calendar, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">
                  Chào mừng Tân sinh viên Đại Học FPT
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
                  FPT First Year
                  <span className="block text-primary">Playbook</span>
                </h1>
              </div>

              <p className="text-lg text-muted-foreground max-w-lg">
                Cuốn cẩm nang tổng hợp giải pháp ban vững trong năm đầu học.
                Khám phá lộ trình học tập, thông tin campus và bắt đầu hành
                trình của bạn tại đây.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/student-portal">Khám phá ngay</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/docs">Tài liệu</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 lg:h-full hidden lg:block">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img
                  src="/images/truong-fpt-university.jpg"
                  alt="FPT University"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Hỗ trợ học tập
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tất cả những gì bạn cần để thành công trong năm đầu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: "Lịch học & Quy định",
                description:
                  "Xem toàn bộ lịch học, thời gian thi và các quy định quan trọng của chương trình",
              },
              {
                icon: BookOpen,
                title: "Tài liệu học tập",
                description:
                  "Truy cập trực tiếp tài liệu bài giảng, syllabus và các tài nguyên học tập",
              },
              {
                icon: Users,
                title: "Dịch vụ sinh viên",
                description:
                  "Tìm hiểu các dịch vụ hỗ trợ, từ tư vấn học tập đến hỗ trợ kỹ thuật",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Chia sẻ từ sinh viên
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Những kinh nghiệm từ các sinh viên thành công
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                quote:
                  "Cái đoan chuyên tập lên là học khó ngoài dự kiến, nhưng với FFYB tôi có sự chuẩn bị tốt hơn.",
                author: "Nguyễn Văn A",
                role: "K20 - Kỹ thuật phần mềm - FUDA",
              },
              {
                quote:
                  "Đúng bước lên các hoạt động của khoá, thật rất hữu ích để có dự định chi tiết cho tất cả những điều tôi cần để thành công.",
                author: "Trần Thị B",
                role: "K20 - Kinh doanh quốc tế - HOLA",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="text-muted-foreground italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-xs font-semibold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-primary/5">
        <div className="container mx-auto">
          <div className="rounded-2xl bg-linear-to-r from-primary to-primary/80 px-8 py-12 sm:py-16 text-center text-primary-foreground">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Khám phá toàn bộ tài nguyên và lịch trình của bạn ngay bây giờ
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/student-portal">Truy cập Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                FPT Playbook
              </h3>
              <p className="text-sm text-muted-foreground">
                Cùng sinh viên hướng tới học tập và phát triển bền vững.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Liên kết nhanh
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/student-portal"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Hệ thống
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Tài liệu
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Tài nguyên</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/handbook"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cẩm nang
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Về chúng tôi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Hỗ trợ</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.facebook.com/daihocfptdanang"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@fpt.edu.vn"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    support@fpt.edu.vn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FPT University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
