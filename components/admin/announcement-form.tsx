"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuillEditor } from "@/components/quill-editor";
import Link from "next/link";

type AnnouncementFormProps = {
  id?: number;
  defaultValues?: {
    title: string;
    category: string;
    content: string;
    published: boolean;
  };
};

export function AnnouncementForm({ id, defaultValues }: AnnouncementFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [category, setCategory] = useState(
    defaultValues?.category ?? "general",
  );
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [published, setPublished] = useState(defaultValues?.published ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(
        id ? `/api/admin/announcements/${id}` : "/api/admin/announcements",
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category, content, published }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }

      router.push("/admin/announcements");
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
        <CardTitle>Announcement Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="general">Chung</option>
              <option value="academic">Học tập</option>
              <option value="event">Sự kiện</option>
              <option value="urgent">Khẩn cấp</option>
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
              {submitting
                ? "Saving…"
                : id
                  ? "Save Changes"
                  : "Create Announcement"}
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/announcements">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
