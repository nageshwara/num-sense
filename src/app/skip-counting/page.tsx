"use client";

import React, { useState, useEffect } from 'react';
import { NumberInput } from '@/components/NumberInput';
import { NumberBlocks } from '@/components/NumberBlocks';
import { AnimationController } from '@/components/AnimationController';

export default function SkipCountingPage() {
  const [step, setStep] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [maxCount, setMaxCount] = useState<number>(50);

  // Reset count when step changes
  useEffect(() => {
    setCount(0);
    setIsPlaying(false);
  }, [step]);

  // Auto-increment counter when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && count < maxCount) {
      timer = setTimeout(() => {
        setCount(prev => prev + step);
      }, 2000); // Wait 2 seconds between counts
    } else if (count >= maxCount) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, count, step, maxCount]);

  const handlePlay = () => {
    if (count >= maxCount) {
      setCount(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCount(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl p-2">
        <div className="text-6xl font-medium text-center text-blue-600 mb-2">{count}</div>
        <div className="text-center text-lg mb-2">
          {Array.from({ length: Math.floor(count / step) + 1 }).map((_, i) => (
            <span key={i} className={`inline-block mx-1 font-bold`}>
              {i * step}
            </span>
          ))}
        </div>        
        <AnimationController isPlaying={true}>
          <NumberBlocks value={count} animate={true} hideTitlesIfEmpty={true} />
        </AnimationController>        
      </div>

      <div className="w-full max-w-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput 
          label="Count by"
          value={step}
          onChange={setStep}
          min={1}
          max={1000}
        />
        <NumberInput 
          label="Count up to"
          value={maxCount}
          onChange={setMaxCount}
          min={step}
          max={9999}
        />
      </div>

      <div className="flex gap-3 my-2">
        {count >= maxCount ? (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600"
          >
            Restart
          </button>
        ) : count === 0 ? (
          <button
            onClick={handlePlay}
            className="px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600"
          >
            Start
          </button>
        ) : (
          <>
            {isPlaying ? (
              <button
                onClick={handlePause}
                className="px-4 py-2 rounded-lg font-medium bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600"
              >
                Resume
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600"
            >
              Restart
            </button>
          </>
        )}
      </div>
    </div>
  );
}