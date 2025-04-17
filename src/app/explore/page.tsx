"use client";

import React, { useState } from 'react';
import { NumberInput } from '@/components/NumberInput';
import { AnimatedNumberGrouping } from '@/components/AnimatedNumberGrouping';

export default function ExplorePage() {
  const [number, setNumber] = useState<number>(123);
  const [key, setKey] = useState<number>(0);

  // Reset animation when number changes
  const handleNumberChange = (newValue: number) => {
    setNumber(newValue);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg mb-4">
        <NumberInput 
          label="Enter a number between 1 and 9999"
          value={number}
          onChange={handleNumberChange}
          min={1}
          max={9999}
        />
      </div>

      <div className="p-4 rounded-xl shadow-sm w-full max-w-4xl">
        <AnimatedNumberGrouping 
          key={key} 
          value={number} 
          className="animate-fade-in" 
        />
      </div>
    </div>
  );
}