import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { Theme, ThemeName } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';

// 1. Define the available themes
const THEMES: Record<ThemeName, Theme> = {
  'Pastel Day': {
    name: 'Pastel Day',
    background: 'bg-rose-50',
    primary: 'bg-sky-400',
    secondary: 'bg-white',
    accent: 'bg-amber-300',
    text: 'text-gray-800',
    textSecondary: 'text-gray-500',
  },
  'Midnight Blue': {
    name: 'Midnight Blue',
    background: 'bg-slate-900',
    primary: 'bg-blue-600',
    secondary: 'bg-slate-800',
    accent: 'bg-purple-500',
    text: 'text-white',
    textSecondary: 'text-gray-400',
  },
  'Forest Green': {
    name: 'Forest Green',
    background: 'bg-green-900',
    primary: 'bg-lime-500',
    secondary: 'bg-green-800',
    accent: 'bg-yellow-600',
    text: 'text-green-50',
    textSecondary: 'text-gray-300',
  },
  'Sunset Orange': {
    name: 'Sunset Orange',
    background: 'bg-gray-800',
    primary: 'bg-orange-500',
    secondary: 'bg-gray-700',
    accent: 'bg-pink-500',
    text: 'text-white',
    textSecondary: 'text-gray-300',
  },
};

// 2. Define the context type for consumers
interface ThemeContextType {
  theme: Theme;
  setTheme: (name: ThemeName) => void;
  availableThemes: Theme[];
}

// 3. Create the React Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 4. Create the ThemeProvider component
export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [themeName, setThemeName] = useLocalStorage<ThemeName>('kiddos-theme', 'Pastel Day');

  const setTheme = (name: ThemeName) => {
    if (THEMES[name]) {
      setThemeName(name);
    }
  };

  // Memoize values to prevent unnecessary re-renders
  const theme = useMemo(() => THEMES[themeName], [themeName]);
  const availableThemes = useMemo(() => Object.values(THEMES), []);

  const value = {
    theme,
    setTheme,
    availableThemes,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 5. Create a custom hook for easy consumption
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
