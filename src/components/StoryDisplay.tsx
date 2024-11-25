import React from 'react';
import { BookOpen } from 'lucide-react';

interface StoryDisplayProps {
  story: string;
}

export default function StoryDisplay({ story }: StoryDisplayProps) {
  if (!story) return null;

  const [storyContent, definitions] = story.split('单词释义：').map(s => s.trim());

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">生成的故事</h2>
      </div>
      <div className="space-y-6">
        <div className="p-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <p className="text-white leading-relaxed whitespace-pre-wrap text-lg">{storyContent}</p>
        </div>
        {definitions && (
          <div className="p-6 rounded-lg bg-purple-900/30 backdrop-blur-md border border-purple-500/20 shadow-lg">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">单词释义</h3>
            <div className="space-y-2">
              {definitions.split('\n').map((def, index) => (
                <p key={index} className="text-white/90 text-base">{def}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}