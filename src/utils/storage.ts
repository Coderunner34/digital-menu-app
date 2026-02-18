// import { MenuItem, AppSettings, defaultSettings, defaultMenuItems, Category, defaultCategories } from '../data/menuData';



// const STORAGE_KEYS = {
//   MENU_ITEMS: 'mobile_kitchen_menu',
//   SETTINGS: 'mobile_kitchen_settings',
//   CART: 'mobile_kitchen_cart',
//   GALLERY: 'mobile_kitchen_gallery',
//   ADMIN_PASSWORD: 'mobile_kitchen_admin_password',
//   CATEGORIES: 'mobile_kitchen_categories',
// };

// // Initialize storage with defaults if empty
// export const initializeStorage = () => {
//   if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
//     localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(defaultMenuItems));
//   }
//   if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
//     localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
//   }
//   if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
//     localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123');
//   }
//   if (!localStorage.getItem(STORAGE_KEYS.CART)) {
//     localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
//   }
//   if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
//     localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify([]));
//   }
//   if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
//   localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
// }
// };

// // Menu Items
// export const getMenuItems = (): MenuItem[] => {
//   const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
//   return items ? JSON.parse(items) : defaultMenuItems;
// };

// export const saveMenuItems = (items: MenuItem[]) => {
//   localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
// };

// export const addMenuItem = (item: MenuItem) => {
//   const items = getMenuItems();
//   items.push(item);
//   saveMenuItems(items);
// };

// export const updateMenuItem = (id: string, updatedItem: Partial<MenuItem>) => {
//   const items = getMenuItems();
//   const index = items.findIndex(item => item.id === id);
//   if (index !== -1) {
//     items[index] = { ...items[index], ...updatedItem };
//     saveMenuItems(items);
//   }
// };

// export const deleteMenuItem = (id: string) => {
//   const items = getMenuItems();
//   const filtered = items.filter(item => item.id !== id);
//   saveMenuItems(filtered);
// };

// // Settings
// export const getSettings = (): AppSettings => {
//   const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
//   return settings ? JSON.parse(settings) : defaultSettings;
// };

// export const saveSettings = (settings: AppSettings) => {
//   localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
// };

// // Cart
// export interface CartItem extends MenuItem {
//   quantity: number;
// }

// export const getCart = (): CartItem[] => {
//   const cart = localStorage.getItem(STORAGE_KEYS.CART);
//   return cart ? JSON.parse(cart) : [];
// };

// export const saveCart = (cart: CartItem[]) => {
//   localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
// };

// export const addToCart = (item: MenuItem) => {
//   const cart = getCart();
//   const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cart.push({ ...item, quantity: 1 });
//   }
  
//   saveCart(cart);
// };

// export const updateCartItemQuantity = (id: string, quantity: number) => {
//   const cart = getCart();
//   const item = cart.find(cartItem => cartItem.id === id);
  
//   if (item) {
//     if (quantity <= 0) {
//       removeFromCart(id);
//     } else {
//       item.quantity = quantity;
//       saveCart(cart);
//     }
//   }
// };

// export const removeFromCart = (id: string) => {
//   const cart = getCart();
//   const filtered = cart.filter(item => item.id !== id);
//   saveCart(filtered);
// };

// export const clearCart = () => {
//   saveCart([]);
// };

// export const getCartTotal = (): number => {
//   const cart = getCart();
//   return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
// };

// export const getCartCount = (): number => {
//   const cart = getCart();
//   return cart.reduce((count, item) => count + item.quantity, 0);
// };

// // Gallery
// export const getGalleryImages = (): string[] => {
//   const gallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
//   return gallery ? JSON.parse(gallery) : [];
// };

// export const addGalleryImage = (imageUrl: string) => {
//   const gallery = getGalleryImages();
//   gallery.push(imageUrl);
//   localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
// };

