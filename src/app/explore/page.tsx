"use client";

import React, { useState } from 'react';
import { NumberInput } from '@/components/NumberInput';
import { NumberBlocks } from '@/components/NumberBlocks';

export default function ExplorePage() {
  const [number, setNumber] = useState<number>(123);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg mb-4">
        <NumberInput 
          label="Enter a number between 1 and 9999"
          value={number}
          onChange={setNumber}
          min={1}
          max={9999}
        />
      </div>

      <div className="p-4 rounded-xl shadow-sm w-full max-w-4xl">
        <NumberBlocks value={number} animate={true} hideTitlesIfEmpty={true} />
      </div>
    </div>
  );
}