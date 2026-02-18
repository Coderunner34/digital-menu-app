// // // import { useState, useEffect } from 'react';
// // // import { 
// // //   Lock, Unlock, Plus, Edit2, Trash2, Save, X,
// // //   Phone, ExternalLink, AlertTriangle, Settings,
// // //   Menu, BarChart3, ChevronRight, LogOut,
// // //   Eye, EyeOff, Search, Flame, Award, Clock,
// // //   Image, Home
// // // } from 'lucide-react';
// // // import { 
// // //   checkAdminPassword, 
// // //   getSettings, 
// // //   saveSettings, 
// // //   getMenuItems, 
// // //   saveMenuItems,
// // //   addMenuItem,
// // //   updateMenuItem,
// // //   deleteMenuItem 
// // // } from '../../utils/storage';
// // // import { MenuItem, AppSettings } from '../../data/menuData';
// // // import { toast } from 'sonner';
// // // import { Toaster } from '../components/ui/sonner';
// // // import { Link } from 'react-router';

// // // // ============================================================================
// // // // MASTER LOCK SYSTEM
// // // // ============================================================================
// // // const MASTER_PASSWORD = 'bizwaziri2026';
// // // const LOCK_STATE_KEY = 'app_global_lock';
// // // const LOCK_MESSAGE_KEY = 'app_lock_message';
// // // const LOCK_UNTIL_KEY = 'app_lock_until';

// // // interface LockState {
// // //   isLocked: boolean;
// // //   message: string;
// // //   until: string | null;
// // // }

// // // // ============================================================================
// // // // MAIN ADMIN COMPONENT
// // // // ============================================================================
// // // export function Admin() {
// // //   // ==========================================================================
// // //   // AUTH STATE
// // //   // ==========================================================================
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // //   const [password, setPassword] = useState('');
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   // ==========================================================================
// // //   // APP STATE
// // //   // ==========================================================================
// // //   const [settings, setSettings] = useState<AppSettings>(getSettings());
// // //   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
// // //   const [activeTab, setActiveTab] = useState('dashboard');
  
// // //   // ==========================================================================
// // //   // EDIT STATE
// // //   // ==========================================================================
// // //   const [editingSettings, setEditingSettings] = useState(false);
// // //   const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
// // //   const [newItem, setNewItem] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState('');

// // //   // ==========================================================================
// // //   // LOCK STATE
// // //   // ==========================================================================
// // //   const [lockState, setLockState] = useState<LockState>(() => {
// // //     const stored = localStorage.getItem(LOCK_STATE_KEY);
// // //     return stored ? JSON.parse(stored) : {
// // //       isLocked: false,
// // //       message: 'Your subscription has expired. Please renew.',
// // //       until: null
// // //     };
// // //   });
// // //   const [lockMessage, setLockMessage] = useState(lockState.message);
// // //   const [lockDays, setLockDays] = useState(30);
// // //   const [showLockPanel, setShowLockPanel] = useState(false);

// // //   // ==========================================================================
// // //   // EMERGENCY CONTACT
// // //   // ==========================================================================
// // //   const emergency = {
// // //     phone: '0792 211 741',
// // //     website: 'https://bizwaziri-clean.vercel.app/'
// // //   };

// // //   // ==========================================================================
// // //   // LOAD DATA
// // //   // ==========================================================================
// // //   useEffect(() => {
// // //     if (isAuthenticated) {
// // //       setMenuItems(getMenuItems());
// // //     }
// // //   }, [isAuthenticated]);

// // //   // ==========================================================================
// // //   // FILTERED ITEMS
// // //   // ==========================================================================
// // //   const filteredItems = menuItems.filter(item => 
// // //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //     item.description.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   // ==========================================================================
// // //   // AUTH
// // //   // ==========================================================================
// // //   const handleLogin = () => {
// // //     setIsLoading(true);
// // //     setTimeout(() => {
// // //       if (checkAdminPassword(password)) {
// // //         setIsAuthenticated(true);
// // //         toast.success('Welcome back');
// // //       } else {
// // //         toast.error('Incorrect password');
// // //       }
// // //       setIsLoading(false);
// // //     }, 500);
// // //   };

// // //   // ==========================================================================
// // //   // LOCK CONTROL
// // //   // ==========================================================================
// // //   const lockSite = () => {
// // //     const until = new Date();
// // //     until.setDate(until.getDate() + lockDays);
    
// // //     const newState = {
// // //       isLocked: true,
// // //       message: lockMessage,
// // //       until: until.toISOString()
// // //     };
    
// // //     localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
// // //     setLockState(newState);
// // //     window.dispatchEvent(new Event('storage'));
// // //     toast.success('Site locked');
// // //     setShowLockPanel(false);
// // //   };

// // //   const unlockSite = () => {
// // //     const newState = { isLocked: false, message: lockState.message, until: null };
// // //     localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
// // //     setLockState(newState);
// // //     window.dispatchEvent(new Event('storage'));
// // //     toast.success('Site unlocked');
// // //     setShowLockPanel(false);
// // //   };

// // //   // ==========================================================================
// // //   // SETTINGS
// // //   // ==========================================================================
// // //   const handleSaveSettings = () => {
// // //     saveSettings(settings);
// // //     setEditingSettings(false);
// // //     toast.success('Settings saved');
// // //     window.dispatchEvent(new Event('storage'));
// // //   };

// // //   // ==========================================================================
// // //   // MENU ITEMS
// // //   // ==========================================================================
// // //   const handleSaveItem = () => {
// // //     if (!editingItem) return;

// // //     if (editingItem.id.startsWith('new-')) {
// // //       addMenuItem({ ...editingItem, id: `item-${Date.now()}` });
// // //       toast.success('Item added');
// // //     } else {
// // //       updateMenuItem(editingItem.id, editingItem);
// // //       toast.success('Item updated');
// // //     }

// // //     setEditingItem(null);
// // //     setNewItem(false);
// // //     setMenuItems(getMenuItems());
// // //     window.dispatchEvent(new Event('storage'));
// // //   };

// // //   const handleDeleteItem = (id: string) => {
// // //     if (window.confirm('Delete this item?')) {
// // //       deleteMenuItem(id);
// // //       setMenuItems(getMenuItems());
// // //       toast.success('Item deleted');
// // //       window.dispatchEvent(new Event('storage'));
// // //     }
// // //   };

// // //   const startNewItem = () => {
// // //     setEditingItem({
// // //       id: `new-${Date.now()}`,
// // //       name: '',
// // //       description: '',
// // //       price: 0,
// // //       image: '',
// // //       category: 'food',
// // //       labels: [],
// // //       prepTime: '15 min',
// // //       dietary: [],
// // //       nutrition: { calories: 0, protein: 0, carbs: 0, fats: 0 }
// // //     });
// // //     setNewItem(true);
// // //   };

// // //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file && editingItem) {
// // //       const reader = new FileReader();
// // //       reader.onloadend = () => {
// // //         setEditingItem({ ...editingItem, image: reader.result as string });
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const toggleLabel = (label: string) => {
// // //     if (!editingItem) return;
// // //     const labels = editingItem.labels || [];
// // //     setEditingItem({
// // //       ...editingItem,
// // //       labels: labels.includes(label) 
// // //         ? labels.filter(l => l !== label) 
// // //         : [...labels, label]
// // //     });
// // //   };

// // //   // ==========================================================================
// // //   // LOGIN SCREEN
// // //   // ==========================================================================
// // //   if (!isAuthenticated) {
// // //     return (
// // //       <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center p-4">
// // //         <Toaster position="top-center" />
        
// // //         {/* Emergency Bar - Minimal */}
// // //         <div className="fixed top-0 left-0 right-0 bg-[#FF6B35] text-white text-xs py-2 px-4 flex items-center justify-between">
// // //           <span className="font-medium">⚠️ EMERGENCY</span>
// // //           <div className="flex items-center gap-4">
// // //             <a href={`tel:${emergency.phone.replace(/\s/g, '')}`} className="hover:underline">
// // //               {emergency.phone}
// // //             </a>
// // //             <a href={emergency.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
// // //               Bizwaziri
// // //             </a>
// // //           </div>
// // //         </div>

// // //         {/* Login Card - Clean */}
// // //         <div className="w-full max-w-md mt-12">
// // //           <div className="text-center mb-8">
// // //             <div className="w-16 h-16 bg-[#FF6B35] rounded-2xl mx-auto mb-4 flex items-center justify-center">
// // //               <Lock className="w-8 h-8 text-white" />
// // //             </div>
// // //             <h1 className="font-serif text-3xl text-gray-900 dark:text-white">Admin</h1>
// // //             <p className="text-sm text-gray-500 mt-1">Enter master password</p>
// // //           </div>

// // //           <div className="space-y-4">
// // //             <div className="relative">
// // //               <input
// // //                 type={showPassword ? 'text' : 'password'}
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
// // //                 placeholder="Password"
// // //                 className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-sm"
// // //                 autoFocus
// // //               />
// // //               <button
// // //                 onClick={() => setShowPassword(!showPassword)}
// // //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// // //               >
// // //                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // //               </button>
// // //             </div>

// // //             <button
// // //               onClick={handleLogin}
// // //               disabled={isLoading}
// // //               className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
// // //             >
// // //               {isLoading ? 'Please wait...' : 'Unlock'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ==========================================================================
// // //   // ADMIN PANEL
// // //   // ==========================================================================
// // //   return (
// // //     <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
// // //       <Toaster position="top-center" />
      
// // //       {/* ==================================================================== */}
// // //       {/* TOP BAR - Clean, minimal */}
// // //       {/* ==================================================================== */}
// // //       <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-900 sticky top-0 z-40">
// // //         <div className="max-w-7xl mx-auto px-6 py-4">
// // //           <div className="flex items-center justify-between">
// // //             {/* Left - Logo & Title */}
// // //             <div className="flex items-center gap-4">
// // //               <div className="flex items-center gap-3">
// // //                 <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
// // //                   <span className="text-white text-lg">{settings.logo || '🍽️'}</span>
// // //                 </div>
// // //                 <span className="font-serif font-medium text-gray-900 dark:text-white">
// // //                   {settings.name || 'Admin'}
// // //                 </span>
// // //               </div>
              
// // //               {/* Lock Status Dot */}
// // //               <div className={`w-2 h-2 rounded-full ${lockState.isLocked ? 'bg-red-500' : 'bg-green-500'}`} />
// // //             </div>

// // //             {/* Right - Actions */}
// // //             <div className="flex items-center gap-3">
// // //               <Link 
// // //                 to="/" 
// // //                 className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
// // //                 title="Back to site"
// // //               >
// // //                 <Home className="w-5 h-5" />
// // //               </Link>
// // //               <button
// // //                 onClick={() => setIsAuthenticated(false)}
// // //                 className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
// // //                 title="Logout"
// // //               >
// // //                 <LogOut className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ==================================================================== */}
// // //       {/* EMERGENCY BAR - Only shows when site is locked */}
// // //       {/* ==================================================================== */}
// // //       {lockState.isLocked && (
// // //         <div className="bg-red-500 text-white text-sm py-2 px-6 flex items-center justify-between">
// // //           <div className="flex items-center gap-2">
// // //             <AlertTriangle className="w-4 h-4" />
// // //             <span>Site is locked: {lockState.message}</span>
// // //             {lockState.until && (
// // //               <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
// // //                 Until {new Date(lockState.until).toLocaleDateString()}
// // //               </span>
// // //             )}
// // //           </div>
// // //           <button
// // //             onClick={unlockSite}
// // //             className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
// // //           >
// // //             Unlock
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* ==================================================================== */}
// // //       {/* MAIN CONTENT */}
// // //       {/* ==================================================================== */}
// // //       <div className="max-w-7xl mx-auto px-6 py-8">
        
// // //         {/* ================================================================ */}
// // //         {/* TABS - Clean */}
// // //         {/* ================================================================ */}
// // //         <div className="flex items-center gap-1 border-b border-gray-100 dark:border-gray-900 mb-8">
// // //           <button
// // //             onClick={() => setActiveTab('dashboard')}
// // //             className={`px-4 py-2 text-sm font-medium transition-colors relative ${
// // //               activeTab === 'dashboard'
// // //                 ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
// // //                 : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // //             }`}
// // //           >
// // //             Dashboard
// // //           </button>
// // //           <button
// // //             onClick={() => setActiveTab('menu')}
// // //             className={`px-4 py-2 text-sm font-medium transition-colors relative ${
// // //               activeTab === 'menu'
// // //                 ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
// // //                 : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // //             }`}
// // //           >
// // //             Menu
// // //           </button>
// // //           <button
// // //             onClick={() => setActiveTab('settings')}
// // //             className={`px-4 py-2 text-sm font-medium transition-colors relative ${
// // //               activeTab === 'settings'
// // //                 ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
// // //                 : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // //             }`}
// // //           >
// // //             Settings
// // //           </button>
// // //           <button
// // //             onClick={() => setActiveTab('lock')}
// // //             className={`px-4 py-2 text-sm font-medium transition-colors relative ${
// // //               activeTab === 'lock'
// // //                 ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
// // //                 : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
// // //             }`}
// // //           >
// // //             Lock
// // //           </button>
// // //         </div>

// // //         {/* ================================================================ */}
// // //         {/* DASHBOARD TAB */}
// // //         {/* ================================================================ */}
// // //         {activeTab === 'dashboard' && (
// // //           <div className="space-y-6">
// // //             <div>
// // //               <h2 className="font-serif text-2xl text-gray-900 dark:text-white">Dashboard</h2>
// // //               <p className="text-sm text-gray-500 mt-1">{menuItems.length} menu items</p>
// // //             </div>

// // //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // //               <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-5">
// // //                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Items</p>
// // //                 <p className="text-3xl font-serif text-gray-900 dark:text-white">{menuItems.length}</p>
// // //               </div>
// // //               <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-5">
// // //                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Food</p>
// // //                 <p className="text-3xl font-serif text-gray-900 dark:text-white">
// // //                   {menuItems.filter(i => i.category === 'food').length}
// // //                 </p>
// // //               </div>
// // //               <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-5">
// // //                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Drinks</p>
// // //                 <p className="text-3xl font-serif text-gray-900 dark:text-white">
// // //                   {menuItems.filter(i => i.category === 'drinks').length}
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-6">
// // //               <h3 className="font-medium text-gray-900 dark:text-white mb-4">Popular Items</h3>
// // //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //                 {menuItems.filter(item => item.labels?.includes('Popular')).slice(0, 4).map(item => (
// // //                   <div key={item.id} className="relative">
// // //                     <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden">
// // //                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
// // //                     </div>
// // //                     <div className="absolute top-2 left-2">
// // //                       <span className="bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
// // //                         <Flame className="w-3 h-3 text-[#FF6B35]" />
// // //                         Popular
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">{item.name}</p>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* ================================================================ */}
// // //         {/* MENU TAB */}
// // //         {/* ================================================================ */}
// // //         {activeTab === 'menu' && (
// // //           <div className="space-y-6">
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <h2 className="font-serif text-2xl text-gray-900 dark:text-white">Menu Manager</h2>
// // //                 <p className="text-sm text-gray-500 mt-1">{filteredItems.length} items</p>
// // //               </div>
// // //               <button
// // //                 onClick={startNewItem}
// // //                 className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors text-sm font-medium"
// // //               >
// // //                 <Plus className="w-4 h-4" />
// // //                 Add Item
// // //               </button>
// // //             </div>

// // //             {/* Search */}
// // //             <div className="relative">
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search menu..."
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
// // //               />
// // //             </div>

