'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

export default function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-5xl px-6 py-3 bg-white/70 backdrop-blur-md border border-white/20 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold tracking-tight text-black">SmartBook</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {user && (
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/dashboard' ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Dashboard
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center gap-2">
              <Image
              width={12}
              height={12}
              src={`${user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'}`}
              alt="user avatar"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 border border-gray-200" />
              <form action="/auth/signout" method="post">
                <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link 
              href="/auth/login" 
              className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}