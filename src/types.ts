export interface MemoryCard {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'first_meeting' | 'first_date' | 'milestone' | 'trip' | 'sweet_moment';
  imageUrl?: string;
  location?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  reason: string; // The sweet reason this song reminds him of her
  youtubeUrl?: string; // YouTube or other links
  spotifyUrl?: string;
  mood?: string; // e.g. Happy, Melancholic, Dreamy, Sweet
  isFavorite?: boolean;
  imageUrl?: string;
}

export interface LoveLetterConfig {
  gfName: string;
  relationshipLength: string;
  letterTone: 'romantic' | 'poetic' | 'silly' | 'heartfelt';
  favoriteAttributes: string[];
  keyMemories: string;
}
