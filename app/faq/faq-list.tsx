"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQItem } from "./faq-item";

const CATEGORY_LABELS: Record<string, string> = {
  academics: "Học tập",
  finance: "Tài chính",
  regulations: "Quy định & Chính sách",
  support: "Hỗ trợ & Tài nguyên",
  general: "Chung",
};

type FAQ = { id: number; question: string; answer: string; category: string };

export function FaqList({ faqs }: { faqs: FAQ[] }) {
  const [search, setSearch] = useState("");

  const grouped = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const filtered = Object.entries(grouped)
    .map(([category, items]) => ({
      category,
      items: items.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      <div className="max-w-md"></div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Không tìm thấy câu hỏi phù hợp
              </p>
              <Button onClick={() => setSearch("")} variant="outline">
                Xóa tìm kiếm
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filtered.map((section) => (
                <div key={section.category}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {CATEGORY_LABELS[section.category] ?? section.category}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <FAQItem
                        key={item.id}
                        q={item.question}
                        a={item.answer}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
