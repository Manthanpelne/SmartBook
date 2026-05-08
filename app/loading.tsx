export default function GlobalLoading() {
  return (
    <div className="relative min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Blurs stay visible for continuity */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-50/50 blur-[120px]" />

      <main className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Skeleton Badge */}
        <div className="h-6 w-40 bg-white border border-gray-100 rounded-full animate-pulse mb-8" />
        
        {/* Skeleton Headline */}
        <div className="h-12 md:h-16 w-64 md:w-[500px] bg-gray-200 animate-pulse rounded-2xl mb-4" />
        <div className="h-12 md:h-16 w-48 md:w-[350px] bg-gray-200 animate-pulse rounded-2xl mb-6" />
        
        {/* Skeleton Subtext */}
        <div className="h-4 w-64 md:w-96 bg-gray-200 animate-pulse rounded-lg mb-2" />
        <div className="h-4 w-48 md:w-80 bg-gray-200 animate-pulse rounded-lg mb-10" />

        {/* Skeleton Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="h-14 w-44 bg-gray-300 animate-pulse rounded-full shadow-sm" />
          <div className="h-14 w-44 bg-white border border-gray-100 animate-pulse rounded-full shadow-sm" />
        </div>
      </main>

      <footer className="absolute bottom-8 h-4 w-56 bg-gray-200 animate-pulse rounded-lg" />
    </div>
  );
}