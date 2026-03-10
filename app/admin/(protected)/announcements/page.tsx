import sql from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { deleteAnnouncementAction } from "./actions";

async function getAnnouncements() {
  try {
    const result = await sql`
      SELECT id, title, category, "publishedAt", "createdAt"
      FROM announcements ORDER BY "createdAt" DESC
    `;
    return result as any[];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

export default async function AnnouncementsAdminPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Announcements
            </h1>
            <p className="text-muted-foreground">
              Manage student announcements
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/admin/announcements/new">
              <Plus className="h-4 w-4" />
              New Announcement
            </Link>
          </Button>
        </div>

        {announcements.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No announcements yet</p>
              <Button asChild variant="outline">
                <Link href="/admin/announcements/new">
                  Create first announcement
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Title
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Category
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((ann: any) => (
                  <tr
                    key={ann.id}
                    className="border-t border-border hover:bg-muted/50 transition"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-foreground">
                        {ann.title}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {ann.content?.slice(0, 80)}…
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {ann.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          ann.publishedAt
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                        }`}
                      >
                        {ann.publishedAt ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {ann.publishedAt
                        ? new Date(ann.publishedAt).toLocaleDateString("vi-VN")
                        : new Date(ann.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/announcements/${ann.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <form
                          action={async () => {
                            "use server";
                            await deleteAnnouncementAction(ann.id);
                          }}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            type="submit"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
