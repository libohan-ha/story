import React from 'react';
import { Clock, X } from 'lucide-react';

interface HistoryProps {
  history: Array<{ words: string; story: string; date: string }>;
  onSelect: (item: { words: string; story: string }) => void;
  onClear: () => void;
}

export default function History({ history, onSelect, onClear }: HistoryProps) {
  if (!history.length) return null;

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">历史记录</h2>
        </div>
        <button
          onClick={onClear}
          className="text-white/60 hover:text-white transition-colors"
        >
          清除全部
        </button>
      </div>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
            onClick={() => onSelect(item)}
          >
            <div className="flex justify-between items-start">
              <p className="text-white/80 line-clamp-2">{item.words}</p>
              <span className="text-sm text-white/40">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}