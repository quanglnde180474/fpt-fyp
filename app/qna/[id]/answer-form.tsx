"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
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

export function AnswerForm({ questionId }: { questionId: number }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content) {
      toast.error("Vui lòng nhập câu trả lời");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/qna/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: formData.content,
          authorName: getRandomName(),
          authorEmail: null,
          questionId,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Không thể gửi câu trả lời");
      }

      toast.success("Câu trả lời đã được đăng thành công!");
      setFormData({ content: "" });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Đã có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="answer-content">
          Câu trả lời <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="answer-content"
          placeholder="Nhập câu trả lời của bạn..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows={6}
          required
        />
        <p className="text-xs text-muted-foreground">
          Câu trả lời của bạn sẽ được đăng ẩn danh
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            "Đang gửi..."
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Gửi câu trả lời
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
