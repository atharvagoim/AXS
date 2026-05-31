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
    title: 'Our 1st movie date',
    date: '2025-12-28',
    description: 'We watched a movie for the first time together cute cute cute , we were not yet dating .',
    imageUrl: 'https://i.ibb.co/b5Jst9T5/Full-Size-Render.jpg',
    location: 'Aster'
  },
  {
    id: 'mem_2',
    title: 'When i asked you out.',
    date: '2026-01-01',
    description: 'A very special day, we were officially together.',
    imageUrl: 'https://i.ibb.co/nVf7fJf/IMG-1304.jpg',
    location: 'Janta Bar'
  },
  {
    id: 'mem_3',
    title: 'Roaming Free',
    date: '2026-01-01',
    description: 'We were so fuckinggg happyy boyfriend girlfriend yeyyy',
    imageUrl: 'https://i.ibb.co/wr7yZm97/4e9a956b-4504-47e4-bdc2-66c6b58eab65.jpg',
    location: 'Bandstand'
  },
  {
    id: 'mem_4',
    title: 'Our First dATE',
    date: '2026-01-15',
    description: 'We missed each other so much during manali, But we had such a good time together.',
    imageUrl: 'https://i.ibb.co/LD4X1C9x/Full-Size-Render.jpg',
    location: 'Mokai'
  },
  {
    id: 'mem_5',
    title: 'Valentine',
    date: '2026-02-14',
    description: 'Our first Valentine, also we had a pretty rough time we made it through SO PROUD OF US',
    imageUrl: 'https://i.ibb.co/W47nM49j/CD2580-A0-1-E10-466-E-867-B-DF346-E19-FEFC.jpg',
    location: 'Versova'
  },
  {
    id: 'mem_6',
    title: 'Arcade Date',
    date: '2026-02-19',
    description: 'We had alot of fun loved seeing you and win games and my heart both',
    imageUrl: 'https://i.ibb.co/dJ6X80tv/IMG-3868.jpg',
    location: 'Utopia City Parel'
  },
    {
    id: 'mem_7',
    title: 'Shawrma Date',
    date: '2026-02-26',
    description: 'We went out twining and ATEE SHAWARMA',
    imageUrl: 'https://i.ibb.co/DP1Bn4FR/IMG-3964.jpg',
    location: 'Miya kebabs'
  },
  {
    id: 'mem_8',
    title: 'GYM Date',
    date: '2026-03-20',
    description: 'We worked out together for the First time we were so tired but def FUNN.',
    imageUrl: 'https://i.ibb.co/NgyFGFWK/Full-Size-Render.jpg',
    location: 'Creed Culture'
  },
    {
    id: 'mem_9',
    title: 'GYM Date',
    date: '2026-03-21',
    description: 'Our first bike ride to Marines vapis karenge chalooo, had alot of deep talksss.',
    imageUrl: 'https://i.ibb.co/mrwvYXnc/A98-F7-FCA-8-B29-4-E20-90-A5-C2-BC7-F110-B45.jpg',
    location: 'Marine Drive'
  },
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
  const anniversaryDate = '2026-01-01'; // Your Anniversary Date (YYYY-MM-DD)
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
