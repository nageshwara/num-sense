import React from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';

type DifficultySelectorProps = {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  className?: string;
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xl font-medium mb-2">Difficulty Level</label>
      <div className="flex space-x-4">
        <button
          onClick={() => onChange('easy')}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
            value === 'easy'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Easy (1-20)
        </button>
        <button
          onClick={() => onChange('medium')}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
            value === 'medium'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Medium (1-100)
        </button>
        <button
          onClick={() => onChange('hard')}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
            value === 'hard'
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Hard (1-1000)
        </button>
      </div>
    </div>
  );
};
