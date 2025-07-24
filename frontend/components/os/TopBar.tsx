
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const TopBar: React.FC = () => {
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
        }, 1000 * 60); // Update every minute
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`w-full h-8 px-4 flex justify-between items-center text-xs font-semibold z-50 ${theme.text}`}>
            <span>{currentTime}</span>
            <div className="flex items-center space-x-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                <span>100%</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-1h-2V7h2zM22 11h-2v2h2v-2z" opacity="0.3"></path><rect x="4" y="6" width="16" height="12" fill="currentColor" rx="1"></rect></svg>
            </div>
        </div>
    );
}

export default TopBar;
