import { verifySession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Calendar,
  MessageSquare,
  Users,
  LogOut,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/pages", icon: FileText, label: "Pages" },
  { href: "/admin/announcements", icon: MessageSquare, label: "Announcements" },
  { href: "/admin/faqs", icon: FileText, label: "FAQs" },
];

async function LogoutButton() {
  async function handleLogout() {
    "use server";
    await clearSession();
    redirect("/admin/login");
  }

  return (
    <form action={handleLogout} className="w-full">
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </form>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 mb-8"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                F
              </div>
              <span className="font-semibold text-foreground">Admin</span>
            </Link>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-muted/30">
            <div className="text-xs text-muted-foreground mb-4">
              <p className="font-semibold">{session.email}</p>
              <p>{session.role}</p>
            </div>
            <LogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-20">{children}</main>
      </div>
    </div>
  );
}
