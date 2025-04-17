import React, { useState, useEffect } from 'react';

type AnimationControllerProps = {
  children: React.ReactNode;
  isPlaying: boolean;
  onComplete?: () => void;
  speed?: 'slow' | 'normal' | 'fast';
  loop?: boolean;
};

export const AnimationController: React.FC<AnimationControllerProps> = ({
  children,
  isPlaying,
  speed = 'normal',
}) => {
  const [key, setKey] = useState<number>(0);

  // Speed multiplier
  const speedFactor = {
    slow: 1.5,
    normal: 1,
    fast: 0.5,
  }[speed];

  // Reset animation when isPlaying changes to true
  useEffect(() => {
    if (isPlaying) {
      setKey(prev => prev + 1);
    }
  }, [isPlaying]);

  return (
    <div 
      className={`animation-container ${isPlaying ? 'playing' : 'paused'}`}
      style={{
        '--speed-factor': speedFactor,
      } as React.CSSProperties}
      key={key}
    >
      {children}
    </div>
  );
};
