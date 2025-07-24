
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import TopBar from './TopBar';
import { APPS } from '../../../constants';
import AppIcon from './AppIcon';

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`h-full w-full flex flex-col ${theme.background} ${theme.text} overflow-hidden`}>
      <TopBar />
      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6 px-2">Good Morning!</h1>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 text-center">
            {APPS.map((app) => (
                <AppIcon key={app.id} app={app} />
            ))}
        </div>
      </main>
      <footer className="p-6">
          <div className={`w-32 h-1.5 ${theme.secondary} rounded-full mx-auto`}></div>
      </footer>
    </div>
  );
};

export default HomeScreen;
