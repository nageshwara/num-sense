"use client";

import React, { useState, useEffect } from 'react';
import { NumberInput } from '@/components/NumberInput';
import { NumberBlocks } from '@/components/NumberBlocks';
import { AnimationController } from '@/components/AnimationController';

export default function SubtractionPage() {
  const [firstNumber, setFirstNumber] = useState<number>(10);
  const [secondNumber, setSecondNumber] = useState<number>(5);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Reset states when numbers change
    setShowResult(false);
    setError("");
  }, [firstNumber, secondNumber]);

  const handleCalculate = () => {
    if (firstNumber < secondNumber) {
      setError("The first number must be greater than or equal to the second number.");
      return;
    }
    
    setError("");
    setShowResult(false);
    setIsAnimating(true);
    
    // Show result after animation delay
    setTimeout(() => {
      setShowResult(true);
      setIsAnimating(false);
    }, 2000);
  };

  const difference = firstNumber - secondNumber;

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg max-w-2xl text-center mb-3">
        See how numbers subtract with visual blocks.
      </p>

      <div className="w-full max-w-2xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumberInput 
          label="First Number"
          value={firstNumber}
          onChange={setFirstNumber}
          min={1}
          max={100}
        />
        <NumberInput 
          label="Second Number"
          value={secondNumber}
          onChange={setSecondNumber}
          min={1}
          max={100}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleCalculate}
        disabled={isAnimating || firstNumber < secondNumber}
        className={`px-8 py-4 rounded-lg text-xl font-medium mb-8 ${isAnimating || firstNumber < secondNumber ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
      >
        Subtract Numbers
      </button>

      <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
        <div className="p-6 bg-blue-50 rounded-xl">
          <h3 className="text-xl font-medium mb-4">Starting Number: {firstNumber}</h3>
          <NumberBlocks value={firstNumber} />
        </div>
        
        <div className="p-6 bg-red-50 rounded-xl">
          <h3 className="text-xl font-medium mb-4">Taking Away: {secondNumber}</h3>
          <NumberBlocks value={secondNumber} />
        </div>
        
        {showResult && (
          <div className="p-6 bg-green-50 rounded-xl">
            <h3 className="text-xl font-medium mb-4">Result: {difference}</h3>
            <AnimationController isPlaying={true}>
              <NumberBlocks value={difference} animate={true} />
            </AnimationController>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-3xl font-bold">
        {firstNumber} - {secondNumber} = {showResult ? difference : '?'}
      </div>
    </div>
  );
}