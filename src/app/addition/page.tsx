"use client";

import React, { useState } from 'react';
import { NumberInput } from '@/components/NumberInput';
import { NumberBlocks } from '@/components/NumberBlocks';
import { AnimationController } from '@/components/AnimationController';

export default function AdditionPage() {
  const [firstNumber, setFirstNumber] = useState<number>(10);
  const [secondNumber, setSecondNumber] = useState<number>(5);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const sum = firstNumber + secondNumber;

  const handleCalculate = () => {
    setShowResult(false);
    setIsAnimating(true);
    
    // Show result after animation delay
    setTimeout(() => {
      setShowResult(true);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg max-w-2xl text-center mb-3">
        See how numbers add together with visual blocks.
      </p>

      <div className="w-full max-w-2xl mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput 
          label="First Number"
          value={firstNumber}
          onChange={setFirstNumber}
          min={0}
          max={9999}
        />
        <NumberInput 
          label="Second Number"
          value={secondNumber}
          onChange={setSecondNumber}
          min={0}
          max={9999}
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={isAnimating}
        className={`px-4 py-2 rounded-lg font-medium mb-4 ${isAnimating ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Add Numbers
      </button>

      <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
        <div className="p-3 rounded-xl">
          <div className="mb-2">{firstNumber}</div>
          <NumberBlocks value={firstNumber} hideTitlesIfEmpty={true} />
        </div>
        
        <div className="p-3 rounded-xl">
          <div className="mb-2">{secondNumber}</div>
          <NumberBlocks value={secondNumber} hideTitlesIfEmpty={true} />
        </div>
        
        {showResult && (
          <div className="p-3 rounded-xl">
            <div className="mb-2">{sum}</div>
            <AnimationController isPlaying={true}>
              <NumberBlocks value={sum} animate={true} hideTitlesIfEmpty={true} />
            </AnimationController>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-2xl font-medium">
        {firstNumber} + {secondNumber} = {showResult ? sum : '?'}
      </div>
    </div>
  );
}