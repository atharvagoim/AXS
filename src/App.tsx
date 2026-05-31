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
    description: 'Our first bike ride to Marines vapis karenge chalooo, had alot of deep Conversations.',
    imageUrl: 'https://i.ibb.co/mrwvYXnc/A98-F7-FCA-8-B29-4-E20-90-A5-C2-BC7-F110-B45.jpg',
    location: 'Marine Drive'
  },
      {
    id: 'mem_10',
    title: 'Concert',
    date: '2026-03-22',
    description: 'Our first Concert togther it was a stealll for the money we Paid.',
    imageUrl: 'https://i.ibb.co/r2hzpw7m/IMG-4691.jpg',
    location: 'Nesco Grounds'
  },
        {
    id: 'mem_11',
    title: 'Movie Time',
    date: '2026-04-24',
    description: 'OHH first time we went for a movie uk what happened haha.',
    imageUrl: 'https://i.ibb.co/BHfVVbN9/IMG-5283.jpg',
    location: 'INOX Marines'
  },
          {
    id: 'mem_12',
    title: 'Ramen Date',
    date: '2026-05-13',
    description: 'We ate Ramen ICECREAMM and it was so so gooddddd',
    imageUrl: 'https://i.ibb.co/9mc0QrYy/E1-D3691-E-DE0-C-41-C8-AC99-B6-F9-A5-A68346.jpg',
    location: 'BARAKO'
  },
];

const DEFAULT_SONGS: Song[] = [
  {
    id: 'song_1',
    title: 'Mrignaini',
    artist: 'karun',
    reason: 'This plays in my head every time you walk into a room wearing that beautiful oversized beige knit sweater. It fits us perfectly.',
    spotifyUrl: 'https://open.spotify.com/track/1nZ2O25UgnTFcPz3QrEDwX?si=65e170a361044230',
    youtubeUrl: 'https://youtu.be/Ald44cGPou4?si=9XGyF73IAd_NaAgV',
    mood: 'Sweet',
    isFavorite: true,
    imageUrl: 'https://i.ytimg.com/vi/Ald44cGPou4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDYCAMyDu-2nkfMpWthmqgyANjXCw'
  },
  {
    id: 'song_2',
    title: 'Bargad',
    artist: 'Arpit Bala',
    reason: 'Remember when we drove back from that late-night diner under starry gray clouds and we both sang along to this on high volume? It represents our cozy kitchen table dance talks.',
    spotifyUrl: 'https://open.spotify.com/track/0Q9rHyEG7lME4y2Fqtuxgl?si=2c386ab236a84732',
    youtubeUrl: 'https://youtu.be/jfjXJpUNayg?si=36Kadq6R1mq_uSM8',
    mood: 'Dreamy',
    isFavorite: false,
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27369ecc359541c8a49aae7716f'
  },
  {
    id: 'song_3',
    title: 'Ambersariya',
    artist: 'Sona Mohapatra',
    reason: 'Literally reminds me of your morning smiles and those sweet voice notes you send me whenever I have a high-stress workday.',
    spotifyUrl: 'https://open.spotify.com/track/4qRcjFkFqSpLBzcbLDt7HL?si=45de704164444218',
    youtubeUrl: 'https://youtu.be/oMesPehN_Do?si=49fUevKmEX6Ejoup',
    mood: 'Happy',
    isFavorite: false,
    imageUrl: 'data:image/jpeg;base64,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'
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
