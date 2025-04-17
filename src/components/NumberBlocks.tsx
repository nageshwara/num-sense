import React from 'react';

type NumberBlocksProps = {
  value: number;
  animate?: boolean;
  className?: string;
  hideTitlesIfEmpty?: boolean;
};

export const NumberBlocks: React.FC<NumberBlocksProps> = ({ 
  value, 
  animate = false,
  className = '',
  hideTitlesIfEmpty = true
}) => {
  if (value < 0 || value > 9999) {
    return <div className="text-red-500">Please enter a number between 0 and 9999</div>;
  }

  // Extract digit places
  const thousands = Math.floor(value / 1000);
  const hundreds = Math.floor((value % 1000) / 100);
  const tens = Math.floor((value % 100) / 10);
  const ones = value % 10;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {thousands > 0 && (
        <div className="flex flex-col">
          <div className="text-2xl font-medium mb-0.5">{thousands} x 1000</div>
          <div className="grid grid-cols-10 gap-1">
            {Array(thousands).fill(0).map((_, i) => (
              <div key={`thousand-${i}`} className="relative">
                <div 
                  className={`bg-gray-800 block-3d ${animate ? 'animate-scale-in' : ''}`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="grid grid-cols-10 grid-rows-10">
                    {Array(100).fill(0).map((_, j) => {
                      const row = Math.floor(j / 10);
                      const col = j % 10;
                      // Create classic black and white checkerboard pattern
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

      {(!hideTitlesIfEmpty || hundreds > 0) && (
        <div className="flex flex-col">
          <div className="text-2xl font-medium mb-0.5">{hundreds} x 100</div>
          <div className="flex flex-wrap gap-1">
            {hundreds > 0 && Array(hundreds).fill(0).map((_, i) => (
              <div 
                key={`hundred-${i}`} 
                className="relative"
              >
                <div 
                  className={`bg-blue-100 block-3d ${animate ? 'animate-scale-in' : ''}`}
                  style={{ animationDelay: `${(i) * 30}ms` }}
                >
                  <div className="grid grid-cols-10 grid-rows-10">
                    {Array(10).fill(0).map((_, row) => (
                      // Create each row with a different rainbow color
                      <React.Fragment key={`row-${row}`}>
                        {Array(10).fill(0).map((_, col) => {
                          // Get rainbow colors - one color per row
                          const colors = [
                            'bg-red-500',    // Red
                            'bg-orange-500', // Orange
                            'bg-yellow-400', // Yellow
                            'bg-green-500',  // Green
                            'bg-teal-500',   // Teal
                            'bg-blue-500',   // Blue
                            'bg-indigo-500', // Indigo
                            'bg-purple-500', // Purple
                            'bg-pink-500',   // Pink
                            'bg-rose-500',   // Rose
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

      {(!hideTitlesIfEmpty || tens > 0) && (
        <div className="flex flex-col">
          <div className="text-2xl font-medium mb-0.5">{tens} x 10</div>
          <div className="flex flex-wrap gap-1">
            {tens > 0 && Array(tens).fill(0).map((_, i) => (
              <div key={`ten-${i}`} className="relative">
                <div 
                  className={`bg-sky-400 block-3d ${animate ? 'animate-slide-in' : ''}`}
                  style={{ animationDelay: `${(i) * 30}ms` }}
                >
                  <div className="grid grid-cols-1 grid-rows-10">
                    {Array(10).fill(0).map((_, j) => (
                      <div key={j} className="border-[0.5px] border-black w-6 h-6 bg-sky-300"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!hideTitlesIfEmpty || ones > 0) && (
      <div className="flex flex-col">
        <div className="text-2xl font-medium mb-0.5">{ones} x 1</div>
        <div className="flex flex-wrap gap-1">
          {ones > 0 && Array(ones).fill(0).map((_, i) => (
            <div key={`one-${i}`} className="relative">
              <div 
                className={`w-6 h-6 bg-orange-600 block-3d ${animate ? 'animate-bounce-in' : ''}`}
                style={{ animationDelay: `${(i) * 30}ms` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};
