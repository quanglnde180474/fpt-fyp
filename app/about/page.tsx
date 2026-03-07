import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Về FPT Playbook
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tìm hiểu về dự án cẩm nang sinh viên năm nhất tại FPT University
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-muted-foreground">
                FPT Playbook (FFYB) được tạo ra với mục đích hỗ trợ sinh viên
                năm nhất tại FPT University. Chúng tôi cung cấp một nền tảng tập
                trung để truy cập tài liệu, lịch biểu và các dịch vụ hỗ trợ mà
                các sinh viên cần để thành công trong năm học đầu tiên của họ.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Tại sao FFYB?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Tập trung vào sinh viên",
                    desc: "Được thiết kế bởi sinh viên, cho sinh viên - với sự hiểu biết về nhu cầu của bạn",
                  },
                  {
                    title: "Dễ sử dụng",
                    desc: "Giao diện sạch sẽ và trực quan giúp bạn tìm thông tin bạn cần một cách nhanh chóng",
                  },
                  {
                    title: "Tập hợp mọi thứ",
                    desc: "Không cần tìm kiếm trên nhiều nền tảng - mọi thứ ở một nơi",
                  },
                  {
                    title: "Được cập nhật thường xuyên",
                    desc: "Thông tin luôn được cập nhật để phản ánh những thay đổi mới nhất",
                  },
                ].map((item, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Tính năng
              </h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>
                    <strong className="text-foreground">
                      Lịch biểu toàn diện
                    </strong>{" "}
                    - Xem tất cả các lớp, bài tập và ngày thi
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>
                    <strong className="text-foreground">
                      Tài liệu khóa học
                    </strong>{" "}
                    - Truy cập tất cả các syllabus, bài giảng và tài nguyên
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>
                    <strong className="text-foreground">Dịch vụ hỗ trợ</strong>{" "}
                    - Tìm hiểu về các dịch vụ hỗ trợ sinh viên có sẵn
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>
                    <strong className="text-foreground">
                      Cẩm nang sinh viên
                    </strong>{" "}
                    - Hiểu các quy định, chính sách và kỳ vọng
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>
                    <strong className="text-foreground">FAQ</strong> - Có câu
                    trả lời cho các câu hỏi phổ biến
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Hỗ trợ & Phản hồi
              </h2>
              <p className="text-muted-foreground mb-4">
                Chúng tôi luôn muốn nghe từ bạn. Nếu bạn có bất kỳ câu hỏi, đề
                xuất hoặc phản hồi nào, vui lòng liên hệ với chúng tôi.
              </p>
              <a
                href="https://www.facebook.com/daihocfptdanang"
                className="inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Bằng các con số
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: "24K+", label: "Lượt truy cập" },
              { number: "3K+", label: "Sinh viên" },
              { number: "50+", label: "Khóa học" },
              { number: "24/7", label: "Hỗ trợ" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
