import React, { useState, useEffect } from 'react';
import { NumberBlocks } from './NumberBlocks';

type AnimationStage = 'individual' | 'grouping' | 'grouped';

type AnimatedNumberGroupingProps = {
  value: number;
  className?: string;
};

export const AnimatedNumberGrouping: React.FC<AnimatedNumberGroupingProps> = ({ 
  value, 
  className = '',
}) => {
  const [stage, setStage] = useState<AnimationStage>('individual');
  // Track how many of each denomination have been grouped
  const [groupedThousands, setGroupedThousands] = useState(0);
  const [groupedHundreds, setGroupedHundreds] = useState(0);
  const [groupedTens, setGroupedTens] = useState(0);
  
  // Calculate total blocks and place values
  const totalBlocks = value;
  const maxThousands = Math.floor(totalBlocks / 1000);
  const maxHundreds = Math.floor((totalBlocks % 1000) / 100);
  const maxTens = Math.floor((totalBlocks % 100) / 10);
  
  // Calculate remaining blocks that haven't been grouped yet
  const remainingBlocks = totalBlocks - 
    (groupedThousands * 1000) - 
    (groupedHundreds * 100) - 
    (groupedTens * 10);
  
  const handleNextClick = () => {
    if (stage === 'individual') {
      // Start the grouping process
      setStage('grouping');
    } else if (stage === 'grouping') {
      // Group one unit at a time in order of thousands, hundreds, tens
      if (groupedThousands < maxThousands) {
        // Group one more thousand
        setGroupedThousands(groupedThousands + 1);
      } else if (groupedHundreds < maxHundreds) {
        // Group one more hundred
        setGroupedHundreds(groupedHundreds + 1);
      } else if (groupedTens < maxTens) {
        // Group one more ten
        setGroupedTens(groupedTens + 1);
      } else {
        // All possible grouping is done
        setStage('grouped');
      }
    } else {
      // Reset to initial state
      setStage('individual');
      setGroupedThousands(0);
      setGroupedHundreds(0);
      setGroupedTens(0);
    }
  };
  
  // Reset animation when value changes
  useEffect(() => {
    setStage('individual');
    setGroupedThousands(0);
    setGroupedHundreds(0);
    setGroupedTens(0);
  }, [value]);
  
  if (value < 0) {
    return <div className="text-red-500">Please enter a valid number</div>;
  }
  
  // Individual blocks view - show all as ones
  if (stage === 'individual') {
    return (
      <div className={`flex flex-col ${className}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Here are {value} blocks</h2>
        <div className="flex flex-wrap gap-1 justify-center">
          {Array(value).fill(0).map((_, i) => (
            <div key={`block-${i}`} className="relative">
              <div className="w-5 h-5 bg-orange-600 animate-bounce-in"
                style={{ animationDelay: `${i * 5}ms` }}>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={handleNextClick}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mx-auto"
        >
          Start Grouping
        </button>
      </div>
    );
  }
  
  // Grouping animation
  if (stage === 'grouping') {
    // Determine next grouping action message
    let nextActionText = "Next";
    if (groupedThousands < maxThousands) {
      nextActionText = "Group 1000 blocks";
    } else if (groupedHundreds < maxHundreds) {
      nextActionText = "Group 100 blocks";
    } else if (groupedTens < maxTens) {
      nextActionText = "Group 10 blocks";
    } else {
      nextActionText = "Complete Grouping";
    }
    
    return (
      <div className={`flex flex-col gap-8 ${className}`}>
        <h2 className="text-2xl font-bold mb-2 text-center">Grouping blocks by place value</h2>
        
        {/* Progress message */}
        <div className="text-lg text-center">
          {remainingBlocks === totalBlocks ? (
            <p>Let's group these blocks into bigger units!</p>
          ) : (
            <p>We've grouped some blocks. Let's keep going!</p>
          )}
        </div>
        
        {/* Display thousands */}
        {groupedThousands > 0 && (
          <div className="flex flex-col">
            <div className="text-xl font-medium mb-2">{groupedThousands} x 1000</div>
            <div className="flex flex-wrap gap-3">
              {Array(groupedThousands).fill(0).map((_, i) => (
                <div key={`thousand-${i}`} className="relative">
                  <div className="animate-scale-in"
                    style={{ animationDelay: `${i * 200}ms` }}>
                    {/* Thousand block content */}
                    <div className="grid grid-cols-10 grid-rows-10 max-w-[140px]">
                      {Array(100).fill(0).map((_, j) => {
                        const row = Math.floor(j / 10);
                        const col = j % 10;
                        const isEvenSquare = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);
                        return (
                          <div 
                            key={j} 
                            className={`border-[0.5px] w-3.5 h-3.5 border-gray-600 
                              ${isEvenSquare ? 'bg-white' : 'bg-black'}`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display hundreds */}
        {groupedHundreds > 0 && (
          <div className="flex flex-col">
            <div className="text-xl font-medium mb-2">{groupedHundreds} x 100</div>
            <div className="flex flex-wrap gap-3">
              {Array(groupedHundreds).fill(0).map((_, i) => (
                <div key={`hundred-${i}`} className="relative">
                  <div className="animate-scale-in"
                    style={{ animationDelay: `${i * 200}ms` }}>
                    {/* Hundred block content */}
                    <div className="grid grid-cols-10 grid-rows-10 max-w-[140px]">
                      {Array(10).fill(0).map((_, row) => (
                        <React.Fragment key={`row-${row}`}>
                          {Array(10).fill(0).map((_, col) => {
                            const colors = [
                              'bg-red-300', 'bg-orange-300', 'bg-yellow-400', 'bg-green-300', 
                              'bg-teal-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300',
                              'bg-pink-300', 'bg-rose-300',
                            ];
                            return (
                              <div 
                                key={`${row}-${col}`} 
                                className={`border-[0.5px] w-3.5 h-3.5 border-black ${colors[row]}`}
                              ></div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display tens */}
        {groupedTens > 0 && (
          <div className="flex flex-col">
            <div className="text-xl font-medium mb-2">{groupedTens} x 10</div>
            <div className="flex flex-wrap gap-3">
              {Array(groupedTens).fill(0).map((_, i) => (
                <div key={`ten-${i}`} className="relative">
                  <div className="animate-slide-in"
                    style={{ animationDelay: `${i * 200}ms` }}>
                    {/* Ten block content */}
                    <div className="grid grid-cols-1 grid-rows-10 gap-0">
                      {Array(10).fill(0).map((_, j) => (
                        <div key={j} className="border-[0.5px] border-black w-4 h-4 bg-sky-300"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Display remaining individual blocks */}
        {remainingBlocks > 0 && (
          <div className="flex flex-col">
            <div className="text-xl font-medium mb-2">Remaining blocks: {remainingBlocks}</div>
            <div className="flex flex-wrap gap-3">
              {Array(remainingBlocks).fill(0).map((_, i) => (
                <div key={`one-${i}`} className="relative">
                  <div className="w-5 h-5 bg-orange-600 animate-bounce-in">
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button 
          onClick={handleNextClick}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mx-auto"
        >
          {nextActionText}
        </button>
      </div>
    );
  }
  
  // Final grouped view
  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {value} grouped by place value
      </h2>
      <NumberBlocks value={value} animate={true} />
      <button 
        onClick={handleNextClick}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mx-auto"
      >
        Start Over
      </button>
    </div>
  );
}; 