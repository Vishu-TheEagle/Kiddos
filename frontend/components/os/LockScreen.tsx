
import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
        className="h-full w-full flex flex-col justify-between p-12 text-white bg-cover bg-center" 
        style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://source.unsplash.com/random/430x932?space,stars)'}}
        onClick={onUnlock}
        role="button"
        tabIndex={0}
        aria-label="Unlock screen"
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-xl opacity-80">{time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="mt-4 text-sm font-light tracking-wider opacity-80 animate-pulse">Tap anywhere to Unlock</p>
      </div>
    </div>
  );
};

export default LockScreen;
