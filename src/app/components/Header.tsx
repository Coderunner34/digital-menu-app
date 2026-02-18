import { Menu, X, ShoppingBag, Search, Bell, Sun, Moon, Home, Coffee, Users, Image, Info, Phone, Settings, Gift, Star, Clock, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../../context/CartContext';
import { getSettings, getNotifications, markNotificationAsRead, clearAllNotifications, addNotification, Notification } from '../../utils/storage';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(getSettings());
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  // Load notifications from storage
  useEffect(() => {
    const loadNotifications = () => {
      const allNotifications = getNotifications();
      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter((n: Notification) => !n.read).length);
    };
    
    loadNotifications();
    
    const handleStorageChange = () => {
      loadNotifications();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Create welcome notification on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('has_visited');
    if (!hasVisited) {
      addNotification({
        type: 'system',
        title: 'Welcome to ' + settings.name,
        message: 'Thank you for visiting! Browse our menu and place your order.',
        link: '/menu'
      });
      localStorage.setItem('has_visited', 'true');
      
      // Reload notifications
      const allNotifications = getNotifications();
      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter((n: Notification) => !n.read).length);
    }
  }, [settings.name]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Settings change listener
  useEffect(() => {
    const handleStorageChange = () => {
      setSettings(getSettings());
      document.title = getSettings().name || 'Digital Menu';
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setShowNotifications(false);
  }, [location]);

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleClearAll = () => {
    clearAllNotifications();
    setNotifications([]);
    setUnreadCount(0);
  };

  // Add item to cart notification
  useEffect(() => {
    const lastCartCount = localStorage.getItem('last_cart_count');
    const currentCount = count;
    
    if (lastCartCount && parseInt(lastCartCount) < currentCount && currentCount > 0) {
      // Item was added to cart
      const itemName = cart.length > 0 ? cart[cart.length - 1]?.name || 'Item' : 'Item';
      addNotification({
        type: 'order',
        title: 'Added to Cart',
        message: `${itemName} has been added to your cart.`,
        link: '/cart'
      });
      
      // Reload notifications
      const allNotifications = getNotifications();
      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter((n: Notification) => !n.read).length);
    }
    
    localStorage.setItem('last_cart_count', currentCount.toString());
  }, [count, cart]);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/menu', label: 'Menu', icon: <Coffee className="w-4 h-4" /> },
    { path: '/catering', label: 'Catering', icon: <Users className="w-4 h-4" /> },
    { path: '/gallery', label: 'Gallery', icon: <Image className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'order': return <ShoppingBag className="w-4 h-4" />;
      case 'promo': return <Gift className="w-4 h-4" />;
      case 'loyalty': return <Star className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'order': return 'bg-blue-500';
      case 'promo': return 'bg-green-500';
      case 'loyalty': return 'bg-amber-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <>
      {/* Main Header - Modern Bubble Design */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.div
          animate={{
            scale: scrolled ? 0.9 : 1,
            y: scrolled ? -5 : 0,
            width: scrolled ? '90%' : '95%',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            flex items-center justify-between
            max-w-7xl mx-auto
            px-4 sm:px-6 py-2 sm:py-3
            rounded-2xl sm:rounded-full
            backdrop-blur-xl
            transition-all duration-300
            border border-white/30 dark:border-gray-700/30
            shadow-lg
            bg-transparent dark:bg-transparent
          `}
        >
          {/* Left side - Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0"
            >
              {settings.logo?.startsWith('data:') ? (
                <img src={settings.logo} alt={settings.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm sm:text-base">
                  {settings.name?.charAt(0) || 'A'}
                </span>
              )}
            </motion.div>
            <motion.span 
              animate={{ fontSize: scrolled ? '14px' : '16px' }}
              className={`font-semibold block text-sm sm:text-base truncate max-w-[120px] sm:max-w-[200px] ${
                scrolled 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
              }`}
            >
              {settings.name}
            </motion.span>
          </Link>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all
                    ${isActive 
                      ? scrolled 
                        ? 'text-amber-600 dark:text-amber-400 bg-white/30 dark:bg-white/10' 
                        : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] bg-white/20'
                      : scrolled 
                        ? 'text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-white/30 dark:hover:bg-white/10'
                        : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] hover:bg-white/20'
                    }
                  `}
                >
                  <span className="hidden lg:inline">{item.label}</span>
                  <span className="lg:hidden">{item.icon}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors relative group"
            >
              <Search className={`w-4 h-4 sm:w-5 sm:h-5 ${
                scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
              }`} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Search
              </span>
            </motion.button>

            {/* Notifications */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
              ref={notificationRef}
            >
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors relative group"
              >
                <Bell className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
                }`} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Notifications
                </span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-500" />
                        Notifications
                      </h3>
                      {notifications.length > 0 && (
                        <button 
                          onClick={handleClearAll} 
                          className="text-xs text-gray-500 hover:text-amber-600 transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">No notifications yet</p>
                          <p className="text-xs text-gray-400 mt-1">We'll notify you when something happens</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => handleMarkAsRead(notification.id)}
                            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                              !notification.read ? 'bg-amber-50/30 dark:bg-amber-900/5' : ''
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className={`w-8 h-8 rounded-full ${getNotificationColor(notification.type)} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                                <div className={`w-6 h-6 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center text-white`}>
                                  {getNotificationIcon(notification.type)}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-amber-500 rounded-full" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(notification.timestamp)}
                                  </span>
                                  {notification.link && (
                                    <Link to={notification.link} className="text-[10px] text-amber-600 hover:text-amber-700 font-medium">
                                      View →
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/cart"
                className="relative p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors group"
              >
                <ShoppingBag className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
                }`} />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                  >
                    {count}
                  </motion.span>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Cart
                </span>
              </Link>
            </motion.div>

            {/* Dark Mode - FIXED: Sun for light mode, Moon for dark mode */}
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="hidden sm:block p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors group relative"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? 
                <Sun className={`w-5 h-5 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
                }`} /> : 
                <Moon className={`w-5 h-5 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
                }`} />
              }
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {darkMode ? 'Light' : 'Dark'}
              </span>
            </motion.button>

            {/* Admin */}
            <Link
              to="/admin"
              className="hidden lg:block p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors group relative"
            >
              <Settings className={`w-5 h-5 ${
                scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
              }`} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Admin
              </span>
            </Link>

            {/* WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors group relative text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-colors relative group"
            >
              {menuOpen ? 
                <X className={`w-5 h-5 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
                }`} /> : 
                <Menu className={`w-5 h-5 ${
                  scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]'
                }`} />
              }
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Menu
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-0 right-0 z-40 flex justify-center px-4 pt-20"
          >
            <div className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden p-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-0 right-0 z-40 flex justify-center px-4 pt-20 md:hidden"
          >
            <motion.div 
              className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden p-2"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mt-2 border-t border-gray-200 dark:border-gray-700 pt-4"
              >
                <Settings className="w-4 h-4" />
                <span className="font-medium">Admin</span>
              </Link>

              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-green-500 hover:bg-green-600 transition-all mt-2"
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">Order via WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}