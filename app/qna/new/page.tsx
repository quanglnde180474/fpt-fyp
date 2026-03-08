"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ANONYMOUS_NAMES = [
  "sinhvienchamhoc",
  "andanh",
  "nguoilamua",
  "banhocdotcom",
  "khoahoc2024",
  "fptian",
  "svfpt",
  "nguoitolalala",
  "anonymousfpt",
  "sinhviengiongheo",
  "banbebia",
  "devtodo",
  "codingfpt",
  "fpter123",
];

function getRandomName() {
  return ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)];
}

export default function NewQuestionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/qna/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          authorName: getRandomName(),
          authorEmail: null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Không thể tạo câu hỏi");
      }

      const question = await res.json();
      toast.success("Câu hỏi đã được đăng thành công!");
      router.push(`/qna/${question.id}`);
    } catch (error: any) {
      toast.error(error.message || "Đã có lỗi xảy ra");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/qna">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Đặt câu hỏi mới
          </h1>
          <p className="text-muted-foreground mt-2">
            Chia sẻ câu hỏi của bạn với cộng đồng
          </p>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Tiêu đề câu hỏi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Nhập tiêu đề ngắn gọn cho câu hỏi..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  placeholder="Mô tả chi tiết câu hỏi của bạn..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={10}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Câu hỏi của bạn sẽ được đăng ẩn danh
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" asChild>
                <Link href="/qna">Hủy</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Đang đăng..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Đăng câu hỏi
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
