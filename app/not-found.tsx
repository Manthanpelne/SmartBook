import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F7]">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-gray-500 mb-8">Page not found</p>
      <Link 
        href="/dashboard" 
        className="px-6 py-3 bg-black text-white rounded-full font-medium"
      >
        Return Home
      </Link>
    </div>
  );
}