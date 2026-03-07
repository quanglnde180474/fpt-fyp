import { neon } from "@neondatabase/serverless";
import { updateFaq } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await sql`SELECT * FROM faqs WHERE id = ${Number(id)}`;
  const faq = result[0];
  if (!faq) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateFaq(Number(id), formData);
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/faqs">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit FAQ</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>FAQ Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  name="question"
                  defaultValue={faq.question}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  name="answer"
                  defaultValue={faq.answer}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  name="category"
                  id="category"
                  defaultValue={faq.category}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="academics">Học tập</option>
                  <option value="finance">Tài chính</option>
                  <option value="regulations">Quy định</option>
                  <option value="support">Hỗ trợ</option>
                  <option value="general">Chung</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  defaultValue={faq.order}
                  min="0"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Save Changes</Button>
                <Button asChild variant="outline">
                  <Link href="/admin/faqs">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
