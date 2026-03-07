import { Button } from "@/components/ui/button";
import { PageForm } from "@/components/admin/page-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPagePage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Page</h1>
            <p className="text-muted-foreground">
              Create a new documentation page
            </p>
          </div>
        </div>
        <PageForm />
      </div>
    </div>
  );
}
