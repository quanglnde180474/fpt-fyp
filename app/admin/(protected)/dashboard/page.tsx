import { getDashboardStats } from "@/lib/services/stats.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, MessageSquare, HelpCircle } from "lucide-react";

export default async function DashboardPage() {
  const stats = await getDashboardStats().catch(() => ({
    totalPages: 0,
    totalCourses: 0,
    publishedAnnouncements: 0,
    totalFaqs: 0,
  }));

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
      </div>
    </div>
  );
}