// export const deleteGalleryImage = (imageUrl: string) => {
//   const gallery = getGalleryImages();
//   const filtered = gallery.filter(img => img !== imageUrl);
//   localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
// };

// // Admin
// export const checkAdminPassword = (password: string): boolean => {
//   const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
//   return password === storedPassword;
// };

// export const updateAdminPassword = (newPassword: string) => {
//   localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
// };


// // Add these types to your existing types
// export interface UserProfile {
//   id: string;
//   name: string;
//   phone: string;
//   email?: string;
//   loyaltyPoints: number;
//   preferences: string[];
//   orderCount: number;
//   totalSpent: number;
//   createdAt: string;
//   lastLogin: string;
// }

// export interface Notification {
//   id: string;
//   type: 'order' | 'promo' | 'loyalty' | 'system';
//   title: string;
//   message: string;
//   timestamp: string;
//   read: boolean;
//   link?: string;
//   image?: string;
// }

// // Add these functions
// export function getUserProfile(): UserProfile | null {
//   const stored = localStorage.getItem('user_profile');
//   return stored ? JSON.parse(stored) : null;
// }

// export function saveUserProfile(profile: UserProfile): void {
//   localStorage.setItem('user_profile', JSON.stringify(profile));
// }

// export function getNotifications(): Notification[] {
//   const stored = localStorage.getItem('notifications');
//   if (stored) return JSON.parse(stored);


  
  
//   // Generate sample notifications
//   const sampleNotifications: Notification[] = [
//     {
//       id: '1',
//       type: 'promo',
//       title: '🎉 Welcome Offer!',
//       message: 'Get 20% off on your first order. Use code: WELCOME20',
//       timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
//       read: false,
//       link: '/menu?promo=welcome20'
//     },
//     {
//       id: '2',
//       type: 'loyalty',
//       title: '✨ Double Points Weekend',
//       message: 'Earn double loyalty points on all orders this weekend!',
//       timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
//       read: false,
//       link: '/menu'
//     },
//     {
//       id: '3',
//       type: 'order',
//       title: '✅ Order Ready',
//       message: 'Your order #ORD-2401 is ready for pickup',
//       timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
//       read: true,
//       link: '/orders'
//     }
//   ];
  
//   localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
//   return sampleNotifications;
// }

// export function markNotificationAsRead(id: string): void {
//   const notifications = getNotifications();
//   const updated = notifications.map(n => 
//     n.id === id ? { ...n, read: true } : n
//   );
//   localStorage.setItem('notifications', JSON.stringify(updated));
// }

// export function clearAllNotifications(): void {
//   localStorage.setItem('notifications', JSON.stringify([]));
// }

// export function addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
//   const notifications = getNotifications();
//   const newNotification: Notification = {
//     ...notification,
//     id: `notif-${Date.now()}`,
//     timestamp: new Date().toISOString(),
//     read: false
//   };
//   notifications.unshift(newNotification);
//   localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, 50))); // Keep last 50




// }




import { MenuItem, AppSettings, defaultSettings, defaultMenuItems, Category, defaultCategories } from '../data/menuData';

const STORAGE_KEYS = {
  MENU_ITEMS: 'mobile_kitchen_menu',
  SETTINGS: 'mobile_kitchen_settings',
  CART: 'mobile_kitchen_cart',
  GALLERY: 'mobile_kitchen_gallery',
  ADMIN_PASSWORD: 'mobile_kitchen_admin_password',
  CATEGORIES: 'mobile_kitchen_categories',
};

// Initialize storage with defaults if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(defaultMenuItems));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123');
  }
  if (!localStorage.getItem(STORAGE_KEYS.CART)) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
  }
};

// Menu Items
export const getMenuItems = (): MenuItem[] => {
  const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
  return items ? JSON.parse(items) : defaultMenuItems;
};

export const saveMenuItems = (items: MenuItem[]) => {
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
};

