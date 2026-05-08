import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is found, kick them back to login
  if (!user) {
    return redirect("/auth/login");
  }


  return (
    <div className="min-h-screen bg-[#F5F5F7] p-8">
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">My Bookmarks</h1>
          <p className="text-gray-500">Welcome back, {user.email}</p>
        </div>
        
        <form action="/auth/signout" method="post">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-all">
            Sign Out
          </button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* This is where your Bookmark Form and Grid will go */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Add Bookmark Card */}
           <div className="bg-white p-6 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all cursor-pointer h-48">
              <span className="text-2xl mb-2">+</span>
              <span className="font-medium">Add New</span>
           </div>
        </div>
      </main>
    </div>
  );
}