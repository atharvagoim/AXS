import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Song } from '../types';
import { 
  Music, 
  Play, 
  Pause, 
  Heart,
  Youtube,
  ExternalLink,
  Disc
} from 'lucide-react';

interface PlaylistSectionProps {
  songs: Song[];
}

const PRESET_MOODS = [
  { value: 'Cozy', emoji: '☕', bg: 'bg-black text-white' },
  { value: 'Dreamy', emoji: '☁️', bg: 'bg-black text-white' },
  { value: 'Happy', emoji: '☀️', bg: 'bg-black text-white' },
  { value: 'Sweet', emoji: '🍭', bg: 'bg-maroon-600 text-white' },
  { value: 'Melancholic', emoji: '🌧️', bg: 'bg-black text-white' }
];

const getYoutubeEmbedId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getSpotifyEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/);
  if (match && match[1]) {
    return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`;
  }
  return null;
};

export default function PlaylistSection({
  songs
}: PlaylistSectionProps) {
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null);

  const getMoodEmoji = (word: string) => {
    return PRESET_MOODS.find(m => m.value === word)?.emoji || '🎵';
  };

  return (
    <div className="space-y-8" id="playlist-container">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-3 border-black pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif text-black font-extrabold uppercase flex items-center gap-3">
            <Music className="w-8 h-8 text-maroon-600" />
            Lover's Playlist
          </h2>
          <p className="text-neutral-600 font-sans mt-1 text-sm">
            Curated songs that spark instantly sweet thoughts of you, framed in high-contrast vinyl cards.
          </p>
        </div>
      </div>

      {/* Grid of Sound Tracks */}
      {songs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-3 border-dashed border-black rounded-none p-12 text-center bg-maroon-50"
        >
          <Music className="w-10 h-10 text-maroon-600 mx-auto mb-4 animate-bounce" />
          <h4 className="text-lg font-serif font-black uppercase text-black">PLAYLIST CARDS BOX IS VACANT</h4>
          <p className="text-neutral-600 mt-2 max-w-sm mx-auto text-xs font-medium">
            Link songs that stream deep memories of both of you to fill this classic sound drawer.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {songs.map((song) => {
            const ytEmbedId = getYoutubeEmbedId(song.youtubeUrl || '');
            const spotEmbedUrl = getSpotifyEmbedUrl(song.spotifyUrl || '');
            const hasEmbed = !!ytEmbedId || !!spotEmbedUrl;

            return (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-none border-3 border-black transition-all duration-200 overflow-hidden relative group flex flex-col justify-between ${
                  song.isFavorite 
                    ? 'shadow-[6px_6px_0px_0px_rgba(128,0,0,1)] bg-maroon-50/10' 
                    : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {/* Anthem Heart Icon Badge */}
                {song.isFavorite && (
                  <div className="absolute top-0 right-0 bg-black text-white border-l-2 border-b-2 border-black text-[9px] font-black px-3 py-1.5 tracking-widest uppercase flex items-center gap-1 z-10">
                    <Heart className="w-3 h-3 fill-white text-white" />
                    <span>OUR ANTHEM</span>
                  </div>
                )}

                <div className="p-5 md:p-6 space-y-5">
                  <div className="flex items-center gap-5">
                    {/* Song Cover Artwork */}
                    <div className="relative flex-shrink-0">
                      <div 
                        className={`w-20 h-20 sm:w-24 sm:h-24 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group cursor-pointer ${
                          isPlayingId === song.id ? 'scale-98 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]' : 'hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                        } transition-all duration-155`}
                        onClick={() => setIsPlayingId(isPlayingId === song.id ? null : song.id)}
                      >
                        {song.imageUrl ? (
                          <img 
                            src={song.imageUrl} 
                            alt={song.title} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
                            <Music className="w-8 h-8 text-black" />
                          </div>
                        )}
                        
                        {/* Play/Pause Hover Overlay Icon */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                          {isPlayingId === song.id ? (
                            <Pause className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                          ) : (
                            <Play className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ml-0.5" />
                          )}
                        </div>

                        {/* Playing overlay when active */}
                        {isPlayingId === song.id && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Pause className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>


                    </div>

                    <div className="space-y-1 select-none pr-12">
                      <h4 className="text-lg sm:text-xl font-serif text-black font-extrabold uppercase tracking-tight">{song.title}</h4>
                      <p className="text-xs text-maroon-700 font-mono font-bold uppercase tracking-wider">{song.artist}</p>
                    </div>
                  </div>

                  {/* Real Embed Players */}
                  {isPlayingId === song.id && hasEmbed && (
                    <motion.div 
                      key="embed-player"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="rounded-none border-2 border-black overflow-hidden bg-neutral-50 p-2"
                    >
                      {spotEmbedUrl ? (
                        <iframe 
                          src={spotEmbedUrl} 
                          width="100%" 
                          height="80" 
                          frameBorder="0" 
                          allowFullScreen={false} 
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                          loading="lazy"
                          className="rounded-none"
                        ></iframe>
                      ) : ytEmbedId ? (
                        <div className="relative aspect-video w-full rounded-none overflow-hidden">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${ytEmbedId}?autoplay=1&mute=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </div>

                {/* Footer Controls & External Links */}
                {(song.youtubeUrl || song.spotifyUrl) && (
                  <div className="bg-neutral-50 px-5 py-3.5 border-t-2 border-black flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      {song.youtubeUrl && (
                        <a 
                          href={song.youtubeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-black hover:text-maroon-600 transition-colors py-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider border border-black px-2.5 bg-white"
                        >
                          <Youtube className="w-3.5 h-3.5 text-maroon-600" />
                          <span>YouTube</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {song.spotifyUrl && (
                        <a 
                          href={song.spotifyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-black hover:text-maroon-600 transition-colors py-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider border border-black px-2.5 bg-white"
                        >
                          <Music className="w-3 h-3 text-emerald-600" />
                          <span>Spotify</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
