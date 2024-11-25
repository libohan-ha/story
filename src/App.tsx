import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import WordInput from './components/WordInput';
import WordList from './components/WordList';
import StoryDisplay from './components/StoryDisplay';
import History from './components/History';
import { generateStoryFromWords } from './services/api';

interface HistoryItem {
  words: string;
  story: string;
  date: string;
}

function App() {
  const [words, setWords] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('storyHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const generateStory = async () => {
    try {
      setIsLoading(true);
      setError('');
      const generatedStory = await generateStoryFromWords(words);
      setStory(generatedStory);
      
      const newHistoryItem = {
        words,
        story: generatedStory,
        date: new Date().toLocaleDateString()
      };
      
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('storyHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: { words: string; story: string }) => {
    setWords(item.words);
    setStory(item.story);
    setError('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('storyHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-10 h-10 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">英语故事生成器</h1>
          </div>
          
          <WordInput
            words={words}
            setWords={setWords}
            onGenerate={generateStory}
            isLoading={isLoading}
          />

          <WordList words={words} />
          
          {error && (
            <div className="w-full max-w-2xl mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
              {error}
            </div>
          )}
          
          <StoryDisplay story={story} />
          
          <History
            history={history}
            onSelect={handleHistorySelect}
            onClear={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;