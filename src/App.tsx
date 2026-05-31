import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryCard, Song } from './types';
import StorySection from './components/StorySection';
import PlaylistSection from './components/PlaylistSection';
import { 
  Heart, 
  Music, 
  Sparkles, 
  Clock, 
  BookOpen
} from 'lucide-react';

// Pre-seeded Memory datasets for instant aesthetic magic
const DEFAULT_MEMORIES: MemoryCard[] = [
  {
    id: 'mem_1',
    title: 'The Café We Met At',
    date: '2024-08-25',
    description: 'We sat at that wooden high-table near the window. The rain was drumming soft rhythms on the glass, and you laughed when you accidentally smudged cocoa powder on your nose. I knew from that very afternoon you were going to be my favorite person.',
    category: 'first_meeting',
    imageUrl: 'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&q=80&w=800',
    location: 'Mocha Dream Café'
  },
  {
    id: 'mem_2',
    title: 'City Skyline Under Stars',
    date: '2024-09-10',
    description: 'Our first official date night. We bought those sweet strawberry skewers, strolled along the water canal, and talked about literally everything—from our favorite cartoon dogs to our biggest silly fears, completely losing track of the cold subway schedules.',
    category: 'first_date',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    location: 'Riverside Walk'
  },
  {
    id: 'mem_3',
    title: 'Catching Coastal Sunsets',
    date: '2024-11-05',
    description: 'Standing hand in hand on the warm sand, watching the horizon dissolve into absolute pink, purple and gold. The ocean breeze blew through your hair and you whispered how happy you were. That sound is forever engraved in my heart.',
    category: 'trip',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800',
    location: 'Emerald Beach Coast'
  },
  {
    id: 'mem_4',
    title: 'The Rain Walk Escape',
    date: '2025-01-15',
    description: 'Stuck without an umbrella under a tiny dry ledge, we finally decided to just run for it. Completely drenched from head to toe, laughing our hearts out under the flickering amber street lamps. Best night ever.',
    category: 'sweet_moment',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    location: 'Downtown Boulevard'
  },
  {
    id: 'mem_5',
    title: 'First Anniversary Candlelight Dinner',
    date: '2025-08-25',
    description: 'One full year of amazing days. We celebrated with a gorgeous corner-table dinner, delicious pasta, and exchanging handwritten letters that we vowed to keep lock-and-key forever.',
    category: 'milestone',
    imageUrl: 'https://images.unsplash.com/photo-1507504038482-76210f64c501?auto=format&fit=crop&q=80&w=800',
    location: 'The Velvet Room Bistro'
  },
  {
    id: 'mem_6',
    title: 'Warm Matcha & Retro Records',
    date: '2025-10-18',
    description: 'A cozy Sunday spent flipping through dusty retro synth records in a cellar catalog, followed by drinking the creamies warm matcha lattes. Simple, quiet, and absolutely beautiful with you.',
    category: 'sweet_moment',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    location: 'Vintage Vinyl Ground'
  }
];

