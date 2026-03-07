import { neon } from "@neondatabase/serverless";
import { Button } from "@/components/ui/button";
import { PageForm } from "@/components/admin/page-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) notFound();
  const result = await sql`SELECT * FROM pages WHERE id = ${numId}`;
  const page = result[0];
  if (!page) notFound();

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
            <h1 className="text-3xl font-bold text-foreground">Edit Page</h1>
            <p className="text-muted-foreground">{page.slug}</p>
          </div>
        </div>
        <PageForm
          id={numId}
          defaultValues={{
            title: page.title,
            slug: page.slug,
            content: page.content,
            category: page.category,
            published: page.published,
          }}
        />
      </div>
    </div>
  );
}
