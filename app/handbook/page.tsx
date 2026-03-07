import { Header } from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HandbookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Cẩm nang sinh viên</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hướng dẫn toàn diện về các chính sách, quy định và kỳ vọng cho sinh viên FFYB
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Tabs defaultValue="regulations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="regulations">Quy định</TabsTrigger>
              <TabsTrigger value="gpa">Cách tính GPA</TabsTrigger>
              <TabsTrigger value="exam">Kỳ thi</TabsTrigger>
            </TabsList>

            {/* Regulations Tab */}
            <TabsContent value="regulations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quy định chung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Điểm danh</h3>
                    <p className="text-muted-foreground">
                      Sự tham dự là bắt buộc cho tất cả các lớp học. Nếu bạn vắng mặt, hãy thông báo cho giảng viên trong vòng 24 giờ.
                      Ba lần vắng mặt không có phép có thể dẫn đến việc bị loại khỏi khóa học.
                    </p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-2">Kỷ luật học tập</h3>
                    <p className="text-muted-foreground mb-3">
                      Gian lận học tập sẽ bị xử lý nghiêm khắc, bao gồm:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                      <li>• Sao chép bài tập: Điểm 0 cho bài tập đó</li>
                      <li>• Gian lận trong kỳ thi: Điểm 0 cho kỳ thi đó</li>
                      <li>• Vi phạm lặp lại: Có thể bị kỷ luật cao hơn</li>
                    </ul>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-2">Hành vi chính yếu</h3>
                    <p className="text-muted-foreground">
                      Sinh viên dự kiến sẽ duy trì tiêu chuẩn cao về hành vi nhân vật. Điều này bao gồm tôn trọng giảng viên và bạn cùng lớp,
                      tuân theo các quy tắc lớp học, và tham gia một cách tích cực trong học tập.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GPA Tab */}
            <TabsContent value="gpa" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tính toán điểm GPA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Thành phần điểm</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Điểm chuyên cần', percentage: '10%', desc: 'Tham dự lớp học và bài tập' },
                        { label: 'Điểm quá trình', percentage: '30%', desc: 'Lab, Quiz và bài tập trong lớp' },
                        { label: 'Bài kiểm tra giữa kỳ', percentage: '20%', desc: 'Mid-term test' },
                        { label: 'Thi cuối kỳ', percentage: '40%', desc: 'Final exam' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div>
                            <p className="font-semibold text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                          <p className="text-lg font-bold text-primary">{item.percentage}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-3">Tiêu chí đạt tiêu chuẩn</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>✓ Tổng điểm ≥ 5.0</li>
                      <li>✓ Điểm thi cuối kỳ ≥ 4.0</li>
                      <li>✗ Nếu không đạt tiêu chuẩn, bạn phải học lại khóa học</li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-foreground font-semibold mb-1">Ghi chú:</p>
                    <p className="text-sm text-muted-foreground">
                      GPA toàn khóa học được tính từ trung bình các lớp học. Hãy kiên trì và nỗ lực không ngừng!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Exam Tab */}
            <TabsContent value="exam" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin thi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Các loại kỳ thi</h3>
                    <div className="space-y-4">
                      {[
                        {
                          type: 'Bảo vệ Assignment (EOS)',
                          time: 'Tháng 10',
                          format: 'Online',
                          desc: 'Trình bày và bảo vệ các dự án khóa học'
                        },
                        {
                          type: 'Thi thực hành (PE)',
                          time: 'Tháng 12',
                          format: 'Tại phòng',
                          desc: 'Bài thi thực hành trong phòng máy'
                        },
                        {
                          type: 'Thi trắc nghiệm (FE)',
                          time: 'Tháng 10',
                          format: 'Tại phòng',
                          desc: 'Bài thi lý thuyết trắc nghiệm'
                        }
                      ].map((exam, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-foreground">{exam.type}</p>
                              <p className="text-sm text-muted-foreground">{exam.desc}</p>
                            </div>
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                              {exam.format}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{exam.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-3">Chuẩn bị cho kỳ thi</h3>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                      <li>• Bắt đầu học từ sớm - không học lâu đêm trước thi</li>
                      <li>• Tham dự tất cả các lớp học và buổi ôn tập</li>
                      <li>• Thực hành với các bài tập và đề thi mẫu</li>
                      <li>• Ngủ đủ giấc trước ngày thi</li>
                      <li>• Đến phòng thi sớm 15 phút</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
