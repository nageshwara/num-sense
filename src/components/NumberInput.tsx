import React, { useState } from 'react';

type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  className?: string;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  max = 9999,
  min = 0,
  className = ''
}) => {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    
    if (isNaN(newValue)) {
      setError('Please enter a valid number');
      return;
    }  
    if (newValue > max) {
      setError(`Number must be ${max} or less`);
    } else if (newValue < min) {
      setError(`Number must be at least ${min}`);
    } else {
      setError('');
    }    
    onChange(newValue);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-lg font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value === 0 ? '' : value}
        onChange={handleChange}
        min={min}
        max={max}
        className="p-2 text-xl border-1 border-blue-300 rounded-md focus:border-blue-500 focus:outline-none"
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};
