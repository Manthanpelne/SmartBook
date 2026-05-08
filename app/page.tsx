import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center overflow-hidden">
      {/* Soft Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[120px]" />

      <main className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Smart Bookmark Manager
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6">
          Save everything. <br />
          <span className="text-gray-400">Organize effortlessly.</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-lg text-gray-500 mb-10 leading-relaxed">
          A minimalist bookmark manager designed for speed and focus. 
          Real-time sync across all your devices.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link 
              href="/auth/login" 
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
            >
              Get Started for Free
            </Link>
          )}
          <a 
            href="https://github.com/Manthanpelne/SmartBook" 
            target="_blank"
            className="px-8 py-4 bg-white border border-gray-200 text-black rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            View on GitHub
          </a>
        </div>
      </main>

      <footer className="absolute bottom-8 text-gray-400 text-sm">
        Built with Next.js, Supabase & Tailwind CSS
      </footer>
    </div>
  );
}