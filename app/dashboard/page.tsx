import AddBookmark from "@/components/AddBookmark";
import BookmarkList from "@/components/BookmarkList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }
  
  // Fetching initial bookmarks server-side
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen pt-32">
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">My Bookmarks</h1>
          <p className="text-gray-500">Welcome back, {user.email}</p>
        </div>
          {/* Add Bookmark Card */}
           <AddBookmark/>
    </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <BookmarkList initialBookmarks={bookmarks || []} />
        </div>
      </main>
    </div>
  );
}