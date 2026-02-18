import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AIAssistant } from '../components/AIAssistant';
import { useState, useEffect } from 'react';
import { initializeStorage } from '../../utils/storage';
import { QRCode } from '../components/QRCodes'; 

export function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize storage on app load
    initializeStorage();
    
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
<div className="min-h-screen bg-transparent dark:bg-transparent text-[#212121] dark:text-[#F5F5F5] transition-colors duration-300">   
  <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="pt-0">
        <Outlet />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
