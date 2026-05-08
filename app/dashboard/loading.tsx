export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg mb-4" />
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded-lg mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}