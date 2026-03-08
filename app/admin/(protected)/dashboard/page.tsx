import { neon } from "@neondatabase/serverless";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, HelpCircle } from "lucide-react";

const sql = neon(process.env.DATABASE_URL!);

async function getDashboardStats() {
  try {
    const [pages, courses, announcements, faqs] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM pages`,
      sql`SELECT COUNT(*) as count FROM courses`,
      sql`SELECT COUNT(*) as count FROM announcements WHERE "publishedAt" IS NOT NULL`,
      sql`SELECT COUNT(*) as count FROM faqs WHERE category != 'qna'`,
    ]);

    return {
      totalPages: Number(pages[0]?.count || 0),
      totalCourses: Number(courses[0]?.count || 0),
      publishedAnnouncements: Number(announcements[0]?.count || 0),
      totalFaqs: Number(faqs[0]?.count || 0),
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalPages: 0,
      totalCourses: 0,
      publishedAnnouncements: 0,
      totalFaqs: 0,
    };
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the FPT Playbook admin panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pages</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPages}</div>
              <p className="text-xs text-muted-foreground">Total pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Total courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Announcements
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.publishedAnnouncements}
              </div>
              <p className="text-xs text-muted-foreground">Published</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FAQs</CardTitle>
              <HelpCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFaqs}</div>
              <p className="text-xs text-muted-foreground">Total FAQs</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Content Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-foreground">Pages</p>
                  <p className="text-sm text-muted-foreground">
                    Total pages created
                  </p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {stats.totalPages}
                </p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-foreground">Courses</p>
                  <p className="text-sm text-muted-foreground">Total courses</p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {stats.totalCourses}
                </p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-foreground">Announcements</p>
                  <p className="text-sm text-muted-foreground">
                    Published announcements
                  </p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {stats.publishedAnnouncements}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">FAQs</p>
                  <p className="text-sm text-muted-foreground">Total FAQs</p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {stats.totalFaqs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/admin/pages"
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  Manage Pages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create, edit, or delete documentation pages
                </p>
              </a>
              <a
                href="/admin/courses"
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  Manage Courses
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update course information and schedules
                </p>
              </a>
              <a
                href="/admin/announcements"
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  Create Announcement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Post new announcements to the portal
                </p>
              </a>
              <a
                href="/admin/faqs"
                className="p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition"
              >
                <h3 className="font-semibold text-foreground mb-1">
                  Manage FAQs
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update frequently asked questions
                </p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
