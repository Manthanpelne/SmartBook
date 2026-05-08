'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Trash2 } from 'lucide-react';

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [searchQuery, setSearchQuery] = useState(''); 
  const supabase = createClient();

  // 1. Live Filtering Logic
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookmarks, searchQuery]);

  // 2. Realtime Sync Logic
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', 
          schema: 'public',
          table: 'bookmarks',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // 3. Delete Handler
const handleDelete = async (id: string) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete bookmark');
    } else {
      toast.success('Bookmark moved to trash');
    }
  };
  // 4. Global Empty State (If database is empty)
  if (bookmarks.length === 0) {
    return (
      <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
        <p className="text-gray-400 font-medium">No bookmarks yet. Add your first one to get started!</p>
      </div>
    );
  }

  return (
    <>
      {/* 5. Sleek Search Bar */}
      <div className="col-span-full mb-2">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-black outline-none shadow-sm transition-all text-gray-900 placeholder:text-gray-400"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </div>

      {/* 6. Search Empty State */}
      {filteredBookmarks.length === 0 ? (
        <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-[2rem] border border-gray-100">
          <p className="text-gray-400">No results found for "{searchQuery}"</p>
        </div>
      ) : (
        // 7. The Grid of Bookmarks
        filteredBookmarks.map((bookmark) => (
          <div 
            key={bookmark.id}
            className="group relative bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-52"
          >
            <div>
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden mb-4 border border-gray-100">
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=128`} 
                    alt="icon"
                    className="w-7 h-7"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://www.google.com/s2/favicons?domain=google.com&sz=128';
                    }}
                  />
                </div>

                {/* AlertDialog Implementation */}
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
                    <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white p-8 rounded-[2rem] shadow-2xl z-[101] focus:outline-none">
                      <AlertDialog.Title className="text-xl font-bold tracking-tight text-black">Delete Bookmark?</AlertDialog.Title>
                      <AlertDialog.Description className="mt-2 text-gray-500 leading-relaxed">
                        This action cannot be undone. This will permanently remove the bookmark from your dashboard.
                      </AlertDialog.Description>
                      <div className="mt-8 flex justify-end gap-3">
                        <AlertDialog.Cancel asChild>
                          <button className="px-6 py-3 rounded-full bg-gray-100 font-semibold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <button onClick={() => handleDelete(bookmark.id)} className="px-6 py-3 rounded-full bg-red-500 font-semibold text-white hover:bg-red-600 transition-colors">Delete</button>
                        </AlertDialog.Action>
                      </div>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
                
              </div>
              
              <h3 className="font-bold text-gray-900 truncate text-lg tracking-tight">{bookmark.title}</h3>
              <p className="text-xs font-medium text-gray-400 truncate uppercase tracking-widest mt-1">
                {new URL(bookmark.url).hostname}
              </p>
            </div>

            <div className="pt-4">
              <a 
                href={bookmark.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-black hover:gap-2 transition-all"
              >
                Visit Site 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>
        ))
      )}
    </>
  );
}