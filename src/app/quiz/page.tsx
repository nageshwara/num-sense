"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { NumberInput } from '@/components/NumberInput';
import { NumberBlocks } from '@/components/NumberBlocks';
import { DifficultySelector, Difficulty } from '@/components/DifficultySelector';

type Operation = 'addition' | 'subtraction';
type Problem = {
  firstNumber: number;
  secondNumber: number;
  operation: Operation;
  answer: number;
};

export default function QuizPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [operation, setOperation] = useState<Operation>('addition');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalProblems, setTotalProblems] = useState<number>(0);

  // Generate a new problem based on difficulty and operation
  const generateProblem = useCallback(() => {
    // Define max range based on difficulty
    const ranges = {
      easy: 20,
      medium: 100,
      hard: 1000
    };
    
    const max = ranges[difficulty];
    let first: number;
    let second: number;
    
    if (operation === 'addition') {
      // For addition, ensure sum doesn't exceed max
      first = Math.floor(Math.random() * (max / 2)) + 1;
      second = Math.floor(Math.random() * (max / 2)) + 1;
    } else {
      // For subtraction, ensure first > second
      first = Math.floor(Math.random() * max) + 1;
      second = Math.floor(Math.random() * first) + 1;
    }
    
    const answer = operation === 'addition' ? first + second : first - second;
    
    setCurrentProblem({
      firstNumber: first,
      secondNumber: second,
      operation,
      answer
    });
    
    setUserAnswer(0);
    setFeedback(null);
  }, [difficulty, operation]);

  // Generate first problem on mount
  useEffect(() => {
    generateProblem();
  }, [difficulty, operation, generateProblem]);

  const handleSubmit = () => {
    if (!currentProblem) return;
    
    const isCorrect = userAnswer === currentProblem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setTotalProblems(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to next problem after 2 seconds
    setTimeout(() => {
      generateProblem();
    }, 2000);
  };

  const handleReset = () => {
    setScore(0);
    setTotalProblems(0);
    generateProblem();
  };

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-3 w-full max-w-4xl mb-4">
        <DifficultySelector 
          value={difficulty}
          onChange={setDifficulty}
          className="flex-1"
        />
        
        <div className="flex-1">
          <p className="text-base font-medium mb-1">Operation</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setOperation('addition')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                operation === 'addition'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Addition
            </button>
            <button
              onClick={() => setOperation('subtraction')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                operation === 'subtraction'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Subtraction
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl shadow-sm w-full max-w-4xl mb-4">
        <div className="text-2xl font-medium text-center mb-3">
          {currentProblem.firstNumber} 
          {currentProblem.operation === 'addition' ? ' + ' : ' - '} 
          {currentProblem.secondNumber} = ?
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-1">{currentProblem.firstNumber}</div>
            <NumberBlocks value={currentProblem.firstNumber} className="max-h-60 overflow-auto" hideTitlesIfEmpty={true} />
          </div>
          
          <div>
            <div className="mb-1">{currentProblem.secondNumber}</div>
            <NumberBlocks value={currentProblem.secondNumber} className="max-h-60 overflow-auto" hideTitlesIfEmpty={true} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mb-4">
        <NumberInput 
          label="Your Answer"
          value={userAnswer}
          onChange={setUserAnswer}
          min={0}
          max={9999}
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleSubmit}
          disabled={feedback !== null}
          className={`px-4 py-2 rounded-lg font-medium ${feedback !== null ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          Check Answer
        </button>
        
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600"
        >
          Reset Score
        </button>
      </div>

      {feedback && (
        <div className={`p-3 rounded-lg text-center text-white text-base mb-4 ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
          {feedback === 'correct' 
            ? 'Correct! Great job!' 
            : `Incorrect. The answer is ${currentProblem.answer}.`}
        </div>
      )}

      <div className="text-lg font-medium">
        Score: {score}/{totalProblems}
      </div>
    </div>
  );
}