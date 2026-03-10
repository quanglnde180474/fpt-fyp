import sql from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { deletePageAction } from "./actions";

async function getPages() {
  try {
    const result =
      await sql`SELECT id, title, slug, category, published, "updatedAt" FROM pages ORDER BY "updatedAt" DESC`;
    return result as any[];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

// export default async function PagesAdminPage() {
//   const pages = await getPages();

//   return (
//     <div className="p-8">
//       <div className="space-y-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground mb-2">Pages</h1>
//             <p className="text-muted-foreground">Manage documentation pages</p>
//           </div>
//           <Button asChild className="gap-2">
//             <Link href="/admin/pages/new">
//               <Plus className="h-4 w-4" />
//               New Page
//             </Link>
//           </Button>
//         </div>

//         {pages.length === 0 ? (
//           <Card>
//             <CardContent className="py-12 text-center">
//               <p className="text-muted-foreground mb-4">No pages yet</p>
//               <Button asChild variant="outline">
//                 <Link href="/admin/pages/new">Create your first page</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="rounded-lg border border-border overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-muted/50 border-b border-border">
//                 <tr>
//                   <th className="text-left p-4 font-semibold text-foreground">
//                     Title
//                   </th>
//                   <th className="text-left p-4 font-semibold text-foreground">
//                     Category
//                   </th>
//                   <th className="text-left p-4 font-semibold text-foreground">
//                     Status
//                   </th>
//                   <th className="text-left p-4 font-semibold text-foreground">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pages.map((page: any) => (
//                   <tr
//                     key={page.id}
//                     className="border-t border-border hover:bg-muted/50 transition"
//                   >
//                     <td className="p-4">
//                       <p className="font-semibold text-foreground">
//                         {page.title}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {page.slug}
//                       </p>
//                     </td>
//                     <td className="p-4 text-sm text-muted-foreground">
//                       {page.category}
//                     </td>
//                     <td className="p-4">
//                       <span
//                         className={`text-xs font-medium px-2 py-1 rounded-full ${
//                           page.published
//                             ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
//                             : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
//                         }`}
//                       >
//                         {page.published ? "Published" : "Draft"}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex gap-2">
//                         <Button size="sm" variant="ghost" asChild>
//                           <Link href={`/admin/pages/${page.id}`}>
//                             <Edit2 className="h-4 w-4" />
//                           </Link>
//                         </Button>
//                         <form
//                           action={async () => {
//                             "use server";
//                             await deletePage(page.id);
//                           }}
//                         >
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             type="submit"
//                             className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
//                           >
//                             🗑
//                           </Button>
//                         </form>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default async function PagesAdminPage() {
  const pages = await getPages();

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Pages</h1>
            <p className="text-muted-foreground">Manage documentation pages</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/admin/pages/new">
              <Plus className="h-4 w-4" />
              New Page
            </Link>
          </Button>
        </div>

        {pages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No pages yet</p>
              <Button asChild variant="outline">
                <Link href="/admin/pages/new">Create your first page</Link>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page: any) => (
                  <tr
                    key={page.id}
                    className="border-t border-border hover:bg-muted/50 transition"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-foreground">
                        {page.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {page.slug}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {page.category}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          page.published
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                        }`}
                      >
                        {page.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {page.published && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            title="View live page"
                          >
                            <Link href={`/p/${page.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/pages/${page.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <form
                          action={async () => {
                            "use server";
                            await deletePageAction(page.id);
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