const DEFAULT_SONGS: Song[] = [
  {
    id: 'song_1',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    reason: 'This plays in my head every time you walk into a room wearing that beautiful oversized beige knit sweater. It fits us perfectly.',
    spotifyUrl: 'https://open.spotify.com/track/1m6L92hD6W6pAnxRzWeY8Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    mood: 'Sweet',
    isFavorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'song_2',
    title: 'Lover',
    artist: 'Taylor Swift',
    reason: 'Remember when we drove back from that late-night diner under starry gray clouds and we both sang along to this on high volume? It represents our cozy kitchen table dance talks.',
    spotifyUrl: 'https://open.spotify.com/track/1ix9A3I045t5Lp5jVsz3pP',
    youtubeUrl: 'https://www.youtube.com/watch?v=SGURbHeXptc',
    mood: 'Dreamy',
    isFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'song_3',
    title: 'Here Comes the Sun',
    artist: 'The Beatles',
    reason: 'Literally reminds me of your morning smiles and those sweet voice notes you send me whenever I have a high-stress workday.',
    spotifyUrl: 'https://open.spotify.com/track/6gBFPUg6WvI0gZgVMfH3I2',
    youtubeUrl: 'https://www.youtube.com/watch?v=KQetemT1sWc',
    mood: 'Happy',
    isFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'song_4',
    title: 'Yellow',
    artist: 'Coldplay',
    reason: 'Because look at the stars, look how they shine for you. A timeless classic that we always play during late night highway drives.',
    spotifyUrl: 'https://open.spotify.com/track/3ee8JmZBNv6Zszv6q6vL6C',
    youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KxyY',
    mood: 'Dreamy',
    isFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'song_5',
    title: 'Chasing Cars',
    artist: 'Snow Patrol',
    reason: 'If I lay here, if I just lay here, would you lie with me and just forget the world? Our absolute comfort track.',
    spotifyUrl: 'https://open.spotify.com/track/1I8tHo6STfql76gguvY64z',
    youtubeUrl: 'https://www.youtube.com/watch?v=GxldQ9eX270',
    mood: 'Melancholic',
    isFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1507504038482-76210f64c501?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'song_6',
    title: 'All of Me',
    artist: 'John Legend',
    reason: 'A beautiful soulful melody that speaks directly to how much we cherish each and every part of each other.',
    spotifyUrl: 'https://open.spotify.com/track/3U4isOIWM3VvDubgHsiXf0',
    youtubeUrl: 'https://www.youtube.com/watch?v=450p7goxZqg',
    mood: 'Sweet',
    isFavorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=400'
  }
];

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'stories' | 'songs'>('stories');
  
  // =========================================================================
  // ✍️ MANUAL EDITING CONTROLS (EASY CUSTOMIZATION - NO DATABASE NEEDED)
  // Edit the anniversary date, names, memories, and songs directly here or in 
  // the configuration arrays above! Everything changes live in the preview.
  // =========================================================================
  const anniversaryDate = '2025-01-01'; // Your Anniversary Date (YYYY-MM-DD)
  const partnerNames = 'atharva X sanya'; // Your Names

  const memories = DEFAULT_MEMORIES; // Edit Scrapbook Memories in the array at the top of this file!
  const songs = DEFAULT_SONGS;       // Edit Love Songs in the array at the top of this file!

  // Time metric ticker states
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Floating Heart interaction list
  const [interactiveHearts, setInteractiveHearts] = useState<ClickHeart[]>([]);

  // Clear obsolete localStorage variables on boot to prevent cached data interference
  useEffect(() => {
    localStorage.removeItem('love_memories');
    localStorage.removeItem('love_songs');
  }, []);

  // Handle active anniversary clock ticker
  useEffect(() => {
    const updateTicker = () => {
      const anniversary = new Date(anniversaryDate);
      const now = new Date();
      let diffMs = now.getTime() - anniversary.getTime();

      // In case they pick a future date
      if (diffMs < 0) diffMs = 0;

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeDiff({ days, hours, minutes, seconds });
    };

    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  // Click handler to create miniature romantic floating heart particles
  const handlePageClick = (e: React.MouseEvent) => {
    // Avoid creating hearts inside modal clicks by filtering element tagging
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select') || target.closest('textarea')) {
      return;
    }

    const newHeart: ClickHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      scale: 0.5 + Math.random() * 0.8
    };

    setInteractiveHearts(prev => [...prev, newHeart]);

    // Cleanup heart after animation completes
    setTimeout(() => {
      setInteractiveHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);
  };

  return (
    <div 
      onClick={handlePageClick}
      className="min-h-screen bg-white text-black font-sans relative overflow-x-hidden selection:bg-maroon-500 selection:text-white pb-24"
      id="app-root-container"
      style={{ backgroundImage: 'radial-gradient(#f4e2e2 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    >
      {/* Dynamic Interactive Ambient Floating Hearts/Diamonds layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {interactiveHearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, x: heart.x - 12, y: heart.y - 12, scale: heart.scale }}
              animate={{ 
                opacity: 0, 
                y: heart.y - 140 - Math.random() * 60, 
                x: heart.x - 30 + Math.random() * 60,
                rotate: -45 + Math.random() * 90
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute text-maroon-600 fill-maroon-600 text-xl filter drop-shadow-sm select-none font-sans"
            >
              ✦
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Love Top Status Banner banner */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white p-6 md:p-8 border-3 border-black rounded-none flex flex-col lg:flex-row items-center justify-between gap-6 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Leftside profiles */}
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left select-none">
            <div className="relative">
              <div className="w-16 h-16 bg-maroon-600 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-black border border-white text-[9px] text-white font-bold p-0.5 px-1 uppercase tracking-wider">
                US
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-black font-extrabold uppercase tracking-tight">
                {partnerNames}
              </h1>
              <p className="text-maroon-700 font-sans font-bold text-xs uppercase tracking-widest mt-1 flex items-center justify-center md:justify-start gap-2">
                <span>✦ ESTABLISHED</span>
                <span className="bg-black text-white px-2.5 py-0.5 rounded-none text-[10px] font-mono font-bold">
                  {new Date(anniversaryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </p>
            </div>
          </div>

          {/* Ticking Milestone Anniversary Counter */}
          <div className="flex flex-wrap items-center justify-center gap-4 bg-maroon-50 border-2 border-black p-4 px-6 rounded-none select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center min-w-[50px]">
              <span className="block text-2xl md:text-3xl font-black text-black font-mono tracking-tighter">{timeDiff.days}</span>
              <span className="text-[10px] text-black uppercase font-extrabold tracking-widest font-sans">Days</span>
            </div>
            <span className="text-xl text-black font-serif font-black">:</span>
            <div className="text-center min-w-[50px]">
              <span className="block text-xl md:text-2xl font-black text-black font-mono tracking-tighter">{timeDiff.hours.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-black uppercase font-bold tracking-widest font-sans">Hrs</span>
            </div>
            <span className="text-xl text-black font-serif font-black">:</span>
            <div className="text-center min-w-[50px]">
              <span className="block text-xl md:text-2xl font-black text-black font-mono tracking-tighter">{timeDiff.minutes.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-black uppercase font-bold tracking-widest font-sans">Min</span>
            </div>
            <span className="text-xl text-black font-serif font-black">:</span>
            <div className="text-center min-w-[50px]">
              <span className="block text-xl md:text-2xl font-black text-maroon-600 font-mono tracking-tighter">{timeDiff.seconds.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-maroon-650 uppercase font-extrabold tracking-widest font-sans">Sec</span>
            </div>
            <span className="text-black text-xs font-bold uppercase tracking-wider pl-1 font-sans border-l-2 border-black py-1 hidden md:block">TOGETHER</span>
          </div>

        </div>
      </header>

      {/* Main Container View Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12" id="main-navigation">
          <button
            onClick={() => setActiveTab('stories')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-black font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer text-xs ${
              activeTab === 'stories'
                ? 'bg-maroon-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5 ring-1 ring-black'
                : 'bg-white hover:bg-maroon-50 text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>MEMORIES SCRAPBOOK</span>
          </button>
          
          <button
            onClick={() => setActiveTab('songs')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-black font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer text-xs ${
              activeTab === 'songs'
                ? 'bg-maroon-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5 ring-1 ring-black'
                : 'bg-white hover:bg-maroon-50 text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>REMINDS ME OF YOU</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-8 border-3 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] min-h-[50vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'stories' && (
              <motion.div
                key="stories-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <StorySection
                  memories={memories}
                />
              </motion.div>
            )}

            {activeTab === 'songs' && (
              <motion.div
                key="songs-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <PlaylistSection
                  songs={songs}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
