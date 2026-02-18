import { Outlet, useLocation } from 'react-router'; // Add useLocation
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AIAssistant } from '../components/AIAssistant';
import { useState, useEffect } from 'react';
import { initializeStorage } from '../../utils/storage';

export function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); // Get current route
  
  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

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
      {/* Only show Header on non-admin routes */}
      {!isAdminRoute && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      
      {/* Main content - no padding for admin, normal padding for others */}
      <main className={!isAdminRoute ? "pt-0" : ""}>
        <Outlet />
      </main>
      
      {/* Only show Footer on non-admin routes */}
      {!isAdminRoute && <Footer />}
      
      {/* Only show AI Assistant on non-admin routes */}
      {!isAdminRoute && <AIAssistant />}
    </div>
  );
}