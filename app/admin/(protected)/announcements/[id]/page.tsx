import sql from "@/lib/db";
import { Button } from "@/components/ui/button";
import { AnnouncementForm } from "@/components/admin/announcement-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";


export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) notFound();
  const result = await sql`SELECT id, title, category, content, "publishedAt" FROM announcements WHERE id = ${numId}`;
  const ann = result[0];
  if (!ann) notFound();

  return (
    <div className="p-8 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/announcements">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Announcement
            </h1>
          </div>
        </div>
        <AnnouncementForm
          id={numId}
          defaultValues={{
            title: ann.title,
            category: ann.category,
            content: ann.content,
            published: !!ann.publishedAt,
          }}
        />
      </div>
    </div>
  );
}