// // //             {/* Menu Grid */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //               {filteredItems.map((item) => (
// // //                 <div key={item.id} className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
// // //                   <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 relative">
// // //                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
// // //                     {item.labels?.includes('Popular') && (
// // //                       <div className="absolute top-2 left-2">
// // //                         <span className="bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
// // //                           <Flame className="w-3 h-3 text-[#FF6B35]" />
// // //                           Popular
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                   <div className="p-4">
// // //                     <div className="flex items-start justify-between mb-2">
// // //                       <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
// // //                       <span className="font-medium text-gray-900 dark:text-white">KES {item.price}</span>
// // //                     </div>
// // //                     <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
// // //                     <div className="flex items-center gap-2">
// // //                       <button
// // //                         onClick={() => setEditingItem(item)}
// // //                         className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg text-xs font-medium transition-colors"
// // //                       >
// // //                         Edit
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleDeleteItem(item.id)}
// // //                         className="px-3 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg text-xs font-medium transition-colors"
// // //                       >
// // //                         <Trash2 className="w-4 h-4" />
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {filteredItems.length === 0 && (
// // //               <div className="text-center py-12">
// // //                 <p className="text-gray-500">No items found</p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* ================================================================ */}
// // //         {/* SETTINGS TAB */}
// // //         {/* ================================================================ */}
// // //         {activeTab === 'settings' && (
// // //           <div className="space-y-6">
// // //             <div className="flex items-center justify-between">
// // //               <h2 className="font-serif text-2xl text-gray-900 dark:text-white">Settings</h2>
// // //               {editingSettings ? (
// // //                 <div className="flex items-center gap-2">
// // //                   <button
// // //                     onClick={handleSaveSettings}
// // //                     className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-medium hover:bg-[#E55A2B] transition-colors"
// // //                   >
// // //                     Save
// // //                   </button>
// // //                   <button
// // //                     onClick={() => {
// // //                       setSettings(getSettings());
// // //                       setEditingSettings(false);
// // //                     }}
// // //                     className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                 </div>
// // //               ) : (
// // //                 <button
// // //                   onClick={() => setEditingSettings(true)}
// // //                   className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
// // //                 >
// // //                   Edit
// // //                 </button>
// // //               )}
// // //             </div>

// // //             <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-6">
// // //               <div className="grid md:grid-cols-2 gap-6">
// // //                 <div>
// // //                   <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Name</label>
// // //                   <input
// // //                     type="text"
// // //                     value={settings.name}
// // //                     onChange={(e) => setSettings({ ...settings, name: e.target.value })}
// // //                     disabled={!editingSettings}
// // //                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 text-sm"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Logo</label>
// // //                   <input
// // //                     type="text"
// // //                     value={settings.logo}
// // //                     onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
// // //                     disabled={!editingSettings}
// // //                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 text-sm"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">WhatsApp</label>
// // //                   <input
// // //                     type="text"
// // //                     value={settings.whatsappNumber}
// // //                     onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
// // //                     disabled={!editingSettings}
// // //                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 text-sm"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Phone</label>
// // //                   <input
// // //                     type="text"
// // //                     value={settings.mpesaNumber}
// // //                     onChange={(e) => setSettings({ ...settings, mpesaNumber: e.target.value })}
// // //                     disabled={!editingSettings}
// // //                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 text-sm"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
// // //                   <input
// // //                     type="text"
// // //                     value={settings.location}
// // //                     onChange={(e) => setSettings({ ...settings, location: e.target.value })}
// // //                     disabled={!editingSettings}
// // //                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 text-sm"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Hours</label>
// // //                   <input
// // //                     type="text"
// // //                     value={settings.operatingHours}
// // //                     onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
// // //                     disabled={!editingSettings}
// // //                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 text-sm"
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* ================================================================ */}
// // //         {/* LOCK TAB - Clean Control */}
// // //         {/* ================================================================ */}
// // //         {activeTab === 'lock' && (
// // //           <div className="space-y-6">
// // //             <div>
// // //               <h2 className="font-serif text-2xl text-gray-900 dark:text-white">Lock Control</h2>
// // //               <p className="text-sm text-gray-500 mt-1">Affects all users immediately</p>
// // //             </div>

// // //             {/* Status Card */}
// // //             <div className={`rounded-xl p-6 border ${
// // //               lockState.isLocked 
// // //                 ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900'
// // //                 : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900'
// // //             }`}>
// // //               <div className="flex items-center gap-4">
// // //                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
// // //                   lockState.isLocked ? 'bg-red-500' : 'bg-green-500'
// // //                 }`}>
// // //                   {lockState.isLocked 
// // //                     ? <Lock className="w-6 h-6 text-white" />
// // //                     : <Unlock className="w-6 h-6 text-white" />
// // //                   }
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-medium text-gray-900 dark:text-white">
// // //                     {lockState.isLocked ? 'Site is locked' : 'Site is active'}
// // //                   </h3>
// // //                   {lockState.isLocked && (
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
// // //                       {lockState.message}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Lock/Unlock Controls */}
// // //             <div className="grid md:grid-cols-2 gap-6">
// // //               {/* Lock Card */}
// // //               <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-6">
// // //                 <Lock className="w-6 h-6 text-red-500 mb-4" />
// // //                 <h3 className="font-medium text-gray-900 dark:text-white mb-1">Lock Site</h3>
// // //                 <p className="text-sm text-gray-500 mb-4">Block all user access</p>
                
// // //                 <div className="space-y-4">
// // //                   <textarea
// // //                     value={lockMessage}
// // //                     onChange={(e) => setLockMessage(e.target.value)}
// // //                     placeholder="Lock message..."
// // //                     rows={2}
// // //                     className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                   />
// // //                   <select
// // //                     value={lockDays}
// // //                     onChange={(e) => setLockDays(Number(e.target.value))}
// // //                     className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                   >
// // //                     <option value="1">1 day</option>
// // //                     <option value="7">7 days</option>
// // //                     <option value="30">30 days</option>
// // //                     <option value="90">90 days</option>
// // //                   </select>
// // //                   <button
// // //                     onClick={lockSite}
// // //                     disabled={lockState.isLocked}
// // //                     className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
// // //                   >
// // //                     Lock Now
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Unlock Card */}
// // //               <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 rounded-xl p-6">
// // //                 <Unlock className="w-6 h-6 text-green-500 mb-4" />
// // //                 <h3 className="font-medium text-gray-900 dark:text-white mb-1">Unlock Site</h3>
// // //                 <p className="text-sm text-gray-500 mb-4">Restore access immediately</p>
                
// // //                 <button
// // //                   onClick={unlockSite}
// // //                   disabled={!lockState.isLocked}
// // //                   className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
// // //                 >
// // //                   Unlock Now
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Emergency Contact - Minimal */}
// // //             <div className="bg-[#FF6B35]/5 border border-[#FF6B35]/20 rounded-xl p-5">
// // //               <div className="flex items-center gap-3">
// // //                 <Phone className="w-5 h-5 text-[#FF6B35]" />
// // //                 <span className="text-sm text-gray-700 dark:text-gray-300">
// // //                   Need help? <a href={`tel:${emergency.phone.replace(/\s/g, '')}`} className="font-medium text-[#FF6B35] hover:underline">{emergency.phone}</a>
// // //                 </span>
// // //                 <span className="text-gray-300 dark:text-gray-700">|</span>
// // //                 <a href={emergency.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#FF6B35] hover:underline flex items-center gap-1">
// // //                   Bizwaziri
// // //                   <ExternalLink className="w-3 h-3" />
// // //                 </a>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* ==================================================================== */}
// // //       {/* EDIT ITEM MODAL - Clean */}
// // //       {/* ==================================================================== */}
// // //       {editingItem && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// // //           <div className="absolute inset-0 bg-black/60" onClick={() => setEditingItem(null)} />
          
// // //           <div className="relative bg-white dark:bg-[#0A0A0A] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
// // //             {/* Header */}
// // //             <div className="bg-[#FF6B35] p-6">
// // //               <div className="flex items-center justify-between">
// // //                 <h3 className="font-serif text-xl text-white">
// // //                   {newItem ? 'Add Item' : 'Edit Item'}
// // //                 </h3>
// // //                 <button onClick={() => setEditingItem(null)} className="text-white/80 hover:text-white">
// // //                   <X className="w-5 h-5" />
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Content */}
// // //             <div className="p-6 max-h-[70vh] overflow-y-auto">
// // //               <div className="space-y-5">
// // //                 <div className="grid md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="text-xs text-gray-500 mb-1 block">Name *</label>
// // //                     <input
// // //                       type="text"
// // //                       value={editingItem.name}
// // //                       onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
// // //                       className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                       placeholder="Item name"
// // //                     />
// // //                   </div>
// // //                   <div>
// // //                     <label className="text-xs text-gray-500 mb-1 block">Price *</label>
// // //                     <input
// // //                       type="number"
// // //                       value={editingItem.price}
// // //                       onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
// // //                       className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                       placeholder="0"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="text-xs text-gray-500 mb-1 block">Description</label>
// // //                   <textarea
// // //                     value={editingItem.description}
// // //                     onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
// // //                     rows={3}
// // //                     className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                     placeholder="Describe your dish..."
// // //                   />
// // //                 </div>

// // //                 <div className="grid md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="text-xs text-gray-500 mb-1 block">Category</label>
// // //                     <select
// // //                       value={editingItem.category}
// // //                       onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
// // //                       className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                     >
// // //                       <option value="food">Food</option>
// // //                       <option value="drinks">Drinks</option>
// // //                     </select>
// // //                   </div>
// // //                   <div>
// // //                     <label className="text-xs text-gray-500 mb-1 block">Prep Time</label>
// // //                     <input
// // //                       type="text"
// // //                       value={editingItem.prepTime}
// // //                       onChange={(e) => setEditingItem({ ...editingItem, prepTime: e.target.value })}
// // //                       className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm"
// // //                       placeholder="15 min"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="text-xs text-gray-500 mb-1 block">Image</label>
// // //                   <div className="flex items-center gap-3">
// // //                     <label className="flex-1 cursor-pointer">
// // //                       <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
// // //                         <Image className="w-4 h-4 text-gray-500" />
// // //                         <span className="text-sm text-gray-600 dark:text-gray-400">
// // //                           {editingItem.image ? 'Change' : 'Upload'}
// // //                         </span>
// // //                       </div>
// // //                       <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
// // //                     </label>
// // //                     {editingItem.image && (
// // //                       <img src={editingItem.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="text-xs text-gray-500 mb-2 block">Labels</label>
// // //                   <div className="flex gap-2">
// // //                     {['Popular', 'Chef Special'].map((label) => (
// // //                       <button
// // //                         key={label}
// // //                         onClick={() => toggleLabel(label)}
// // //                         className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
// // //                           editingItem.labels?.includes(label)
// // //                             ? 'bg-[#FF6B35] text-white'
// // //                             : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
// // //                         }`}
// // //                       >
// // //                         {label === 'Popular' && <Flame className="w-3 h-3 inline mr-1" />}
// // //                         {label}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 </div>

// // //                 <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
// // //                   <button
// // //                     onClick={handleSaveItem}
// // //                     disabled={!editingItem.name || !editingItem.price}
// // //                     className="flex-1 px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
// // //                   >
// // //                     {newItem ? 'Add Item' : 'Save Changes'}
// // //                   </button>
// // //                   <button
// // //                     onClick={() => setEditingItem(null)}
// // //                     className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }





// // import { useState, useEffect, useRef } from 'react';
// // import { 
// //   Lock, Unlock, Plus, Edit2, Trash2, Save, X,
// //   Phone, ExternalLink, AlertTriangle, Settings,
// //   Menu, BarChart3, ChevronRight, LogOut,
// //   Eye, EyeOff, Search, Flame, Award, Clock,
// //   Image, Home, Upload, Copy, Check,
// //   Globe, Shield, Calendar, Users,
// //   ShoppingBag, DollarSign, TrendingUp,
// //   Camera, RefreshCw, Wifi, WifiOff,
// //   Key, Fingerprint, Bell, Download, // Make sure Key is here!
// //   Printer, Share2, Heart, Star,
// //   Coffee, Utensils, Truck, MapPin,
// //   MessageCircle, Mail, CreditCard,
// //   Wallet, Gift, Zap, Cpu, Database,
// //   HardDrive, Monitor, Smartphone,
// //   Grid, List, Filter, MoreVertical,
// //   Package, Percent, Award as AwardIcon,
// //   Moon, Sun, Info, HelpCircle,
// //   FileText, Clipboard, BookOpen,
// //   Layers, Code, Terminal, Cpu as CpuIcon
// // } from 'lucide-react';
// // import { 
// //   checkAdminPassword, 
// //   getSettings, 
// //   saveSettings, 
// //   getMenuItems, 
// //   saveMenuItems,
// //   addMenuItem,
// //   updateMenuItem,
// //   deleteMenuItem,
// //   getGalleryImages,
// //   addGalleryImage,
// //   deleteGalleryImage,
// //   getCart,
// //   getCartTotal,
// //   getCartCount,
// //   clearCart
// // } from '../../utils/storage';
// // import { MenuItem, AppSettings } from '../../data/menuData';
// // import { toast } from 'sonner';
// // import { Toaster } from '../components/ui/sonner';
// // import { Link, useNavigate } from 'react-router';
// // import { Grid } from 'lucide-react';
// // import { Category } from '../../data/menuData';
// // import { getCategories, saveCategories, addCategory, updateCategory, deleteCategory } from '../../utils/storage';


// // // ============================================================================
// // // MASTER LOCK SYSTEM
// // // ============================================================================
// // const MASTER_PASSWORD = 'bizwaziri2026';
// // const LOCK_STATE_KEY = 'app_global_lock_v2';

// // interface LockState {
// //   isLocked: boolean;
// //   message: string;
// //   until: string | null;
// //   lockedBy: string | null;
// //   lockedAt: string | null;
// //   reason: 'payment' | 'maintenance' | 'custom' | null;
// // }

// // interface LockHistoryEntry {
// //   action: 'lock' | 'unlock';
// //   message?: string;
// //   until?: string | null;
// //   lockedBy?: string | null;
// //   unlockedBy?: string | null;
// //   timestamp: string;
// //   reason?: string;
// // }

// // // ============================================================================
// // // ADMIN COMPONENT
// // // ============================================================================
// // export function Admin() {
// //   const navigate = useNavigate();
  
// //   // ==========================================================================
// //   // AUTH STATE
// //   // ==========================================================================
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loginLoading, setLoginLoading] = useState(false);
// //   const [rememberMe, setRememberMe] = useState(false);

// //   // ==========================================================================
// //   // APP STATE
// //   // ==========================================================================
// //   const [settings, setSettings] = useState<AppSettings>(getSettings());
// //   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
// //   const [galleryImages, setGalleryImages] = useState<string[]>([]);
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// //   const [isDarkMode, setIsDarkMode] = useState(() => {
// //     return localStorage.getItem('theme') === 'dark';
// //   });

