import { neon } from "@neondatabase/serverless";
import { Header } from "@/components/header";
import { notFound } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);

export const revalidate = 3600; // re-render at most once per hour

export async function generateStaticParams() {
  try {
    const rows = await sql`SELECT slug FROM pages WHERE published = true`;
    return rows.map((r) => ({ slug: r.slug as string }));
  } catch {
    return [];
  }
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result =
    await sql`SELECT * FROM pages WHERE slug = ${slug} AND published = true`;
  const page = result[0];
  if (!page) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            {page.category}
          </p>
          <h1 className="text-4xl font-bold text-foreground">{page.title}</h1>
        </div>
      </div>

      {/* Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <article
            className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:bg-muted prose-code:px-1 prose-code:rounded
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-li:text-muted-foreground
            prose-img:max-w-full prose-img:rounded-lg
            [&_table]:w-full [&_table]:overflow-x-auto [&_table]:block
            overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </div>
  );
}
