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
  if (value < 0) {
    return <div className="text-red-500">Please enter a valid number</div>;
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
          <div className="flex flex-wrap gap-3">
            {Array(thousands).fill(0).map((_, i) => (
              <div key={`thousand-${i}`} className="relative">
                <div 
                  className={animate ? 'animate-scale-in' : ''}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="grid grid-cols-10 grid-rows-10 max-w-[140px]">
                    {Array(100).fill(0).map((_, j) => {
                      const row = Math.floor(j / 10);
                      const col = j % 10;
                      // Create classic black and white checkerboard pattern
                      const isEvenSquare = (row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1);
                      return (
                        <div 
                          key={j} 
                          className={`border-[0.5px] w-3.5 h-3.5 border-black
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
          <div className="flex flex-wrap gap-3">
            {hundreds > 0 && Array(hundreds).fill(0).map((_, i) => (
              <div 
                key={`hundred-${i}`} 
                className="relative"
              >
                <div 
                  className={animate ? 'animate-scale-in' : ''}
                  style={{ animationDelay: `${(i) * 100}ms` }}
                >
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

      {(!hideTitlesIfEmpty || tens > 0) && (
        <div className="flex flex-col">
          <div className="text-2xl font-medium mb-0.5">{tens} x 10</div>
          <div className="flex flex-wrap gap-3">
            {tens > 0 && Array(tens).fill(0).map((_, i) => (
              <div key={`ten-${i}`} className="relative">
                <div 
                  className={animate ? 'animate-slide-in' : ''}
                  style={{ animationDelay: `${(i) * 100}ms` }}
                >
                  <div className="grid grid-cols-1 grid-rows-10">
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

      {(!hideTitlesIfEmpty || ones > 0) && (
      <div className="flex flex-col">
        <div className="text-2xl font-medium mb-0.5">{ones} x 1</div>
        <div className="flex flex-wrap gap-3">
          {ones > 0 && Array(ones).fill(0).map((_, i) => (
            <div key={`one-${i}`} className="relative">
              <div 
                className={`w-5 h-5 bg-orange-600  ${animate ? 'animate-bounce-in' : ''}`}
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
