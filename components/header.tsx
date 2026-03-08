import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              F
            </div>
            <span className="font-semibold text-foreground">
              FPT<span className="text-primary">Playbook</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/announcements"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Tin tức
            </Link>
            <Link
              href="/qna"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Q&A
            </Link>
            <Link
              href="/student-portal"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Hệ thống
            </Link>
            <Link
              href="/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Câu hỏi thường gặp
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* <Button asChild variant="default" size="sm">
              <Link href="/admin/login">Đăng nhập</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
