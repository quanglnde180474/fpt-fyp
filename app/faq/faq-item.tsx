"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
      >
        <span className="font-semibold text-foreground text-left">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition transform shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <p className="text-muted-foreground">{a}</p>
        </div>
      )}
    </div>
  );
}
