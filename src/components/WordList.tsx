import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getWordPronunciation } from '../services/api';

interface WordListProps {
  words: string;
}

export default function WordList({ words }: WordListProps) {
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const wordArray = words.trim().split(/[\s,]+/).filter(Boolean);

  const playPronunciation = (word: string) => {
    setPlayingWord(word);
    const audio = new Audio(getWordPronunciation(word));
    
    audio.play()
      .then(() => {
        audio.onended = () => setPlayingWord(null);
      })
      .catch((error) => {
        console.error('Error playing pronunciation:', error);
        setPlayingWord(null);
      });
  };

  if (!wordArray.length) return null;

  return (
    <div className="w-full max-w-2xl mt-4">
      <div className="flex flex-wrap gap-2">
        {wordArray.map((word, index) => (
          <div
            key={index}
            className="group px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white flex items-center gap-2 hover:bg-white/15 transition-all"
          >
            <span>{word}</span>
            <button
              onClick={() => playPronunciation(word)}
              className="text-purple-400 hover:text-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-full p-0.5"
              title="播放发音"
            >
              {playingWord === word ? (
                <VolumeX className="w-4 h-4 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}