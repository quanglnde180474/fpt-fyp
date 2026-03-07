import { Button } from "@/components/ui/button";
import { AnnouncementForm } from "@/components/admin/announcement-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewAnnouncementPage() {
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
              New Announcement
            </h1>
            <p className="text-muted-foreground">
              Create a student announcement
            </p>
          </div>
        </div>
        <AnnouncementForm />
      </div>
    </div>
  );
}
