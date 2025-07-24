
import React from 'react';
import { Link } from 'react-router-dom';
import { AppDefinition } from '../../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface AppIconProps {
  app: AppDefinition;
}

const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const { theme } = useTheme();

  return (
    <Link to={app.path} className="flex flex-col items-center space-y-2 text-center" aria-label={app.name}>
      <div 
        className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95" 
        style={{ backgroundColor: app.themeColor }}
      >
        {app.icon}
      </div>
      <span className={`text-xs w-full break-words ${theme.text}`}>{app.name}</span>
    </Link>
  );
};

export default AppIcon;