// //   // ==========================================================================
// //   // EDIT STATE
// //   // ==========================================================================
// //   const [editingSettings, setEditingSettings] = useState(false);
// //   const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
// //   const [newItem, setNewItem] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('all');
// //   const [bulkEditMode, setBulkEditMode] = useState(false);
// //   const [selectedItems, setSelectedItems] = useState<string[]>([]);
// // const [categories, setCategories] = useState<Category[]>([]);
// // const [editingCategory, setEditingCategory] = useState<Category | null>(null);
// // const [showCategoryModal, setShowCategoryModal] = useState(false);
// //   // ==========================================================================
// //   // LOCK STATE - GLOBAL CONTROL
// //   // ==========================================================================
// //   const [lockState, setLockState] = useState<LockState>(() => {
// //     const stored = localStorage.getItem(LOCK_STATE_KEY);
// //     if (stored) {
// //       const parsed = JSON.parse(stored);
// //       if (parsed.until && new Date(parsed.until) < new Date()) {
// //         return {
// //           isLocked: false,
// //           message: '',
// //           until: null,
// //           lockedBy: null,
// //           lockedAt: null,
// //           reason: null
// //         };
// //       }
// //       return parsed;
// //     }
// //     return {
// //       isLocked: false,
// //       message: '',
// //       until: null,
// //       lockedBy: null,
// //       lockedAt: null,
// //       reason: null
// //     };
// //   });
  
// //   const [lockMessage, setLockMessage] = useState(lockState.message || 'Payment required. Please contact support.');
// //   const [lockDays, setLockDays] = useState(30);
// //   const [lockHours, setLockHours] = useState(0);
// //   const [lockReason, setLockReason] = useState<'payment' | 'maintenance' | 'custom'>(
// //     lockState.reason || 'payment'
// //   );
// //   const [lockPermanent, setLockPermanent] = useState(false);
// //   const [showLockHistory, setShowLockHistory] = useState(false);
// //   const [lockHistory, setLockHistory] = useState<LockHistoryEntry[]>([]);

// //   // ==========================================================================
// //   // DASHBOARD STATS
// //   // ==========================================================================
// //   const [stats, setStats] = useState({
// //     totalOrders: 1247,
// //     pendingOrders: 23,
// //     totalRevenue: 384500,
// //     todayRevenue: 45750,
// //     totalCustomers: 856,
// //     popularItems: [] as MenuItem[],
// //     recentOrders: [] as any[]
// //   });

// //   // ==========================================================================
// //   // REFS
// //   // ==========================================================================
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const logoInputRef = useRef<HTMLInputElement>(null);

// //   // ==========================================================================
// //   // EMERGENCY CONTACT
// //   // ==========================================================================
// //   const emergency = {
// //     phone: '+254775269628',
// //     website: 'https://bizwaziri-clean.vercel.app/',
// //     email: 'support@bizwaziri.com'
// //   };

// //   // ==========================================================================
// //   // EFFECTS
// //   // ==========================================================================
// //   useEffect(() => {
// //     document.documentElement.classList.toggle('dark', isDarkMode);
// //     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
// //   }, [isDarkMode]);

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       loadData();
// //       loadLockHistory();
// //       calculateStats();
// //     }
// //   }, [isAuthenticated]);

// //   useEffect(() => {
// //     const savedAuth = localStorage.getItem('admin_auth');
// //     const savedUser = localStorage.getItem('admin_user');
// //     if (savedAuth === 'true' && savedUser) {
// //       setIsAuthenticated(true);
// //     }
// //   }, []);

// //   // ==========================================================================
// //   // DATA FUNCTIONS
// //   // ==========================================================================
// //   const loadData = () => {
// //     setMenuItems(getMenuItems());
// //     setSettings(getSettings());
// //     setGalleryImages(getGalleryImages());
// //     setCategories(getCategories());
// //   };

// //   const loadLockHistory = () => {
// //     const history = localStorage.getItem('lock_history');
// //     setLockHistory(history ? JSON.parse(history) : []);
// //   };

// //   const addLockHistory = (entry: LockHistoryEntry) => {
// //     const history = [...lockHistory, entry];
// //     localStorage.setItem('lock_history', JSON.stringify(history.slice(-50)));
// //     setLockHistory(history);
// //   };

// //   const calculateStats = () => {
// //     const popular = menuItems
// //       .filter(item => item.labels?.includes('Popular'))
// //       .slice(0, 5);
// //     setStats(prev => ({ ...prev, popularItems: popular }));
// //   };

// //   // ==========================================================================
// //   // FILTERED ITEMS
// //   // ==========================================================================
// //   const filteredMenuItems = menuItems.filter(item => {
// //     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
// //     return matchesSearch && matchesCategory;
// //   });

// //   // ==========================================================================
// //   // AUTH FUNCTIONS
// //   // ==========================================================================
// //   const handleLogin = () => {
// //     setLoginLoading(true);
// //     setTimeout(() => {
// //       if (checkAdminPassword(password) || password === MASTER_PASSWORD) {
// //         setIsAuthenticated(true);
// //         if (rememberMe) {
// //           localStorage.setItem('admin_auth', 'true');
// //           localStorage.setItem('admin_user', 'Admin');
// //         }
// //         toast.success('Welcome back, Admin');
// //       } else {
// //         toast.error('Incorrect password');
// //       }
// //       setLoginLoading(false);
// //     }, 500);
// //   };

// //   const handleLogout = () => {
// //     setIsAuthenticated(false);
// //     localStorage.removeItem('admin_auth');
// //     localStorage.removeItem('admin_user');
// //     toast.success('Logged out');
// //     navigate('/');
// //   };

// //   // ==========================================================================
// //   // GLOBAL LOCK CONTROL
// //   // ==========================================================================
// //   const lockSite = () => {
// //     const until = lockPermanent ? null : new Date();
// //     if (!lockPermanent && until) {
// //       until.setDate(until.getDate() + lockDays);
// //       until.setHours(until.getHours() + lockHours);
// //     }
    
// //     const newState: LockState = {
// //       isLocked: true,
// //       message: lockMessage,
// //       until: until?.toISOString() || null,
// //       lockedBy: localStorage.getItem('admin_user') || 'Admin',
// //       lockedAt: new Date().toISOString(),
// //       reason: lockReason
// //     };
    
// //     localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
// //     setLockState(newState);
    
// //     addLockHistory({
// //       action: 'lock',
// //       message: lockMessage,
// //       until: until?.toISOString(),
// //       lockedBy: localStorage.getItem('admin_user') || 'Admin',
// //       timestamp: new Date().toISOString(),
// //       reason: lockReason
// //     });
    
// //     window.dispatchEvent(new StorageEvent('storage', {
// //       key: LOCK_STATE_KEY,
// //       newValue: JSON.stringify(newState)
// //     }));
    
// //     toast.success('🔒 SITE LOCKED GLOBALLY', {
// //       description: `Message: ${lockMessage} • All users locked out`,
// //       duration: 5000
// //     });
    
// //     loadLockHistory();
// //   };

// //   const unlockSite = () => {
// //     const newState: LockState = {
// //       isLocked: false,
// //       message: '',
// //       until: null,
// //       lockedBy: null,
// //       lockedAt: null,
// //       reason: null
// //     };
    
// //     localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
// //     setLockState(newState);
    
// //     addLockHistory({
// //       action: 'unlock',
// //       unlockedBy: localStorage.getItem('admin_user') || 'Admin',
// //       timestamp: new Date().toISOString()
// //     });
    
// //     window.dispatchEvent(new StorageEvent('storage', {
// //       key: LOCK_STATE_KEY,
// //       newValue: JSON.stringify(newState)
// //     }));
    
// //     toast.success('🔓 Site unlocked');
// //     loadLockHistory();
// //   };

// //   // ==========================================================================
// //   // SETTINGS FUNCTIONS
// //   // ==========================================================================
// //   const handleSaveSettings = () => {
// //     saveSettings(settings);
// //     setEditingSettings(false);
// //     toast.success('Settings saved');
// //     window.dispatchEvent(new Event('storage'));
// //   };

// //   // ==========================================================================
// //   // LOGO UPLOAD
// //   // ==========================================================================
// //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     if (!file.type.startsWith('image/')) {
// //       toast.error('Please upload an image file');
// //       return;
// //     }

// //     if (file.size > 2 * 1024 * 1024) {
// //       toast.error('Image must be less than 2MB');
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       const base64String = reader.result as string;
// //       setSettings({ ...settings, logo: base64String });
// //       saveSettings({ ...settings, logo: base64String });
// //       toast.success('Logo updated successfully');
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   // ==========================================================================
// //   // MENU ITEM FUNCTIONS
// //   // ==========================================================================
// //   const handleSaveItem = () => {
// //     if (!editingItem) return;

// //     if (editingItem.id.startsWith('new-')) {
// //       const newId = `item-${Date.now()}`;
// //       addMenuItem({ ...editingItem, id: newId });
// //       toast.success('Item added to menu');
// //     } else {
// //       updateMenuItem(editingItem.id, editingItem);
// //       toast.success('Item updated');
// //     }

// //     setEditingItem(null);
// //     setNewItem(false);
// //     loadData();
// //     calculateStats();
// //     window.dispatchEvent(new Event('storage'));
// //   };

// //   const handleDeleteItem = (id: string) => {
// //     if (window.confirm('Delete this item?')) {
// //       deleteMenuItem(id);
// //       loadData();
// //       toast.success('Item deleted');
// //       calculateStats();
// //       window.dispatchEvent(new Event('storage'));
// //     }
// //   };

// //   const startNewItem = () => {
// //     setEditingItem({
// //       id: `new-${Date.now()}`,
// //       name: '',
// //       description: '',
// //       price: 0,
// //       image: '',
// //       category: 'food',
// //       labels: [],
// //       prepTime: '15 min',
// //       dietary: [],
// //       nutrition: { calories: 0, protein: 0, carbs: 0, fats: 0 }
// //     });
// //     setNewItem(true);
// //   };

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file && editingItem) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setEditingItem({ ...editingItem, image: reader.result as string });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const toggleLabel = (label: string) => {
// //     if (!editingItem) return;
// //     const labels = editingItem.labels || [];
// //     setEditingItem({
// //       ...editingItem,
// //       labels: labels.includes(label) 
// //         ? labels.filter(l => l !== label) 
// //         : [...labels, label]
// //     });
// //   };

// //   const toggleSelectItem = (id: string) => {
// //     setSelectedItems(prev =>
// //       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
// //     );
// //   };

// //   const bulkDelete = () => {
// //     if (selectedItems.length === 0) return;
    
// //     if (window.confirm(`Delete ${selectedItems.length} items?`)) {
// //       selectedItems.forEach(id => deleteMenuItem(id));
// //       setSelectedItems([]);
// //       setBulkEditMode(false);
// //       loadData();
// //       toast.success(`${selectedItems.length} items deleted`);
// //       calculateStats();
// //     }
// //   };

// //   // ==========================================================================
// //   // DATA EXPORT/IMPORT
// //   // ==========================================================================
// //   const handleExportData = () => {
// //     const data = {
// //       settings: getSettings(),
// //       menuItems: getMenuItems(),
// //       gallery: getGalleryImages(),
// //       timestamp: new Date().toISOString()
// //     };
// //     const dataStr = JSON.stringify(data, null, 2);
// //     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
// //     const exportFileDefaultName = `bizwaziri-backup-${new Date().toISOString().slice(0,10)}.json`;
// //     const linkElement = document.createElement('a');
// //     linkElement.setAttribute('href', dataUri);
// //     linkElement.setAttribute('download', exportFileDefaultName);
// //     linkElement.click();
// //     toast.success('Data exported successfully');
// //   };

// //   const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       try {
// //         const data = JSON.parse(e.target?.result as string);
// //         if (data.settings) saveSettings(data.settings);
// //         if (data.menuItems) saveMenuItems(data.menuItems);
// //         if (data.gallery) {
// //           data.gallery.forEach((img: string) => addGalleryImage(img));
// //         }
// //         loadData();
// //         toast.success('Data imported successfully');
// //       } catch {
// //         toast.error('Failed to import data');
// //       }
// //     };
// //     reader.readAsText(file);
// //   };

// //   const handleResetAll = () => {
// //     if (window.confirm('⚠️ This will delete ALL data. Are you sure?')) {
// //       localStorage.clear();
// //       window.location.reload();
// //     }
// //   };

// //   // ==========================================================================
// //   // LOGIN SCREEN
// //   // ==========================================================================
// //   if (!isAuthenticated) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
// //         <Toaster position="top-center" richColors />
        
// //         {/* Emergency Bar */}
// //         <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white z-50 py-2 px-4 flex items-center justify-between text-sm">
// //           <div className="flex items-center gap-2">
// //             <AlertTriangle className="w-4 h-4 animate-pulse" />
// //             <span className="font-medium">EMERGENCY SUPPORT</span>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <a href={`tel:${emergency.phone}`} className="hover:underline flex items-center gap-1">
// //               <Phone className="w-3 h-3" />
// //               {emergency.phone}
// //             </a>
// //             <span className="text-red-300 hidden sm:inline">|</span>
// //             <a href={emergency.website} target="_blank" rel="noopener noreferrer" className="hover:underline hidden sm:flex items-center gap-1">
// //               Bizwaziri
// //               <ExternalLink className="w-3 h-3" />
// //             </a>
// //           </div>
// //         </div>

// //         {/* Login Card */}
// //         <div className="w-full max-w-md mt-12">
// //           <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
// //             <div className="h-32 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] relative">
// //               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
// //                 <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-700">
// //                   <Shield className="w-12 h-12 text-[#FF6B35]" />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="pt-16 p-8">
// //               <div className="text-center mb-8">
// //                 <h1 className="font-serif text-3xl text-gray-900 dark:text-white mb-2">
// //                   Admin Access
// //                 </h1>
// //                 <p className="text-sm text-gray-500 dark:text-gray-400">
// //                   Enter master password to continue
// //                 </p>
// //               </div>

// //               <div className="space-y-4">
// //                 <div className="relative">
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
// //                     placeholder="Password"
// //                     className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 text-sm"
// //                     autoFocus
// //                   />
// //                   <button
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                   >
// //                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                   </button>
// //                 </div>

// //                 <div className="flex items-center justify-between">
// //                   <label className="flex items-center gap-2 cursor-pointer">
// //                     <input
// //                       type="checkbox"
// //                       checked={rememberMe}
// //                       onChange={(e) => setRememberMe(e.target.checked)}
// //                       className="w-4 h-4 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]"
// //                     />
// //                     <span className="text-xs text-gray-600 dark:text-gray-300">Remember me</span>
// //                   </label>
// //                 </div>

// //                 <button
// //                   onClick={handleLogin}
// //                   disabled={loginLoading}
// //                   className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] hover:from-[#E55A2B] hover:to-[#E55A2B] text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
// //                 >
// //                   {loginLoading ? (
// //                     <>
// //                       <RefreshCw className="w-4 h-4 animate-spin" />
// //                       Authenticating...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Key className="w-4 h-4" />
// //                       Unlock Admin Panel
// //                     </>
// //                   )}
// //                 </button>

// //                 <div className="text-center">
// //                   <a
// //                     href={`?override=${MASTER_PASSWORD}`}
// //                     className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
// //                   >
// //                     Emergency override
// //                   </a>
// //                 </div>
// //               </div>

// //               <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-xs text-gray-400">Powered by</span>
// //                   <a 
// //                     href={emergency.website}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-xs font-medium text-[#FF6B35] hover:text-[#E55A2B] flex items-center gap-1"
// //                   >
// //                     Bizwaziri Technologies
// //                     <ExternalLink className="w-3 h-3" />
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ==========================================================================
// //   // ADMIN PANEL
// //   // ==========================================================================
// //   return (
// //     <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
// //       <Toaster position="top-center" richColors />
      
// //       {/* Global Lock Banner */}
// //       {lockState.isLocked && (
// //         <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 md:px-6 flex flex-wrap items-center justify-between gap-2">
// //           <div className="flex items-center gap-2">
// //             <Lock className="w-4 h-4" />
// //             <span className="text-sm font-medium">SITE LOCKED:</span>
// //             <span className="text-sm">{lockState.message}</span>
// //             {lockState.until && (
// //               <span className="text-xs bg-white/20 px-2 py-1 rounded">
// //                 Until {new Date(lockState.until).toLocaleString()}
// //               </span>
// //             )}
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={unlockSite}
// //               className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-colors"
// //             >
// //               Unlock Now
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('lock')}
// //               className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors"
// //             >
// //               Manage
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Top Bar */}
// //       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
// //         <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
// //           <div className="flex items-center justify-between">
// //             {/* Left */}
// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
// //                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
// //               >
// //                 <Menu className="w-5 h-5" />
// //               </button>

