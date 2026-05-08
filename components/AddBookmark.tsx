'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AddBookmark() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('bookmarks')
      .insert([{ url, title }]);

    if (error) {
      alert(error.message);
    } else {
      setUrl('');
      setTitle('');
      setIsOpen(false);
    }
    setLoading(false);
  };

  return (
    <>
      {/* The "Bento" Trigger Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative p-6 bg-white rounded-3xl border border-dashed border-gray-300 flex gap-4 items-center justify-center hover:border-black hover:bg-gray-50 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl text-gray-500 group-hover:text-black">+</span>
        </div>
        <span className=" font-medium text-gray-500 group-hover:text-black">Add Bookmark</span>
      </button>

      {/* Glassmorphic Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">New Bookmark</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 ml-1">URL</label>
                <input
                  required
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 text-black py-3 rounded-2xl bg-gray-100/50 border border-transparent focus:bg-white focus:border-black outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1 ml-1">Title</label>
                <input
                  required
                  type="text"
                  placeholder="My favorite site"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-black px-4 py-3 rounded-2xl bg-gray-100/50 border border-transparent focus:bg-white focus:border-black outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-gray-100 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-2xl bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}