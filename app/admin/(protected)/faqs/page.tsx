import { neon } from "@neondatabase/serverless";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";
import { deleteFaq } from "./actions";

const sql = neon(process.env.DATABASE_URL!);

async function getFaqs() {
  try {
    const result = await sql`SELECT * FROM faqs ORDER BY category, "order" ASC`;
    return result as any[];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export default async function FAQsAdminPage() {
  const faqs = await getFaqs();

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">FAQs</h1>
            <p className="text-muted-foreground">
              Manage frequently asked questions
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/admin/faqs/new">
              <Plus className="h-4 w-4" />
              New FAQ
            </Link>
          </Button>
        </div>

        {faqs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No FAQs yet</p>
              <Button asChild variant="outline">
                <Link href="/admin/faqs/new">Create your first FAQ</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Question
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Category
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Order
                  </th>
                  <th className="text-left p-4 font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq: any) => (
                  <tr
                    key={faq.id}
                    className="border-t border-border hover:bg-muted/50 transition"
                  >
                    <td className="p-4 max-w-md">
                      <p className="font-medium text-foreground line-clamp-2">
                        {faq.question}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {faq.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {faq.order}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/faqs/${faq.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <form
                          action={async () => {
                            "use server";
                            await deleteFaq(faq.id);
                          }}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            type="submit"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            🗑
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