// //               <div className="flex items-center gap-3">
// //                 {/* Logo with Upload */}
// //                 <div className="relative group">
// //                   <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-lg flex items-center justify-center overflow-hidden">
// //                     {settings.logo?.startsWith('data:') ? (
// //                       <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
// //                     ) : (
// //                       <span className="text-white text-lg font-bold">{settings.logo || 'B'}</span>
// //                     )}
// //                   </div>
// //                   <button
// //                     onClick={() => logoInputRef.current?.click()}
// //                     className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
// //                     title="Upload logo"
// //                   >
// //                     <Camera className="w-3 h-3 text-gray-600 dark:text-gray-300" />
// //                   </button>
// //                   <input
// //                     ref={logoInputRef}
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={handleLogoUpload}
// //                     className="hidden"
// //                   />
// //                 </div>
                
// //                 <div>
// //                   <h1 className="font-medium text-gray-900 dark:text-white">
// //                     {settings.name || 'Admin Panel'}
// //                   </h1>
// //                   <div className="flex items-center gap-2">
// //                     <div className={`w-2 h-2 rounded-full ${lockState.isLocked ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
// //                     <span className="text-xs text-gray-500 dark:text-gray-400">
// //                       {lockState.isLocked ? 'Locked' : 'Active'}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right */}
// //             <div className="flex items-center gap-2">
// //               <button
// //                 onClick={() => setIsDarkMode(!isDarkMode)}
// //                 className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
// //                 title={isDarkMode ? 'Light mode' : 'Dark mode'}
// //               >
// //                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
// //               </button>
// //               <Link
// //                 to="/"
// //                 className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
// //                 title="View Site"
// //               >
// //                 <Home className="w-5 h-5" />
// //               </Link>
// //               <button
// //                 onClick={handleLogout}
// //                 className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
// //                 title="Logout"
// //               >
// //                 <LogOut className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex">
// //         {/* Sidebar */}
// //         <aside className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 ${
// //           sidebarCollapsed ? 'w-0 lg:w-20' : 'w-64'
// //         } overflow-hidden`}>
// //           <nav className="p-4 space-y-1">
// //             <button
// //               onClick={() => setActiveTab('dashboard')}
// //               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
// //                 activeTab === 'dashboard'
// //                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
// //                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
// //               }`}
// //             >
// //               <BarChart3 className="w-5 h-5" />
// //               {!sidebarCollapsed && <span className="text-sm">Dashboard</span>}
// //             </button>

// //             <button
// //               onClick={() => setActiveTab('menu')}
// //               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
// //                 activeTab === 'menu'
// //                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
// //                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
// //               }`}
// //             >
// //               <Menu className="w-5 h-5" />
// //               {!sidebarCollapsed && <span className="text-sm">Menu</span>}
// //             </button>

// //             <button
// //   onClick={() => setActiveTab('categories')}
// //   className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
// //     activeTab === 'categories'
// //       ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
// //       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
// //   }`}
// // >
// //   <Grid className="w-5 h-5" />
// //   {!sidebarCollapsed && <span className="text-sm">Categories</span>}
// // </button>

// //             <button
// //               onClick={() => setActiveTab('gallery')}
// //               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
// //                 activeTab === 'gallery'
// //                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
// //                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
// //               }`}
// //             >
// //               <Image className="w-5 h-5" />
// //               {!sidebarCollapsed && <span className="text-sm">Gallery</span>}
// //             </button>

// //             <button
// //               onClick={() => setActiveTab('settings')}
// //               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
// //                 activeTab === 'settings'
// //                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
// //                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
// //               }`}
// //             >
// //               <Settings className="w-5 h-5" />
// //               {!sidebarCollapsed && <span className="text-sm">Settings</span>}
// //             </button>

// //             <button
// //               onClick={() => setActiveTab('lock')}
// //               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
// //                 activeTab === 'lock'
// //                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
// //                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
// //               }`}
// //             >
// //               <Shield className="w-5 h-5" />
// //               {!sidebarCollapsed && (
// //                 <div className="flex-1 flex items-center justify-between">
// //                   <span className="text-sm">Lock</span>
// //                   {lockState.isLocked && (
// //                     <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
// //                   )}
// //                 </div>
// //               )}
// //             </button>
// //           </nav>
// //         </aside>

// //         {/* Main Content Area */}
// //         <main className={`flex-1 transition-all duration-300 p-4 md:p-6 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
// //           <div className="max-w-7xl mx-auto">
            
// //             {/* ============================================================ */}
// //             {/* DASHBOARD TAB */}
// //             {/* ============================================================ */}
// //             {activeTab === 'dashboard' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center justify-between">
// //                   <h1 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">
// //                     Dashboard
// //                   </h1>
// //                   <button
// //                     onClick={calculateStats}
// //                     className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// //                     title="Refresh"
// //                   >
// //                     <RefreshCw className="w-4 h-4" />
// //                   </button>
// //                 </div>

// //                 {/* Stats Grid */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
// //                     <ShoppingBag className="w-5 h-5 text-blue-600 mb-2" />
// //                     <p className="text-2xl font-serif">{stats.totalOrders}</p>
// //                     <p className="text-xs text-gray-500">Total Orders</p>
// //                   </div>
// //                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
// //                     <Clock className="w-5 h-5 text-yellow-600 mb-2" />
// //                     <p className="text-2xl font-serif">{stats.pendingOrders}</p>
// //                     <p className="text-xs text-gray-500">Pending Orders</p>
// //                   </div>
// //                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
// //                     <DollarSign className="w-5 h-5 text-green-600 mb-2" />
// //                     <p className="text-2xl font-serif">KES {stats.todayRevenue.toLocaleString()}</p>
// //                     <p className="text-xs text-gray-500">Today's Revenue</p>
// //                   </div>
// //                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
// //                     <Users className="w-5 h-5 text-purple-600 mb-2" />
// //                     <p className="text-2xl font-serif">{stats.totalCustomers}</p>
// //                     <p className="text-xs text-gray-500">Total Customers</p>
// //                   </div>
// //                 </div>

// //                 {/* Popular Items */}
// //                 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
// //                   <h2 className="font-medium mb-4 flex items-center gap-2">
// //                     <Flame className="w-5 h-5 text-[#FF6B35]" />
// //                     Popular Items
// //                   </h2>
// //                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
// //                     {stats.popularItems.map(item => (
// //                       <div key={item.id} className="text-center">
// //                         <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
// //                         <p className="text-sm font-medium truncate">{item.name}</p>
// //                         <p className="text-xs text-gray-500">KES {item.price}</p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Lock Status */}
// //                 <div className={`p-6 rounded-xl border ${
// //                   lockState.isLocked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
// //                 }`}>
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-4">
// //                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
// //                         lockState.isLocked ? 'bg-red-500' : 'bg-green-500'
// //                       }`}>
// //                         {lockState.isLocked ? <Lock className="w-6 h-6 text-white" /> : <Unlock className="w-6 h-6 text-white" />}
// //                       </div>
// //                       <div>
// //                         <h3 className="font-medium">{lockState.isLocked ? 'Site is Locked' : 'Site is Active'}</h3>
// //                         {lockState.isLocked && <p className="text-sm text-gray-600">{lockState.message}</p>}
// //                       </div>
// //                     </div>
// //                     <button onClick={() => setActiveTab('lock')} className="px-4 py-2 bg-white rounded-lg text-sm">
// //                       Manage
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* ============================================================ */}
// //             {/* MENU TAB */}
// //             {/* ============================================================ */}
// //             {activeTab === 'menu' && (
// //               <div className="space-y-6">
// //                 <div className="flex justify-between">
// //                   <div>
// //                     <h1 className="font-serif text-2xl md:text-3xl">Menu Manager</h1>
// //                     <p className="text-sm text-gray-500 mt-1">{filteredMenuItems.length} items</p>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     {bulkEditMode ? (
// //                       <>
// //                         <button onClick={bulkDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">
// //                           Delete {selectedItems.length}
// //                         </button>
// //                         <button onClick={() => setBulkEditMode(false)} className="px-4 py-2 border rounded-lg">
// //                           Cancel
// //                         </button>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <button onClick={() => setBulkEditMode(true)} className="px-4 py-2 border rounded-lg">
// //                           Bulk Edit
// //                         </button>
// //                         <button onClick={startNewItem} className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg">
// //                           <Plus className="w-4 h-4" /> Add Item
// //                         </button>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-4">
// //                   <div className="relative flex-1">
// //                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// //                     <input
// //                       type="text"
// //                       value={searchQuery}
// //                       onChange={(e) => setSearchQuery(e.target.value)}
// //                       placeholder="Search menu..."
// //                       className="w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg text-sm"
// //                     />
// //                   </div>
// //                   <select
// //                     value={selectedCategory}
// //                     onChange={(e) => setSelectedCategory(e.target.value)}
// //                     className="px-4 py-2.5 bg-white border rounded-lg text-sm"
// //                   >
// //                     <option value="all">All</option>
// //                     <option value="food">Food</option>
// //                     <option value="drinks">Drinks</option>
// //                   </select>
// //                   <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
// //                     <button
// //                       onClick={() => setViewMode('grid')}
// //                       className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
// //                     >
// //                       <Grid className="w-4 h-4" />
// //                     </button>
// //                     <button
// //                       onClick={() => setViewMode('list')}
// //                       className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
// //                     >
// //                       <List className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                   {filteredMenuItems.map(item => (
// //                     <div key={item.id} className="bg-white border rounded-xl overflow-hidden">
// //                       {bulkEditMode && (
// //                         <div className="absolute m-2">
// //                           <input
// //                             type="checkbox"
// //                             checked={selectedItems.includes(item.id)}
// //                             onChange={() => toggleSelectItem(item.id)}
// //                           />
// //                         </div>
// //                       )}
// //                       <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
// //                       <div className="p-4">
// //                         <div className="flex justify-between mb-2">
// //                           <h3 className="font-medium">{item.name}</h3>
// //                           <span className="font-medium text-[#FF6B35]">KES {item.price}</span>
// //                         </div>
// //                         <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
// //                         <div className="flex gap-2">
// //                           <button onClick={() => setEditingItem(item)} className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">
// //                             Edit
// //                           </button>
// //                           <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg">
// //                             <Trash2 className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* ============================================================ */}
// //             {/* GALLERY TAB */}
// //             {/* ============================================================ */}
// //             {activeTab === 'gallery' && (
// //               <div className="space-y-6">
// //                 <h1 className="font-serif text-2xl md:text-3xl">Gallery Manager</h1>
// //                 <p className="text-sm text-gray-500">{galleryImages.length} images</p>
                
