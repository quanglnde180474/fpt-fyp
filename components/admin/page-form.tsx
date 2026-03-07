"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuillEditor } from "@/components/quill-editor";
import { TitleSlugFields } from "@/components/title-slug-fields";
import Link from "next/link";

type PageFormProps = {
  id?: number;
  defaultValues?: {
    title: string;
    slug: string;
    content: string;
    category: string;
    published: boolean;
  };
};

export function PageForm({ id, defaultValues }: PageFormProps) {
  const router = useRouter();
  const [category, setCategory] = useState(defaultValues?.category ?? "docs");
  const [published, setPublished] = useState(defaultValues?.published ?? false);
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // TitleSlugFields exposes its values via hidden inputs; we read via FormData
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title") as string,
      slug: fd.get("slug") as string,
      content: fd.get("content") as string,
      category,
      published,
    };

    try {
      const res = await fetch(
        id ? `/api/admin/pages/${id}` : "/api/admin/pages",
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }

      router.push("/admin/pages");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TitleSlugFields
            defaultTitle={defaultValues?.title}
            defaultSlug={defaultValues?.slug}
          />

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="docs">Docs</option>
              <option value="handbook">Handbook</option>
              <option value="guide">Guide</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <QuillEditor
              name="content"
              initialValue={content}
              onChange={setContent}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="published">
              {id ? "Published" : "Publish immediately"}
            </Label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : id ? "Save Changes" : "Create Page"}
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/pages">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