export const addMenuItem = (item: MenuItem) => {
  const items = getMenuItems();
  items.push(item);
  saveMenuItems(items);
};

export const updateMenuItem = (id: string, updatedItem: Partial<MenuItem>) => {
  const items = getMenuItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    saveMenuItems(items);
  }
};

export const deleteMenuItem = (id: string) => {
  const items = getMenuItems();
  const filtered = items.filter(item => item.id !== id);
  saveMenuItems(filtered);
};

// Settings
export const getSettings = (): AppSettings => {
  const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return settings ? JSON.parse(settings) : defaultSettings;
};

export const saveSettings = (settings: AppSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

// Cart
export interface CartItem extends MenuItem {
  quantity: number;
}

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const addToCart = (item: MenuItem) => {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
};

export const updateCartItemQuantity = (id: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find(cartItem => cartItem.id === id);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
};

export const removeFromCart = (id: string) => {
  const cart = getCart();
  const filtered = cart.filter(item => item.id !== id);
  saveCart(filtered);
};

export const clearCart = () => {
  saveCart([]);
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Gallery
export const getGalleryImages = (): string[] => {
  const gallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
  return gallery ? JSON.parse(gallery) : [];
};

export const addGalleryImage = (imageUrl: string) => {
  const gallery = getGalleryImages();
  gallery.push(imageUrl);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
};

export const deleteGalleryImage = (imageUrl: string) => {
  const gallery = getGalleryImages();
  const filtered = gallery.filter(img => img !== imageUrl);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
};

// Admin
export const checkAdminPassword = (password: string): boolean => {
  const storedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  return password === storedPassword;
};

export const updateAdminPassword = (newPassword: string) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
};

// Categories
export const getCategories = (): Category[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return stored ? JSON.parse(stored) : defaultCategories;
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

export const addCategory = (category: Omit<Category, 'id'>) => {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: `cat-${Date.now()}`,
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updates };
    saveCategories(categories);
  }
};

export const deleteCategory = (id: string) => {
  if (id === 'all' || id === 'popular') return false;
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  saveCategories(filtered);
  return true;
};

export const getActiveCategories = () => {
  return getCategories().filter(c => c.isActive && c.id !== 'all' && c.id !== 'popular');
};

// ============================================================================
// USER PROFILE & NOTIFICATIONS
// ============================================================================

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  loyaltyPoints: number;
  preferences: string[];
  orderCount: number;
  totalSpent: number;
  createdAt: string;
  lastLogin: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'promo' | 'loyalty' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  image?: string;
}

export function getUserProfile(): UserProfile | null {
  const stored = localStorage.getItem('user_profile');
  return stored ? JSON.parse(stored) : null;
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem('user_profile', JSON.stringify(profile));
}

export function getNotifications(): Notification[] {
  const stored = localStorage.getItem('notifications');
  if (stored) return JSON.parse(stored);
  
  // Generate sample notifications
  const sampleNotifications: Notification[] = [
    {
      id: '1',
      type: 'promo',
      title: 'Welcome Offer!',
      message: 'Get 20% off on your first order. Use code: WELCOME20',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
      link: '/menu?promo=welcome20'
    },
    {
      id: '2',
      type: 'loyalty',
      title: 'Double Points Weekend',
      message: 'Earn double loyalty points on all orders this weekend!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: false,
      link: '/menu'
    },
    {
      id: '3',
      type: 'order',
      title: 'Order Ready',
      message: 'Your order #ORD-2401 is ready for pickup',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
      link: '/orders'
    }
  ];
  
  localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
  return sampleNotifications;
}

export function markNotificationAsRead(id: string): void {
  const notifications = getNotifications();
  const updated = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
  localStorage.setItem('notifications', JSON.stringify(updated));
}

export function clearAllNotifications(): void {
  localStorage.setItem('notifications', JSON.stringify([]));
}

export function addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: `notif-${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false
  };
  notifications.unshift(newNotification);
  localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, 50)));
}