// //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                   {galleryImages.map((img, idx) => (
// //                     <div key={idx} className="relative group">
// //                       <img src={img} alt={`Gallery ${idx}`} className="w-full aspect-square object-cover rounded-lg" />
// //                       <button
// //                         onClick={() => {
// //                           deleteGalleryImage(img);
// //                           loadData();
// //                         }}
// //                         className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// //                       >
// //                         <Trash2 className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* ============================================================ */}
// //             {/* SETTINGS TAB */}
// //             {/* ============================================================ */}
// //             {activeTab === 'settings' && (
// //               <div className="space-y-6">
// //                 <div className="flex justify-between">
// //                   <h1 className="font-serif text-2xl md:text-3xl">Settings</h1>
// //                   {editingSettings ? (
// //                     <div className="flex gap-2">
// //                       <button onClick={handleSaveSettings} className="px-4 py-2 bg-green-600 text-white rounded-lg">
// //                         Save
// //                       </button>
// //                       <button onClick={() => { setSettings(getSettings()); setEditingSettings(false); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
// //                         Cancel
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <button onClick={() => setEditingSettings(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">
// //                       Edit
// //                     </button>
// //                   )}
// //                 </div>

// //                 <div className="bg-white p-6 rounded-xl border">
// //                   <div className="grid md:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="text-xs text-gray-500 block mb-1">Business Name</label>
// //                       <input
// //                         type="text"
// //                         value={settings.name}
// //                         onChange={(e) => setSettings({...settings, name: e.target.value})}
// //                         disabled={!editingSettings}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="text-xs text-gray-500 block mb-1">Slogan</label>
// //                       <input
// //                         type="text"
// //                         value={settings.slogan}
// //                         onChange={(e) => setSettings({...settings, slogan: e.target.value})}
// //                         disabled={!editingSettings}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="text-xs text-gray-500 block mb-1">WhatsApp</label>
// //                       <input
// //                         type="text"
// //                         value={settings.whatsappNumber}
// //                         onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
// //                         disabled={!editingSettings}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="text-xs text-gray-500 block mb-1">Phone</label>
// //                       <input
// //                         type="text"
// //                         value={settings.mpesaNumber}
// //                         onChange={(e) => setSettings({...settings, mpesaNumber: e.target.value})}
// //                         disabled={!editingSettings}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="text-xs text-gray-500 block mb-1">Location</label>
// //                       <input
// //                         type="text"
// //                         value={settings.location}
// //                         onChange={(e) => setSettings({...settings, location: e.target.value})}
// //                         disabled={!editingSettings}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="text-xs text-gray-500 block mb-1">Hours</label>
// //                       <input
// //                         type="text"
// //                         value={settings.operatingHours}
// //                         onChange={(e) => setSettings({...settings, operatingHours: e.target.value})}
// //                         disabled={!editingSettings}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="bg-white p-6 rounded-xl border">
// //                   <h2 className="font-medium mb-4">Backup & Restore</h2>
// //                   <div className="flex gap-4">
// //                     <button onClick={handleExportData} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
// //                       Export Data
// //                     </button>
// //                     <label className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer">
// //                       Import Data
// //                       <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
// //                     </label>
// //                     <button onClick={handleResetAll} className="px-4 py-2 bg-red-600 text-white rounded-lg">
// //                       Reset All
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* ============================================================ */}
// //             {/* LOCK TAB */}
// //             {/* ============================================================ */}
// //              {/* ============================================================ */}
// //             {/* CATEGORIES TAB */}
// //             {/* ============================================================ */}
// //             {activeTab === 'categories' && (
// //               <div className="space-y-6">
// //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //                   <div>
// //                     <h1 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">
// //                       Menu Categories
// //                     </h1>
// //                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
// //                       {categories.length} categories
// //                     </p>
// //                   </div>
// //                   <button
// //                     onClick={() => {
// //                       setEditingCategory({
// //                         id: '',
// //                         name: '',
// //                         icon: '🍽️',
// //                         description: '',
// //                         displayOrder: categories.length,
// //                         isActive: true
// //                       });
// //                       setShowCategoryModal(true);
// //                     }}
// //                     className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg text-sm font-medium transition-colors"
// //                   >
// //                     <Plus className="w-4 h-4" />
// //                     Add Category
// //                   </button>
// //                 </div>

// //                 {/* Categories Grid */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //                   {categories.filter(c => c.id !== 'all' && c.id !== 'popular').map((category) => (
// //                     <div
// //                       key={category.id}
// //                       className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all"
// //                     >
// //                       <div className="p-5">
// //                         <div className="flex items-start justify-between mb-4">
// //                           <div className="flex items-center gap-3">
// //                             <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
// //                               {category.icon}
// //                             </div>
// //                             <div>
// //                               <h3 className="font-medium text-gray-900 dark:text-white">
// //                                 {category.name}
// //                               </h3>
// //                               <p className="text-xs text-gray-500 dark:text-gray-400">
// //                                 {category.description || 'No description'}
// //                               </p>
// //                             </div>
// //                           </div>
// //                           <label className="relative inline-flex items-center cursor-pointer">
// //                             <input
// //                               type="checkbox"
// //                               checked={category.isActive}
// //                               onChange={() => {
// //                                 updateCategory(category.id, { isActive: !category.isActive });
// //                                 setCategories(getCategories());
// //                               }}
// //                               className="sr-only peer"
// //                             />
// //                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
// //                           </label>
// //                         </div>

// //                         <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
// //                           <button
// //                             onClick={() => {
// //                               setEditingCategory(category);
// //                               setShowCategoryModal(true);
// //                             }}
// //                             className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors"
// //                           >
// //                             Edit
// //                           </button>
// //                           <button
// //                             onClick={() => {
// //                               if (window.confirm(`Delete category "${category.name}"?`)) {
// //                                 deleteCategory(category.id);
// //                                 setCategories(getCategories());
// //                               }
// //                             }}
// //                             className="px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg text-xs font-medium transition-colors"
// //                           >
// //                             <Trash2 className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
 
// //             {activeTab === 'lock' && (
// //               <div className="space-y-6">
// //                 <div>
// //                   <h1 className="font-serif text-2xl md:text-3xl">Lock Control</h1>
// //                   <p className="text-sm text-gray-500 mt-1">Affects ALL users immediately</p>
// //                 </div>

// //                 <div className={`p-6 rounded-xl border ${
// //                   lockState.isLocked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
// //                 }`}>
// //                   <div className="flex items-center gap-4">
// //                     <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
// //                       lockState.isLocked ? 'bg-red-500' : 'bg-green-500'
// //                     }`}>
// //                       {lockState.isLocked ? <Lock className="w-8 h-8 text-white" /> : <Unlock className="w-8 h-8 text-white" />}
// //                     </div>
// //                     <div>
// //                       <h3 className="font-medium text-xl">{lockState.isLocked ? 'Site is Locked' : 'Site is Active'}</h3>
// //                       {lockState.isLocked && <p className="text-gray-600 mt-1">{lockState.message}</p>}
// //                       {lockState.until && (
// //                         <p className="text-sm text-gray-500 mt-2">Until {new Date(lockState.until).toLocaleString()}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   {/* Lock Card */}
// //                   <div className="bg-white p-6 rounded-xl border">
// //                     <Lock className="w-8 h-8 text-red-500 mb-4" />
// //                     <h3 className="font-medium mb-1">Lock Site</h3>
// //                     <p className="text-sm text-gray-500 mb-4">Block all user access</p>
                    
// //                     <div className="space-y-4">
// //                       <textarea
// //                         value={lockMessage}
// //                         onChange={(e) => setLockMessage(e.target.value)}
// //                         placeholder="Lock message..."
// //                         rows={3}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                       />
// //                       <select
// //                         value={lockReason}
// //                         onChange={(e) => setLockReason(e.target.value as any)}
// //                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                       >
// //                         <option value="payment">Payment Required</option>
// //                         <option value="maintenance">Under Maintenance</option>
// //                         <option value="custom">Custom</option>
// //                       </select>
// //                       <div className="grid grid-cols-2 gap-2">
// //                         <input
// //                           type="number"
// //                           value={lockDays}
// //                           onChange={(e) => setLockDays(Number(e.target.value))}
// //                           disabled={lockPermanent}
// //                           placeholder="Days"
// //                           className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                         />
// //                         <input
// //                           type="number"
// //                           value={lockHours}
// //                           onChange={(e) => setLockHours(Number(e.target.value))}
// //                           disabled={lockPermanent}
// //                           placeholder="Hours"
// //                           className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                         />
// //                       </div>
// //                       <label className="flex items-center gap-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={lockPermanent}
// //                           onChange={(e) => setLockPermanent(e.target.checked)}
// //                         />
// //                         <span className="text-sm">Lock permanently</span>
// //                       </label>
// //                       <button
// //                         onClick={lockSite}
// //                         disabled={lockState.isLocked}
// //                         className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
// //                       >
// //                         Lock Site Now
// //                       </button>
// //                     </div>
// //                   </div>

// //                   {/* Unlock Card */}
// //                   <div className="bg-white p-6 rounded-xl border">
// //                     <Unlock className="w-8 h-8 text-green-500 mb-4" />
// //                     <h3 className="font-medium mb-1">Unlock Site</h3>
// //                     <p className="text-sm text-gray-500 mb-4">Restore access</p>
                    
// //                     <button
// //                       onClick={unlockSite}
// //                       disabled={!lockState.isLocked}
// //                       className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
// //                     >
// //                       Unlock Site Now
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Lock History */}
// //                 <div className="bg-white p-6 rounded-xl border">
// //                   <h3 className="font-medium mb-4 flex items-center gap-2">
// //                     <Clock className="w-5 h-5 text-[#FF6B35]" />
// //                     Lock History
// //                   </h3>
// //                   <div className="space-y-2 max-h-60 overflow-y-auto">
// //                     {lockHistory.slice(-10).map((entry, index) => (
// //                       <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
// //                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
// //                           entry.action === 'lock' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
// //                         }`}>
// //                           {entry.action === 'lock' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-sm font-medium">
// //                             {entry.action === 'lock' ? 'Site Locked' : 'Site Unlocked'}
// //                           </p>
// //                           {entry.message && <p className="text-xs text-gray-500">{entry.message}</p>}
// //                           <p className="text-xs text-gray-400 mt-1">
// //                             {new Date(entry.timestamp).toLocaleString()}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Emergency Contact */}
// //                 <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
// //                   <div className="flex items-center gap-4">
// //                     <Phone className="w-5 h-5 text-orange-600" />
// //                     <div>
// //                       <h4 className="font-medium">Emergency Support</h4>
// //                       <p className="text-sm text-gray-600">
// //                         <a href={`tel:${emergency.phone}`} className="text-orange-600 font-medium">{emergency.phone}</a>
// //                         {' • '}
// //                         <a href={emergency.website} target="_blank" rel="noopener noreferrer" className="text-orange-600">Bizwaziri</a>
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </main>
// //       </div>

// //       {/* Edit Item Modal */}
// //       {editingItem && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
// //           <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden">
// //             <div className="bg-[#FF6B35] p-4 flex justify-between items-center">
// //               <h3 className="font-serif text-xl text-white">{newItem ? 'Add Item' : 'Edit Item'}</h3>
// //               <button onClick={() => setEditingItem(null)} className="text-white/80 hover:text-white">
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>
// //             <div className="p-6 max-h-[70vh] overflow-y-auto">
// //               <div className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="text-xs text-gray-500 mb-1 block">Name *</label>
// //                     <input
// //                       type="text"
// //                       value={editingItem.name}
// //                       onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
// //                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="text-xs text-gray-500 mb-1 block">Price *</label>
// //                     <input
// //                       type="number"
// //                       value={editingItem.price}
// //                       onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})}
// //                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-1 block">Description</label>
// //                   <textarea
// //                     value={editingItem.description}
// //                     onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
// //                     rows={3}
// //                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                   />
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="text-xs text-gray-500 mb-1 block">Category</label>
// //                     <select
// //                       value={editingItem.category}
// //                       onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
// //                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     >
// //                       <option value="food">Food</option>
// //                       <option value="drinks">Drinks</option>
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="text-xs text-gray-500 mb-1 block">Prep Time</label>
// //                     <input
// //                       type="text"
// //                       value={editingItem.prepTime}
// //                       onChange={(e) => setEditingItem({...editingItem, prepTime: e.target.value})}
// //                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-1 block">Image</label>
// //                   <div className="flex items-center gap-3">
// //                     <button
// //                       onClick={() => fileInputRef.current?.click()}
// //                       className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm"
// //                     >
// //                       {editingItem.image ? 'Change Image' : 'Upload Image'}
// //                     </button>
// //                     {editingItem.image && (
// //                       <img src={editingItem.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
// //                     )}
// //                   </div>
// //                   <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-2 block">Labels</label>
// //                   <div className="flex gap-2">
// //                     {['Popular', 'Chef Special'].map(label => (
// //                       <button
// //                         key={label}
// //                         onClick={() => toggleLabel(label)}
// //                         className={`px-3 py-1.5 rounded-full text-xs font-medium ${
// //                           editingItem.labels?.includes(label) ? 'bg-[#FF6B35] text-white' : 'bg-gray-100'
// //                         }`}
// //                       >
// //                         {label}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //                 <div className="flex gap-3 pt-4">
// //                   <button
// //                     onClick={handleSaveItem}
// //                     disabled={!editingItem.name || !editingItem.price}
// //                     className="flex-1 px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-medium disabled:opacity-50"
// //                   >
// //                     {newItem ? 'Add Item' : 'Save Changes'}
// //                   </button>
// //                   <button onClick={() => setEditingItem(null)} className="px-6 py-3 border rounded-lg font-medium">
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// //       {/* Category Modal */}
// //       {showCategoryModal && editingCategory && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
// //           <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden">
// //             <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex justify-between items-center">
// //               <h3 className="font-serif text-xl text-white">
// //                 {editingCategory.id ? 'Edit Category' : 'Add Category'}
// //               </h3>
// //               <button onClick={() => setShowCategoryModal(false)} className="text-white/80 hover:text-white">
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>
// //             <div className="p-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-1 block">Category Name *</label>
// //                   <input
// //                     type="text"
// //                     value={editingCategory.name}
// //                     onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
// //                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     placeholder="e.g., Burgers, Pizza, Salads"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-1 block">Icon (emoji)</label>
// //                   <input
// //                     type="text"
// //                     value={editingCategory.icon}
// //                     onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
// //                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     placeholder="🍔 🍕 🥗"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-1 block">Description</label>
// //                   <input
// //                     type="text"
// //                     value={editingCategory.description || ''}
// //                     onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
// //                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                     placeholder="Brief description of this category"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="text-xs text-gray-500 mb-1 block">Display Order</label>
// //                   <input
// //                     type="number"
// //                     value={editingCategory.displayOrder}
// //                     onChange={(e) => setEditingCategory({...editingCategory, displayOrder: parseInt(e.target.value)})}
// //                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
// //                   />
// //                 </div>
// //                 <div className="flex gap-3 pt-4">
// //                   <button
// //                     onClick={() => {
// //                       if (!editingCategory.name) {
// //                         toast.error('Category name is required');
// //                         return;
// //                       }
                      
// //                       if (editingCategory.id) {
// //                         updateCategory(editingCategory.id, editingCategory);
// //                       } else {
// //                         addCategory(editingCategory);
// //                       }
                      
// //                       setCategories(getCategories());
// //                       setShowCategoryModal(false);
// //                       toast.success(editingCategory.id ? 'Category updated' : 'Category added');
// //                     }}
// //                     className="flex-1 px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-medium"
// //                   >
// //                     {editingCategory.id ? 'Save Changes' : 'Add Category'}
// //                   </button>
// //                   <button
// //                     onClick={() => setShowCategoryModal(false)}
// //                     className="px-6 py-3 border rounded-lg font-medium"
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}


// import { useState, useEffect, useRef } from 'react';
// import { 
//   Lock, Unlock, Plus, Edit2, Trash2, Save, X,
//   Phone, ExternalLink, AlertTriangle, Settings,
//   Menu, BarChart3, ChevronRight, LogOut,
//   Eye, EyeOff, Search, Flame, Award, Clock,
//   Image, Home, Upload, Copy, Check,
//   Globe, Shield, Calendar, Users,
//   ShoppingBag, DollarSign, TrendingUp,
//   Camera, RefreshCw, Wifi, WifiOff,
//   Key, Fingerprint, Bell, Download,
//   Printer, Share2, Heart, Star,
//   Coffee, Utensils, Truck, MapPin,
//   MessageCircle, Mail, CreditCard,
//   Wallet, Gift, Zap, Cpu, Database,
//   HardDrive, Monitor, Smartphone,
//   Grid, List, Filter, MoreVertical,
//   Package, Percent, Award as AwardIcon,
//   Moon, Sun, Info, HelpCircle,
//   FileText, Clipboard, BookOpen,
//   Layers, Code, Terminal, Cpu as CpuIcon
// } from 'lucide-react';
// import { 
//   checkAdminPassword, 
//   getSettings, 
//   saveSettings, 
//   getMenuItems, 
//   saveMenuItems,
//   addMenuItem,
//   updateMenuItem,
//   deleteMenuItem,
//   getGalleryImages,
//   addGalleryImage,
//   deleteGalleryImage,
//   getCart,
//   getCartTotal,
//   getCartCount,
//   clearCart,
//   getCategories,
//   saveCategories,
//   addCategory,
//   updateCategory,
//   deleteCategory
// } from '../../utils/storage';
// import { MenuItem, AppSettings, Category } from '../../data/menuData';
// import { toast } from 'sonner';
// import { Toaster } from '../components/ui/sonner';
// import { Link, useNavigate } from 'react-router';

// // ============================================================================
// // MASTER LOCK SYSTEM
// // ============================================================================
// const MASTER_PASSWORD = 'bizwaziri2026';
// const LOCK_STATE_KEY = 'app_global_lock_v2';

// interface LockState {
//   isLocked: boolean;
//   message: string;
//   until: string | null;
//   lockedBy: string | null;
//   lockedAt: string | null;
//   reason: 'payment' | 'maintenance' | 'custom' | null;
// }

// interface LockHistoryEntry {
//   action: 'lock' | 'unlock';
//   message?: string;
//   until?: string | null;
//   lockedBy?: string | null;
//   unlockedBy?: string | null;
//   timestamp: string;
//   reason?: string;
// }

// // ============================================================================
// // ADMIN COMPONENT
// // ============================================================================
// export function Admin() {
//   const navigate = useNavigate();
  
