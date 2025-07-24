
import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import { useTheme } from '../../contexts/ThemeContext';

interface OSFrameProps {
  appName: string;
  bgColor: string;
  children: React.ReactNode;
}

const OSFrame: React.FC<OSFrameProps> = ({ appName, bgColor, children }) => {
  const { theme } = useTheme();

  return (
    <div className={`h-full w-full flex flex-col ${theme.background}`}>
      <header style={{ backgroundColor: bgColor }} className="z-10 text-white flex-shrink-0">
        <TopBar />
        <div className="p-2 flex items-center relative h-12">
          <Link to="/" className="absolute left-2 p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </Link>
          <h1 className="text-lg font-bold text-center w-full">{appName}</h1>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default OSFrame;
