import React from 'react';
import { Send } from 'lucide-react';

interface WordInputProps {
  words: string;
  setWords: (words: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function WordInput({ words, setWords, onGenerate, isLoading }: WordInputProps) {
  return (
    <div className="w-full max-w-2xl">
      <textarea
        value={words}
        onChange={(e) => setWords(e.target.value)}
        placeholder="输入英语单词（用空格或换行分隔）"
        className="w-full h-32 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !words.trim()}
        className="mt-4 w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            生成故事
          </>
        )}
      </button>
    </div>
  );
}