//   // ==========================================================================
//   // AUTH STATE
//   // ==========================================================================
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   // ==========================================================================
//   // APP STATE
//   // ==========================================================================
//   const [settings, setSettings] = useState<AppSettings>(getSettings());
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [galleryImages, setGalleryImages] = useState<string[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return localStorage.getItem('theme') === 'dark';
//   });

//   // ==========================================================================
//   // EDIT STATE
//   // ==========================================================================
//   const [editingSettings, setEditingSettings] = useState(false);
//   const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);
//   const [newItem, setNewItem] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [bulkEditMode, setBulkEditMode] = useState(false);
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [showCategoryModal, setShowCategoryModal] = useState(false);

//   // ==========================================================================
//   // LOCK STATE - GLOBAL CONTROL
//   // ==========================================================================
//   const [lockState, setLockState] = useState<LockState>(() => {
//     const stored = localStorage.getItem(LOCK_STATE_KEY);
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       if (parsed.until && new Date(parsed.until) < new Date()) {
//         return {
//           isLocked: false,
//           message: '',
//           until: null,
//           lockedBy: null,
//           lockedAt: null,
//           reason: null
//         };
//       }
//       return parsed;
//     }
//     return {
//       isLocked: false,
//       message: '',
//       until: null,
//       lockedBy: null,
//       lockedAt: null,
//       reason: null
//     };
//   });
  
//   const [lockMessage, setLockMessage] = useState(lockState.message || 'Payment required. Please contact support.');
//   const [lockDays, setLockDays] = useState(30);
//   const [lockHours, setLockHours] = useState(0);
//   const [lockReason, setLockReason] = useState<'payment' | 'maintenance' | 'custom'>(
//     lockState.reason || 'payment'
//   );
//   const [lockPermanent, setLockPermanent] = useState(false);
//   const [showLockHistory, setShowLockHistory] = useState(false);
//   const [lockHistory, setLockHistory] = useState<LockHistoryEntry[]>([]);

//   // ==========================================================================
//   // DASHBOARD STATS
//   // ==========================================================================
//   const [stats, setStats] = useState({
//     totalOrders: 1247,
//     pendingOrders: 23,
//     totalRevenue: 384500,
//     todayRevenue: 45750,
//     totalCustomers: 856,
//     popularItems: [] as MenuItem[],
//     recentOrders: [] as any[]
//   });

//   // ==========================================================================
//   // REFS
//   // ==========================================================================
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const logoInputRef = useRef<HTMLInputElement>(null);

//   // ==========================================================================
//   // EMERGENCY CONTACT
//   // ==========================================================================
//   const emergency = {
//     phone: '+254775269628',
//     website: 'https://bizwaziri-clean.vercel.app/',
//     email: 'support@bizwaziri.com'
//   };

//   // ==========================================================================
//   // EFFECTS
//   // ==========================================================================
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', isDarkMode);
//     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
//   }, [isDarkMode]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadData();
//       loadLockHistory();
//       calculateStats();
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     const savedAuth = localStorage.getItem('admin_auth');
//     const savedUser = localStorage.getItem('admin_user');
//     if (savedAuth === 'true' && savedUser) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // ==========================================================================
//   // DATA FUNCTIONS
//   // ==========================================================================
//   const loadData = () => {
//     setMenuItems(getMenuItems());
//     setSettings(getSettings());
//     setGalleryImages(getGalleryImages());
//     setCategories(getCategories());
//   };

//   const loadLockHistory = () => {
//     const history = localStorage.getItem('lock_history');
//     setLockHistory(history ? JSON.parse(history) : []);
//   };

//   const addLockHistory = (entry: LockHistoryEntry) => {
//     const history = [...lockHistory, entry];
//     localStorage.setItem('lock_history', JSON.stringify(history.slice(-50)));
//     setLockHistory(history);
//   };

//   const calculateStats = () => {
//     const popular = menuItems
//       .filter(item => item.labels?.includes('Popular'))
//       .slice(0, 5);
//     setStats(prev => ({ ...prev, popularItems: popular }));
//   };

//   // ==========================================================================
//   // FILTERED ITEMS
//   // ==========================================================================
//   const filteredMenuItems = menuItems.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // ==========================================================================
//   // AUTH FUNCTIONS
//   // ==========================================================================
//   const handleLogin = () => {
//     setLoginLoading(true);
//     setTimeout(() => {
//       if (checkAdminPassword(password) || password === MASTER_PASSWORD) {
//         setIsAuthenticated(true);
//         if (rememberMe) {
//           localStorage.setItem('admin_auth', 'true');
//           localStorage.setItem('admin_user', 'Admin');
//         }
//         toast.success('Welcome back, Admin');
//       } else {
//         toast.error('Incorrect password');
//       }
//       setLoginLoading(false);
//     }, 500);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem('admin_auth');
//     localStorage.removeItem('admin_user');
//     toast.success('Logged out');
//     navigate('/');
//   };

//   // ==========================================================================
//   // GLOBAL LOCK CONTROL
//   // ==========================================================================
//   const lockSite = () => {
//     const until = lockPermanent ? null : new Date();
//     if (!lockPermanent && until) {
//       until.setDate(until.getDate() + lockDays);
//       until.setHours(until.getHours() + lockHours);
//     }
    
//     const newState: LockState = {
//       isLocked: true,
//       message: lockMessage,
//       until: until?.toISOString() || null,
//       lockedBy: localStorage.getItem('admin_user') || 'Admin',
//       lockedAt: new Date().toISOString(),
//       reason: lockReason
//     };
    
//     localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
//     setLockState(newState);
    
//     addLockHistory({
//       action: 'lock',
//       message: lockMessage,
//       until: until?.toISOString(),
//       lockedBy: localStorage.getItem('admin_user') || 'Admin',
//       timestamp: new Date().toISOString(),
//       reason: lockReason
//     });
    
//     window.dispatchEvent(new StorageEvent('storage', {
//       key: LOCK_STATE_KEY,
//       newValue: JSON.stringify(newState)
//     }));
    
//     toast.success('🔒 SITE LOCKED GLOBALLY', {
//       description: `Message: ${lockMessage} • All users locked out`,
//       duration: 5000
//     });
    
//     loadLockHistory();
//   };

//   const unlockSite = () => {
//     const newState: LockState = {
//       isLocked: false,
//       message: '',
//       until: null,
//       lockedBy: null,
//       lockedAt: null,
//       reason: null
//     };
    
//     localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
//     setLockState(newState);
    
//     addLockHistory({
//       action: 'unlock',
//       unlockedBy: localStorage.getItem('admin_user') || 'Admin',
//       timestamp: new Date().toISOString()
//     });
    
//     window.dispatchEvent(new StorageEvent('storage', {
//       key: LOCK_STATE_KEY,
//       newValue: JSON.stringify(newState)
//     }));
    
//     toast.success('🔓 Site unlocked');
//     loadLockHistory();
//   };

//   // ==========================================================================
//   // SETTINGS FUNCTIONS
//   // ==========================================================================
//   const handleSaveSettings = () => {
//     saveSettings(settings);
//     setEditingSettings(false);
//     toast.success('Settings saved');
//     window.dispatchEvent(new Event('storage'));
//   };

//   // ==========================================================================
//   // LOGO UPLOAD
//   // ==========================================================================
//   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Image must be less than 2MB');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result as string;
//       setSettings({ ...settings, logo: base64String });
//       saveSettings({ ...settings, logo: base64String });
//       toast.success('Logo updated successfully');
//     };
//     reader.readAsDataURL(file);
//   };

//   // ==========================================================================
//   // MENU ITEM FUNCTIONS
//   // ==========================================================================
//   const handleSaveItem = () => {
//     if (!editingItem) return;

//     if (editingItem.id.startsWith('new-')) {
//       const newId = `item-${Date.now()}`;
//       addMenuItem({ ...editingItem, id: newId });
//       toast.success('Item added to menu');
//     } else {
//       updateMenuItem(editingItem.id, editingItem);
//       toast.success('Item updated');
//     }

//     setEditingItem(null);
//     setNewItem(false);
//     loadData();
//     calculateStats();
//     window.dispatchEvent(new Event('storage'));
//   };

//   const handleDeleteItem = (id: string) => {
//     if (window.confirm('Delete this item?')) {
//       deleteMenuItem(id);
//       loadData();
//       toast.success('Item deleted');
//       calculateStats();
//       window.dispatchEvent(new Event('storage'));
//     }
//   };

//   const startNewItem = () => {
//     setEditingItem({
//       id: `new-${Date.now()}`,
//       name: '',
//       description: '',
//       price: 0,
//       image: '',
//       category: 'food',
//       labels: [],
//       prepTime: '15 min',
//       dietary: [],
//       nutrition: { calories: 0, protein: 0, carbs: 0, fats: 0 }
//     });
//     setNewItem(true);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && editingItem) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditingItem({ ...editingItem, image: reader.result as string });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const toggleLabel = (label: string) => {
//     if (!editingItem) return;
//     const labels = editingItem.labels || [];
//     setEditingItem({
//       ...editingItem,
//       labels: labels.includes(label) 
//         ? labels.filter(l => l !== label) 
//         : [...labels, label]
//     });
//   };

//   const toggleSelectItem = (id: string) => {
//     setSelectedItems(prev =>
//       prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//     );
//   };

//   const bulkDelete = () => {
//     if (selectedItems.length === 0) return;
    
//     if (window.confirm(`Delete ${selectedItems.length} items?`)) {
//       selectedItems.forEach(id => deleteMenuItem(id));
//       setSelectedItems([]);
//       setBulkEditMode(false);
//       loadData();
//       toast.success(`${selectedItems.length} items deleted`);
//       calculateStats();
//     }
//   };

//   // ==========================================================================
//   // DATA EXPORT/IMPORT
//   // ==========================================================================
//   const handleExportData = () => {
//     const data = {
//       settings: getSettings(),
//       menuItems: getMenuItems(),
//       gallery: getGalleryImages(),
//       categories: getCategories(),
//       timestamp: new Date().toISOString()
//     };
//     const dataStr = JSON.stringify(data, null, 2);
//     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//     const exportFileDefaultName = `bizwaziri-backup-${new Date().toISOString().slice(0,10)}.json`;
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
//     toast.success('Data exported successfully');
//   };

//   const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const data = JSON.parse(e.target?.result as string);
//         if (data.settings) saveSettings(data.settings);
//         if (data.menuItems) saveMenuItems(data.menuItems);
//         if (data.categories) saveCategories(data.categories);
//         if (data.gallery) {
//           data.gallery.forEach((img: string) => addGalleryImage(img));
//         }
//         loadData();
//         toast.success('Data imported successfully');
//       } catch {
//         toast.error('Failed to import data');
//       }
//     };
//     reader.readAsText(file);
//   };

//   const handleResetAll = () => {
//     if (window.confirm('⚠️ This will delete ALL data. Are you sure?')) {
//       localStorage.clear();
//       window.location.reload();
//     }
//   };

//   // ==========================================================================
//   // LOGIN SCREEN
//   // ==========================================================================
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
//         <Toaster position="top-center" richColors />
        
//         {/* Emergency Bar */}
//         <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white z-50 py-2 px-4 flex items-center justify-between text-sm">
//           <div className="flex items-center gap-2">
//             <AlertTriangle className="w-4 h-4 animate-pulse" />
//             <span className="font-medium">EMERGENCY SUPPORT</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <a href={`tel:${emergency.phone}`} className="hover:underline flex items-center gap-1">
//               <Phone className="w-3 h-3" />
//               {emergency.phone}
//             </a>
//             <span className="text-red-300 hidden sm:inline">|</span>
//             <a href={emergency.website} target="_blank" rel="noopener noreferrer" className="hover:underline hidden sm:flex items-center gap-1">
//               Bizwaziri
//               <ExternalLink className="w-3 h-3" />
//             </a>
//           </div>
//         </div>

//         {/* Login Card */}
//         <div className="w-full max-w-md mt-12">
//           <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//             <div className="h-32 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] relative">
//               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
//                 <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-700">
//                   <Shield className="w-12 h-12 text-[#FF6B35]" />
//                 </div>
//               </div>
//             </div>

//             <div className="pt-16 p-8">
//               <div className="text-center mb-8">
//                 <h1 className="font-serif text-3xl text-gray-900 dark:text-white mb-2">
//                   Admin Access
//                 </h1>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Enter master password to continue
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
//                     placeholder="Password"
//                     className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 text-sm"
//                     autoFocus
//                   />
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       className="w-4 h-4 rounded border-gray-300 text-[#FF6B35] focus:ring-[#FF6B35]"
//                     />
//                     <span className="text-xs text-gray-600 dark:text-gray-300">Remember me</span>
//                   </label>
//                 </div>

//                 <button
//                   onClick={handleLogin}
//                   disabled={loginLoading}
//                   className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] hover:from-[#E55A2B] hover:to-[#E55A2B] text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {loginLoading ? (
//                     <>
//                       <RefreshCw className="w-4 h-4 animate-spin" />
//                       Authenticating...
//                     </>
//                   ) : (
//                     <>
//                       <Key className="w-4 h-4" />
//                       Unlock Admin Panel
//                     </>
//                   )}
//                 </button>

//                 <div className="text-center">
//                   <a
//                     href={`?override=${MASTER_PASSWORD}`}
//                     className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                   >
//                     Emergency override
//                   </a>
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-400">Powered by</span>
//                   <a 
//                     href={emergency.website}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-xs font-medium text-[#FF6B35] hover:text-[#E55A2B] flex items-center gap-1"
//                   >
//                     Bizwaziri Technologies
//                     <ExternalLink className="w-3 h-3" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================================================
//   // ADMIN PANEL
//   // ==========================================================================
//   return (
//     <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
//       <Toaster position="top-center" richColors />
      
//       {/* Global Lock Banner */}
//       {lockState.isLocked && (
//         <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 md:px-6 flex flex-wrap items-center justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <Lock className="w-4 h-4" />
//             <span className="text-sm font-medium">SITE LOCKED:</span>
//             <span className="text-sm">{lockState.message}</span>
//             {lockState.until && (
//               <span className="text-xs bg-white/20 px-2 py-1 rounded">
//                 Until {new Date(lockState.until).toLocaleString()}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={unlockSite}
//               className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-colors"
//             >
//               Unlock Now
//             </button>
//             <button
//               onClick={() => setActiveTab('lock')}
//               className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors"
//             >
//               Manage
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Top Bar */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
//           <div className="flex items-center justify-between">
//             {/* Left */}
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
//               >
//                 <Menu className="w-5 h-5" />
//               </button>

//               <div className="flex items-center gap-3">
//                 {/* Logo with Upload */}
//                 <div className="relative group">
//                   <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-lg flex items-center justify-center overflow-hidden">
//                     {settings.logo?.startsWith('data:') ? (
//                       <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
//                     ) : (
//                       <span className="text-white text-lg font-bold">{settings.logo || 'B'}</span>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => logoInputRef.current?.click()}
//                     className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                     title="Upload logo"
//                   >
//                     <Camera className="w-3 h-3 text-gray-600 dark:text-gray-300" />
//                   </button>
//                   <input
//                     ref={logoInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleLogoUpload}
//                     className="hidden"
//                   />
//                 </div>
                
//                 <div>
//                   <h1 className="font-medium text-gray-900 dark:text-white">
//                     {settings.name || 'Admin Panel'}
//                   </h1>
//                   <div className="flex items-center gap-2">
//                     <div className={`w-2 h-2 rounded-full ${lockState.isLocked ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       {lockState.isLocked ? 'Locked' : 'Active'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setIsDarkMode(!isDarkMode)}
//                 className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                 title={isDarkMode ? 'Light mode' : 'Dark mode'}
//               >
//                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//               <Link
//                 to="/"
//                 className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                 title="View Site"
//               >
//                 <Home className="w-5 h-5" />
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//                 title="Logout"
//               >
//                 <LogOut className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 ${
//           sidebarCollapsed ? 'w-0 lg:w-20' : 'w-64'
//         } overflow-hidden`}>
//           <nav className="p-4 space-y-1">
//             <button
//               onClick={() => setActiveTab('dashboard')}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 activeTab === 'dashboard'
//                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <BarChart3 className="w-5 h-5" />
//               {!sidebarCollapsed && <span className="text-sm">Dashboard</span>}
//             </button>

//             <button
//               onClick={() => setActiveTab('menu')}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 activeTab === 'menu'
//                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Menu className="w-5 h-5" />
//               {!sidebarCollapsed && <span className="text-sm">Menu</span>}
//             </button>

//             <button
//               onClick={() => setActiveTab('categories')}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 activeTab === 'categories'
//                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Grid className="w-5 h-5" />
//               {!sidebarCollapsed && <span className="text-sm">Categories</span>}
//             </button>

//             <button
//               onClick={() => setActiveTab('gallery')}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 activeTab === 'gallery'
//                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Image className="w-5 h-5" />
//               {!sidebarCollapsed && <span className="text-sm">Gallery</span>}
//             </button>

//             <button
//               onClick={() => setActiveTab('settings')}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 activeTab === 'settings'
//                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Settings className="w-5 h-5" />
//               {!sidebarCollapsed && <span className="text-sm">Settings</span>}
//             </button>

//             <button
//               onClick={() => setActiveTab('lock')}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
//                 activeTab === 'lock'
//                   ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8C5A]/10 text-[#FF6B35]'
//                   : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Shield className="w-5 h-5" />
//               {!sidebarCollapsed && (
//                 <div className="flex-1 flex items-center justify-between">
//                   <span className="text-sm">Lock</span>
//                   {lockState.isLocked && (
//                     <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//                   )}
//                 </div>
//               )}
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content Area */}
//         <main className={`flex-1 transition-all duration-300 p-4 md:p-6 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
//           <div className="max-w-7xl mx-auto">
            
//             {/* ============================================================ */}
//             {/* DASHBOARD TAB */}
//             {/* ============================================================ */}
//             {activeTab === 'dashboard' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h1 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">
//                     Dashboard
//                   </h1>
//                   <button
//                     onClick={calculateStats}
//                     className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     title="Refresh"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
//                     <ShoppingBag className="w-5 h-5 text-blue-600 mb-2" />
//                     <p className="text-2xl font-serif">{stats.totalOrders}</p>
//                     <p className="text-xs text-gray-500">Total Orders</p>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
//                     <Clock className="w-5 h-5 text-yellow-600 mb-2" />
//                     <p className="text-2xl font-serif">{stats.pendingOrders}</p>
//                     <p className="text-xs text-gray-500">Pending Orders</p>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
//                     <DollarSign className="w-5 h-5 text-green-600 mb-2" />
//                     <p className="text-2xl font-serif">KES {stats.todayRevenue.toLocaleString()}</p>
//                     <p className="text-xs text-gray-500">Today's Revenue</p>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
//                     <Users className="w-5 h-5 text-purple-600 mb-2" />
//                     <p className="text-2xl font-serif">{stats.totalCustomers}</p>
//                     <p className="text-xs text-gray-500">Total Customers</p>
//                   </div>
//                 </div>

//                 {/* Popular Items */}
//                 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
//                   <h2 className="font-medium mb-4 flex items-center gap-2">
//                     <Flame className="w-5 h-5 text-[#FF6B35]" />
//                     Popular Items
//                   </h2>
//                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                     {stats.popularItems.map(item => (
//                       <div key={item.id} className="text-center">
//                         <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
//                         <p className="text-sm font-medium truncate">{item.name}</p>
//                         <p className="text-xs text-gray-500">KES {item.price}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Lock Status */}
//                 <div className={`p-6 rounded-xl border ${
//                   lockState.isLocked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
//                 }`}>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
//                         lockState.isLocked ? 'bg-red-500' : 'bg-green-500'
//                       }`}>
//                         {lockState.isLocked ? <Lock className="w-6 h-6 text-white" /> : <Unlock className="w-6 h-6 text-white" />}
//                       </div>
//                       <div>
//                         <h3 className="font-medium">{lockState.isLocked ? 'Site is Locked' : 'Site is Active'}</h3>
//                         {lockState.isLocked && <p className="text-sm text-gray-600">{lockState.message}</p>}
//                       </div>
//                     </div>
//                     <button onClick={() => setActiveTab('lock')} className="px-4 py-2 bg-white rounded-lg text-sm">
//                       Manage
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* ============================================================ */}
//             {/* MENU TAB */}
//             {/* ============================================================ */}
//             {activeTab === 'menu' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between">
//                   <div>
//                     <h1 className="font-serif text-2xl md:text-3xl">Menu Manager</h1>
//                     <p className="text-sm text-gray-500 mt-1">{filteredMenuItems.length} items</p>
//                   </div>
//                   <div className="flex gap-2">
//                     {bulkEditMode ? (
//                       <>
//                         <button onClick={bulkDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">
//                           Delete {selectedItems.length}
//                         </button>
//                         <button onClick={() => setBulkEditMode(false)} className="px-4 py-2 border rounded-lg">
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={() => setBulkEditMode(true)} className="px-4 py-2 border rounded-lg">
//                           Bulk Edit
//                         </button>
//                         <button onClick={startNewItem} className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg">
//                           <Plus className="w-4 h-4" /> Add Item
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       placeholder="Search menu..."
//                       className="w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg text-sm"
//                     />
//                   </div>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="px-4 py-2.5 bg-white border rounded-lg text-sm"
//                   >
//                     <option value="all">All</option>
//                     <option value="food">Food</option>
//                     <option value="drinks">Drinks</option>
//                     {categories.filter(c => c.isActive && c.id !== 'all' && c.id !== 'popular').map(c => (
//                       <option key={c.id} value={c.id}>{c.name}</option>
//                     ))}
//                   </select>
//                   <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
//                     >
//                       <Grid className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
//                     >
//                       <List className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                   {filteredMenuItems.map(item => (
//                     <div key={item.id} className="bg-white border rounded-xl overflow-hidden relative">
//                       {bulkEditMode && (
//                         <div className="absolute top-2 left-2 z-10">
//                           <input
//                             type="checkbox"
//                             checked={selectedItems.includes(item.id)}
//                             onChange={() => toggleSelectItem(item.id)}
//                             className="w-4 h-4"
//                           />
//                         </div>
//                       )}
//                       <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
//                       <div className="p-4">
//                         <div className="flex justify-between mb-2">
//                           <h3 className="font-medium">{item.name}</h3>
//                           <span className="font-medium text-[#FF6B35]">KES {item.price}</span>
//                         </div>
//                         <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
//                         <div className="flex gap-2">
//                           <button onClick={() => setEditingItem(item)} className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">
//                             Edit
//                           </button>
//                           <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ============================================================ */}
//             {/* CATEGORIES TAB */}
//             {/* ============================================================ */}
//             {activeTab === 'categories' && (
//               <div className="space-y-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                   <div>
//                     <h1 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">
//                       Menu Categories
//                     </h1>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                       {categories.filter(c => c.id !== 'all' && c.id !== 'popular').length} categories
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setEditingCategory({
//                         id: '',
//                         name: '',
//                         icon: '🍽️',
//                         description: '',
//                         displayOrder: categories.length,
//                         isActive: true
//                       });
//                       setShowCategoryModal(true);
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg text-sm font-medium transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Category
//                   </button>
//                 </div>

//                 {/* Categories Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {categories.filter(c => c.id !== 'all' && c.id !== 'popular').map((category) => (
//                     <div
//                       key={category.id}
//                       className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all"
//                     >
//                       <div className="p-5">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
//                               {category.icon}
//                             </div>
//                             <div>
//                               <h3 className="font-medium text-gray-900 dark:text-white">
//                                 {category.name}
//                               </h3>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                 {category.description || 'No description'}
//                               </p>
//                             </div>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={category.isActive}
//                               onChange={() => {
//                                 updateCategory(category.id, { isActive: !category.isActive });
//                                 setCategories(getCategories());
//                               }}
//                               className="sr-only peer"
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
//                           </label>
//                         </div>

//                         <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
//                           <button
//                             onClick={() => {
//                               setEditingCategory(category);
//                               setShowCategoryModal(true);
//                             }}
//                             className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => {
//                               if (window.confirm(`Delete category "${category.name}"?`)) {
//                                 deleteCategory(category.id);
//                                 setCategories(getCategories());
//                               }
//                             }}
//                             className="px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg text-xs font-medium transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ============================================================ */}
//             {/* GALLERY TAB */}
//             {/* ============================================================ */}
//             {activeTab === 'gallery' && (
//               <div className="space-y-6">
//                 <h1 className="font-serif text-2xl md:text-3xl">Gallery Manager</h1>
//                 <p className="text-sm text-gray-500">{galleryImages.length} images</p>
                
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {galleryImages.map((img, idx) => (
//                     <div key={idx} className="relative group">
//                       <img src={img} alt={`Gallery ${idx}`} className="w-full aspect-square object-cover rounded-lg" />
//                       <button
//                         onClick={() => {
//                           deleteGalleryImage(img);
//                           loadData();
//                         }}
//                         className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ============================================================ */}
//             {/* SETTINGS TAB */}
//             {/* ============================================================ */}
//             {activeTab === 'settings' && (
//               <div className="space-y-6">
//                 <div className="flex justify-between">
//                   <h1 className="font-serif text-2xl md:text-3xl">Settings</h1>
//                   {editingSettings ? (
//                     <div className="flex gap-2">
//                       <button onClick={handleSaveSettings} className="px-4 py-2 bg-green-600 text-white rounded-lg">
//                         Save
//                       </button>
//                       <button onClick={() => { setSettings(getSettings()); setEditingSettings(false); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <button onClick={() => setEditingSettings(true)} className="px-4 py-2 bg-gray-900 text-white rounded-lg">
//                       Edit
//                     </button>
//                   )}
//                 </div>

//                 <div className="bg-white p-6 rounded-xl border">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">Business Name</label>
//                       <input
//                         type="text"
//                         value={settings.name}
//                         onChange={(e) => setSettings({...settings, name: e.target.value})}
//                         disabled={!editingSettings}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">Slogan</label>
//                       <input
//                         type="text"
//                         value={settings.slogan}
//                         onChange={(e) => setSettings({...settings, slogan: e.target.value})}
//                         disabled={!editingSettings}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">WhatsApp</label>
//                       <input
//                         type="text"
//                         value={settings.whatsappNumber}
//                         onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
//                         disabled={!editingSettings}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">Phone</label>
//                       <input
//                         type="text"
//                         value={settings.mpesaNumber}
//                         onChange={(e) => setSettings({...settings, mpesaNumber: e.target.value})}
//                         disabled={!editingSettings}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">Location</label>
//                       <input
//                         type="text"
//                         value={settings.location}
//                         onChange={(e) => setSettings({...settings, location: e.target.value})}
//                         disabled={!editingSettings}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">Hours</label>
//                       <input
//                         type="text"
//                         value={settings.operatingHours}
//                         onChange={(e) => setSettings({...settings, operatingHours: e.target.value})}
//                         disabled={!editingSettings}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg disabled:opacity-50"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-xl border">
//                   <h2 className="font-medium mb-4">Backup & Restore</h2>
//                   <div className="flex gap-4">
//                     <button onClick={handleExportData} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
//                       Export Data
//                     </button>
//                     <label className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer">
//                       Import Data
//                       <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
//                     </label>
//                     <button onClick={handleResetAll} className="px-4 py-2 bg-red-600 text-white rounded-lg">
//                       Reset All
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* ============================================================ */}
//             {/* LOCK TAB */}
//             {/* ============================================================ */}
//             {activeTab === 'lock' && (
//               <div className="space-y-6">
//                 <div>
//                   <h1 className="font-serif text-2xl md:text-3xl">Lock Control</h1>
//                   <p className="text-sm text-gray-500 mt-1">Affects ALL users immediately</p>
//                 </div>

//                 <div className={`p-6 rounded-xl border ${
//                   lockState.isLocked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
//                 }`}>
//                   <div className="flex items-center gap-4">
//                     <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
//                       lockState.isLocked ? 'bg-red-500' : 'bg-green-500'
//                     }`}>
//                       {lockState.isLocked ? <Lock className="w-8 h-8 text-white" /> : <Unlock className="w-8 h-8 text-white" />}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-xl">{lockState.isLocked ? 'Site is Locked' : 'Site is Active'}</h3>
//                       {lockState.isLocked && <p className="text-gray-600 mt-1">{lockState.message}</p>}
//                       {lockState.until && (
//                         <p className="text-sm text-gray-500 mt-2">Until {new Date(lockState.until).toLocaleString()}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   {/* Lock Card */}
//                   <div className="bg-white p-6 rounded-xl border">
//                     <Lock className="w-8 h-8 text-red-500 mb-4" />
//                     <h3 className="font-medium mb-1">Lock Site</h3>
//                     <p className="text-sm text-gray-500 mb-4">Block all user access</p>
                    
//                     <div className="space-y-4">
//                       <textarea
//                         value={lockMessage}
//                         onChange={(e) => setLockMessage(e.target.value)}
//                         placeholder="Lock message..."
//                         rows={3}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                       />
//                       <select
//                         value={lockReason}
//                         onChange={(e) => setLockReason(e.target.value as any)}
//                         className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                       >
//                         <option value="payment">Payment Required</option>
//                         <option value="maintenance">Under Maintenance</option>
//                         <option value="custom">Custom</option>
//                       </select>
//                       <div className="grid grid-cols-2 gap-2">
//                         <input
//                           type="number"
//                           value={lockDays}
//                           onChange={(e) => setLockDays(Number(e.target.value))}
//                           disabled={lockPermanent}
//                           placeholder="Days"
//                           className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                         />
//                         <input
//                           type="number"
//                           value={lockHours}
//                           onChange={(e) => setLockHours(Number(e.target.value))}
//                           disabled={lockPermanent}
//                           placeholder="Hours"
//                           className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                         />
//                       </div>
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={lockPermanent}
//                           onChange={(e) => setLockPermanent(e.target.checked)}
//                         />
//                         <span className="text-sm">Lock permanently</span>
//                       </label>
//                       <button
//                         onClick={lockSite}
//                         disabled={lockState.isLocked}
//                         className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
//                       >
//                         Lock Site Now
//                       </button>
//                     </div>
//                   </div>

//                   {/* Unlock Card */}
//                   <div className="bg-white p-6 rounded-xl border">
//                     <Unlock className="w-8 h-8 text-green-500 mb-4" />
//                     <h3 className="font-medium mb-1">Unlock Site</h3>
//                     <p className="text-sm text-gray-500 mb-4">Restore access</p>
                    
//                     <button
//                       onClick={unlockSite}
//                       disabled={!lockState.isLocked}
//                       className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
//                     >
//                       Unlock Site Now
//                     </button>
//                   </div>
//                 </div>

//                 {/* Lock History */}
//                 <div className="bg-white p-6 rounded-xl border">
//                   <h3 className="font-medium mb-4 flex items-center gap-2">
//                     <Clock className="w-5 h-5 text-[#FF6B35]" />
//                     Lock History
//                   </h3>
//                   <div className="space-y-2 max-h-60 overflow-y-auto">
//                     {lockHistory.slice(-10).map((entry, index) => (
//                       <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
//                           entry.action === 'lock' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                         }`}>
//                           {entry.action === 'lock' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium">
//                             {entry.action === 'lock' ? 'Site Locked' : 'Site Unlocked'}
//                           </p>
//                           {entry.message && <p className="text-xs text-gray-500">{entry.message}</p>}
//                           <p className="text-xs text-gray-400 mt-1">
//                             {new Date(entry.timestamp).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Emergency Contact */}
//                 <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
//                   <div className="flex items-center gap-4">
//                     <Phone className="w-5 h-5 text-orange-600" />
//                     <div>
//                       <h4 className="font-medium">Emergency Support</h4>
//                       <p className="text-sm text-gray-600">
//                         <a href={`tel:${emergency.phone}`} className="text-orange-600 font-medium">{emergency.phone}</a>
//                         {' • '}
//                         <a href={emergency.website} target="_blank" rel="noopener noreferrer" className="text-orange-600">Bizwaziri</a>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       {/* Edit Item Modal */}
//       {editingItem && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//           <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden">
//             <div className="bg-[#FF6B35] p-4 flex justify-between items-center">
//               <h3 className="font-serif text-xl text-white">{newItem ? 'Add Item' : 'Edit Item'}</h3>
//               <button onClick={() => setEditingItem(null)} className="text-white/80 hover:text-white">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="p-6 max-h-[70vh] overflow-y-auto">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">Name *</label>
//                     <input
//                       type="text"
//                       value={editingItem.name}
//                       onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
//                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">Price *</label>
//                     <input
//                       type="number"
//                       value={editingItem.price}
//                       onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})}
//                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Description</label>
//                   <textarea
//                     value={editingItem.description}
//                     onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
//                     rows={3}
//                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">Category</label>
//                     <select
//                       value={editingItem.category}
//                       onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
//                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     >
//                       <option value="food">Food</option>
//                       <option value="drinks">Drinks</option>
//                       {categories.filter(c => c.isActive && c.id !== 'all' && c.id !== 'popular').map(c => (
//                         <option key={c.id} value={c.id}>{c.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">Prep Time</label>
//                     <input
//                       type="text"
//                       value={editingItem.prepTime}
//                       onChange={(e) => setEditingItem({...editingItem, prepTime: e.target.value})}
//                       className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Image</label>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm"
//                     >
//                       {editingItem.image ? 'Change Image' : 'Upload Image'}
//                     </button>
//                     {editingItem.image && (
//                       <img src={editingItem.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
//                     )}
//                   </div>
//                   <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-2 block">Labels</label>
//                   <div className="flex gap-2">
//                     {['Popular', 'Chef Special'].map(label => (
//                       <button
//                         key={label}
//                         onClick={() => toggleLabel(label)}
//                         className={`px-3 py-1.5 rounded-full text-xs font-medium ${
//                           editingItem.labels?.includes(label) ? 'bg-[#FF6B35] text-white' : 'bg-gray-100'
//                         }`}
//                       >
//                         {label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={handleSaveItem}
//                     disabled={!editingItem.name || !editingItem.price}
//                     className="flex-1 px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-medium disabled:opacity-50"
//                   >
//                     {newItem ? 'Add Item' : 'Save Changes'}
//                   </button>
//                   <button onClick={() => setEditingItem(null)} className="px-6 py-3 border rounded-lg font-medium">
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Category Modal */}
//       {showCategoryModal && editingCategory && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
//           <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex justify-between items-center">
//               <h3 className="font-serif text-xl text-white">
//                 {editingCategory.id ? 'Edit Category' : 'Add Category'}
//               </h3>
//               <button onClick={() => setShowCategoryModal(false)} className="text-white/80 hover:text-white">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Category Name *</label>
//                   <input
//                     type="text"
//                     value={editingCategory.name}
//                     onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
//                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     placeholder="e.g., Burgers, Pizza, Salads"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Icon (emoji)</label>
//                   <input
//                     type="text"
//                     value={editingCategory.icon}
//                     onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
//                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     placeholder="🍔 🍕 🥗"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Description</label>
//                   <input
//                     type="text"
//                     value={editingCategory.description || ''}
//                     onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
//                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                     placeholder="Brief description of this category"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1 block">Display Order</label>
//                   <input
//                     type="number"
//                     value={editingCategory.displayOrder}
//                     onChange={(e) => setEditingCategory({...editingCategory, displayOrder: parseInt(e.target.value)})}
//                     className="w-full px-4 py-2 bg-gray-50 border rounded-lg text-sm"
//                   />
//                 </div>
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={() => {
//                       if (!editingCategory.name) {
//                         toast.error('Category name is required');
//                         return;
//                       }
                      
//                       if (editingCategory.id) {
//                         updateCategory(editingCategory.id, editingCategory);
//                       } else {
//                         addCategory(editingCategory);
//                       }
                      
//                       setCategories(getCategories());
//                       setShowCategoryModal(false);
//                       toast.success(editingCategory.id ? 'Category updated' : 'Category added');
//                     }}
//                     className="flex-1 px-6 py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-lg font-medium"
//                   >
//                     {editingCategory.id ? 'Save Changes' : 'Add Category'}
//                   </button>
//                   <button
//                     onClick={() => setShowCategoryModal(false)}
//                     className="px-6 py-3 border rounded-lg font-medium"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Search, Plus, Edit2, Trash2, Save,
  Home, Settings, CreditCard, Truck, Package,
  Users, BarChart3, LogOut, Camera, Upload,
  Grid, List, ChevronRight, Lock, Unlock, Phone,
  ExternalLink, AlertTriangle, Key, Eye, EyeOff,
  Check, Clock, DollarSign, ShoppingBag, Flame,
  Sun, Moon // Add these two!
} from 'lucide-react';
import { 
  checkAdminPassword, 
  getSettings, 
  saveSettings, 
  getMenuItems, 
  saveMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem 
} from '../../utils/storage';
import { MenuItem, AppSettings } from '../../data/menuData';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { Link, useNavigate } from 'react-router';

const MASTER_PASSWORD = 'bizwaziri2026';
const LOCK_STATE_KEY = 'app_global_lock';

export function Admin() {
  const navigate = useNavigate();
  
  // ==========================================================================
  // AUTH STATE
  // ==========================================================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // ==========================================================================
  // APP STATE
  // ==========================================================================
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // ==========================================================================
  // EDIT STATE
  // ==========================================================================
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // ==========================================================================
  // LOCK STATE
  // ==========================================================================
  const [lockState, setLockState] = useState(() => {
    const stored = localStorage.getItem(LOCK_STATE_KEY);
    return stored ? JSON.parse(stored) : { isLocked: false, message: '', until: null };
  });
  const [lockMessage, setLockMessage] = useState('');
  const [lockDays, setLockDays] = useState(7);

  // ==========================================================================
  // REFS
  // ==========================================================================
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // ==========================================================================
  // EFFECTS
  // ==========================================================================
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (isAuthenticated) {
      setMenuItems(getMenuItems());
    }
  }, [isAuthenticated]);

  // ==========================================================================
  // AUTH
  // ==========================================================================
  const handleLogin = () => {
    setLoginLoading(true);
    setTimeout(() => {
      if (checkAdminPassword(password) || password === MASTER_PASSWORD) {
        setIsAuthenticated(true);
        toast.success('Welcome back');
      } else {
        toast.error('Incorrect password');
      }
      setLoginLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  // ==========================================================================
  // LOCK CONTROL
  // ==========================================================================
  const lockSite = () => {
    const until = new Date();
    until.setDate(until.getDate() + lockDays);
    
    const newState = {
      isLocked: true,
      message: lockMessage || 'Site under maintenance',
      until: until.toISOString()
    };
    
    localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
    setLockState(newState);
    window.dispatchEvent(new Event('storage'));
    toast.success('Site locked');
  };

  const unlockSite = () => {
    const newState = { isLocked: false, message: '', until: null };
    localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
    setLockState(newState);
    window.dispatchEvent(new Event('storage'));
    toast.success('Site unlocked');
  };

  // ==========================================================================
  // SETTINGS
  // ==========================================================================
 const handleSaveSettings = () => {
  saveSettings(settings);
  setEditingSettings(false);
  toast.success('Settings saved');
  
  // Dispatch storage event for other tabs
  window.dispatchEvent(new Event('storage'));
  
  // DIRECTLY update the current tab's title and favicon
  document.title = settings.name || 'Alimar Caterers';
  
  // Update favicon if logo exists
  const favicon = document.getElementById('favicon') as HTMLLinkElement;
  if (favicon && settings.logo) {
    favicon.href = settings.logo;
  }
  
  window.dispatchEvent(new Event('storage'));
};
  // ==========================================================================
  // LOGO UPLOAD
  // ==========================================================================
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSettings({ ...settings, logo: base64String });
      saveSettings({ ...settings, logo: base64String });
      toast.success('Logo updated');
    };
    reader.readAsDataURL(file);
  };

  // ==========================================================================
  // MENU ITEMS
  // ==========================================================================
  const handleSaveItem = () => {
    if (!editingItem) return;

    if (editingItem.id.startsWith('new-')) {
      addMenuItem({ ...editingItem, id: `item-${Date.now()}` });
      toast.success('Item added');
    } else {
      updateMenuItem(editingItem.id, editingItem);
      toast.success('Item updated');
    }

    setEditingItem(null);
    setNewItem(false);
    setMenuItems(getMenuItems());
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Delete this item?')) {
      deleteMenuItem(id);
      setMenuItems(getMenuItems());
      toast.success('Item deleted');
    }
  };

  const startNewItem = () => {
    setEditingItem({
      id: `new-${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'food',
      labels: [],
      prepTime: '15 min',
      dietary: [],
      nutrition: { calories: 0, protein: 0, carbs: 0, fats: 0 }
    });
    setNewItem(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLabel = (label: string) => {
    if (!editingItem) return;
    const labels = editingItem.labels || [];
    setEditingItem({
      ...editingItem,
      labels: labels.includes(label) ? labels.filter(l => l !== label) : [...labels, label]
    });
  };

  // ==========================================================================
  // FILTERED ITEMS
  // ==========================================================================
  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: menuItems.length,
    food: menuItems.filter(i => i.category === 'food').length,
    drinks: menuItems.filter(i => i.category === 'drinks').length,
    popular: menuItems.filter(i => i.labels?.includes('Popular')).length
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'menu', label: 'Menu', icon: Package },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'lock', label: 'Lock', icon: Lock },
  ];

  // ==========================================================================
  // LOGIN SCREEN
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        
        {/* Emergency Bar */}
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-sm py-2 px-4 flex justify-between z-50">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Emergency: +254775269628
          </span>
          <a href="https://bizwaziri-clean.vercel.app/" target="_blank" rel="noopener noreferrer">
            Bizwaziri
          </a>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <Key className="w-8 h-8 text-white dark:text-gray-900" />
              </div>
              <h1 className="font-serif text-2xl text-gray-900 dark:text-white">Admin</h1>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-900 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                  autoFocus
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loginLoading ? 'Please wait...' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // ADMIN PANEL - COMPLETELY RESPONSIVE
  // ==========================================================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-center" />
      
      {/* Lock Banner */}
      {lockState.isLocked && (
        <div className="sticky top-0 z-40 bg-red-600 text-white text-sm py-2 px-4 flex items-center justify-between">
          <span>🔒 {lockState.message}</span>
          <button onClick={unlockSite} className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs">
            Unlock
          </button>
        </div>
      )}

      {/* Mobile Header - Only visible on small screens */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <span className="font-medium text-gray-900 dark:text-white block">{settings.name || 'Admin'}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${lockState.isLocked ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-xs text-gray-500">{lockState.isLocked ? 'Locked' : 'Active'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Home className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm ${
                  activeTab === tab.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              {settings.logo?.startsWith('data:') ? (
                <img src={settings.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-white dark:text-gray-900 text-sm font-bold">{settings.logo || 'B'}</span>
              )}
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white block">{settings.name || 'Admin'}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className={`w-1.5 h-1.5 rounded-full ${lockState.isLocked ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="text-xs text-gray-500">{lockState.isLocked ? 'Locked' : 'Active'}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDarkMode ? 'Light mode' : 'Dark mode'}
            </button>
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              View site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive padding */}
      <div className="lg:ml-64">
        <div className="p-4 md:p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl">Dashboard</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Total Items</p>
                  <p className="text-2xl font-serif">{stats.total}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Food</p>
                  <p className="text-2xl font-serif">{stats.food}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Drinks</p>
                  <p className="text-2xl font-serif">{stats.drinks}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Popular</p>
                  <p className="text-2xl font-serif">{stats.popular}</p>
                </div>
              </div>

              {/* Popular Items Preview */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h2 className="font-medium mb-4">Popular Items</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {menuItems.filter(i => i.labels?.includes('Popular')).slice(0, 4).map(item => (
                    <div key={item.id}>
                      <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Menu Manager */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl">Menu</h1>
                  <p className="text-sm text-gray-500 mt-1">{filteredItems.length} items</p>
                </div>
                <button
                  onClick={startNewItem}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-medium">KES {item.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="font-serif text-2xl">Settings</h1>
                {editingSettings ? (
                  <div className="flex gap-2">
                    <button onClick={handleSaveSettings} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Save</button>
                    <button onClick={() => { setSettings(getSettings()); setEditingSettings(false); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingSettings(true)} className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm">Edit</button>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Logo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        {settings.logo?.startsWith('data:') ? (
                          <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <button
                        onClick={() => logoInputRef.current?.click()}
                        disabled={!editingSettings}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm disabled:opacity-50"
                      >
                        Upload
                      </button>
                      <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Business Name</label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      disabled={!editingSettings}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">WhatsApp</label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      disabled={!editingSettings}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Phone</label>
                    <input
                      type="text"
                      value={settings.mpesaNumber}
                      onChange={(e) => setSettings({ ...settings, mpesaNumber: e.target.value })}
                      disabled={!editingSettings}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Location</label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                      disabled={!editingSettings}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Hours</label>
                    <input
                      type="text"
                      value={settings.operatingHours}
                      onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                      disabled={!editingSettings}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lock Control */}
          {activeTab === 'lock' && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl">Lock Control</h1>
              
              <div className={`p-6 rounded-lg border ${
                lockState.isLocked ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    lockState.isLocked ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    {lockState.isLocked ? <Lock className="w-5 h-5 text-white" /> : <Unlock className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{lockState.isLocked ? 'Site Locked' : 'Site Active'}</h3>
                    {lockState.isLocked && <p className="text-sm text-gray-600 mt-1">{lockState.message}</p>}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Lock Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Lock className="w-6 h-6 text-red-500 mb-4" />
                  <h3 className="font-medium mb-1">Lock Site</h3>
                  <p className="text-sm text-gray-500 mb-4">Block all user access</p>
                  
                  <div className="space-y-4">
                    <textarea
                      value={lockMessage}
                      onChange={(e) => setLockMessage(e.target.value)}
                      placeholder="Lock message..."
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm"
                    />
                    <select
                      value={lockDays}
                      onChange={(e) => setLockDays(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm"
                    >
                      <option value="1">1 day</option>
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                    </select>
                    <button
                      onClick={lockSite}
                      disabled={lockState.isLocked}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                    >
                      Lock Now
                    </button>
                  </div>
                </div>

                {/* Unlock Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Unlock className="w-6 h-6 text-green-500 mb-4" />
                  <h3 className="font-medium mb-1">Unlock Site</h3>
                  <p className="text-sm text-gray-500 mb-4">Restore access</p>
                  
                  <button
                    onClick={unlockSite}
                    disabled={!lockState.isLocked}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    Unlock Now
                  </button>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Need help? <a href="tel:+254775269628" className="font-medium text-orange-600 hover:underline">+254775269628</a></span>
                  <span className="text-gray-300 hidden sm:inline">|</span>
                  <a href="https://bizwaziri-clean.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 hover:underline">Bizwaziri</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gray-900 dark:bg-white p-4 flex justify-between sticky top-0">
              <h3 className="text-white dark:text-gray-900 font-medium">{newItem ? 'Add Item' : 'Edit Item'}</h3>
              <button onClick={() => setEditingItem(null)}><X className="w-5 h-5 text-white dark:text-gray-900" /></button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Name *</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Price *</label>
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Description</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Image</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {editingItem.image ? 'Change' : 'Upload'}
                    </button>
                    {editingItem.image && (
                      <img src={editingItem.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Labels</label>
                  <div className="flex flex-wrap gap-2">
                    {['Popular', 'Chef Special'].map(label => (
                      <button
                        key={label}
                        onClick={() => toggleLabel(label)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          editingItem.labels?.includes(label) ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSaveItem}
                    disabled={!editingItem.name || !editingItem.price}
                    className="flex-1 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium disabled:opacity-50"
                  >
                    {newItem ? 'Add' : 'Save'}
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}