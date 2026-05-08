'use client';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <div className="p-8 bg-white text-black/30 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-semibold mb-6">Smart Bookmarks</h1>
        <button 
          onClick={handleLogin}
          className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-md"
        >
          Continue with Google
          <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" className='w-6' />
        </button>
      </div>
    </div>
  );
}