import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryCard } from '../types';
import { 
  Heart, 
  MapPin, 
  Clock
} from 'lucide-react';

interface StorySectionProps {
  memories: MemoryCard[];
}

const CATEGORY_PRESETS = [
  { value: 'first_meeting', label: 'First Meeting', emoji: '✨' },
  { value: 'first_date', label: 'First Date', emoji: '☕' },
  { value: 'milestone', label: 'Milestone', emoji: '💍' },
  { value: 'trip', label: 'Adventures', emoji: '✈️' },
  { value: 'sweet_moment', label: 'Sweet Moments', emoji: '🌸' }
];

export default function StorySection({ 
  memories 
}: StorySectionProps) {

  const getPresetLabel = (cat: string) => {
    return CATEGORY_PRESETS.find(c => c.value === cat)?.label || cat;
  };

  const getPresetEmoji = (cat: string) => {
    return CATEGORY_PRESETS.find(c => c.value === cat)?.emoji || '💝';
  };

  return (
    <div className="space-y-8" id="memories-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-3 border-black pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif text-black font-extrabold uppercase flex items-center gap-3">
            <Heart className="w-8 h-8 text-maroon-600 fill-maroon-600 " />
            Our Scrapbook
          </h2>
          <p className="text-neutral-600 font-sans mt-1 text-sm">
            Beautiful memories, smiles, and stories captured in classic sharp-edged polaroids.
          </p>
        </div>
      </div>

      {/* Timeline Grid of Polaroid Cards */}
      {memories.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-3 border-dashed border-black rounded-none p-12 text-center bg-maroon-50"
        >
          <Heart className="w-10 h-10 text-maroon-600 mx-auto mb-4 animate-bounce" />
          <h4 className="text-lg font-serif font-black uppercase text-black">NO ENTRIES RECORDED IN THIS CHAPTER YET</h4>
          <p className="text-neutral-600 font-sans mt-2 max-w-sm mx-auto text-xs font-medium">
            Log our sweet dates, scenic travels, or milestones inside the app.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {memories.map((memory) => {
              const formattedDate = new Date(memory.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 pb-6 rounded-none border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(128,0,0,1)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Polaroid Image */}
                    <div className="relative aspect-4/3 w-full bg-neutral-100 rounded-none overflow-hidden mb-4 border-2 border-black">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 right-2.5 bg-black text-white border border-black h-6 px-2.5 rounded-none flex items-center justify-center text-[9px] font-black tracking-widest uppercase gap-1">
                        <span>{getPresetEmoji(memory.category)}</span>
                        <span>{getPresetLabel(memory.category)}</span>
                      </span>

                      {/* Location Sticker Pin */}
                      {memory.location && (
                        <div className="absolute bottom-2.5 left-2.5 bg-white border-2 border-black text-black px-2 py-0.5 rounded-none flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
                          <MapPin className="w-2.5 h-2.5 text-maroon-600" />
                          <span>{memory.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Polaroid Writing */}
                    <div className="space-y-2 px-1">
                      <div className="flex items-center gap-1.5 text-maroon-600 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>

                      <h4 className="text-xl font-serif text-black font-black uppercase tracking-tight leading-snug">
                        {memory.title}
                      </h4>

                      <p className="text-neutral-700 font-sans text-xs leading-relaxed whitespace-pre-line line-clamp-4 hover:line-clamp-none transition-all">
                        {memory.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
