// import { useState, useEffect } from 'react';
// import { Plus, Search, Grid, List, Info, X, Clock, Flame, ChevronRight, Check } from 'lucide-react';
// import { getMenuItems } from '../../utils/storage';
// import { useCart } from '../../context/CartContext';
// import { toast } from 'sonner';
// import { Toaster } from '../components/ui/sonner';

// export function Menu() {
//   const [menuItems, setMenuItems] = useState(getMenuItems());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setMenuItems(getMenuItems());
//     };
//     window.addEventListener('storage', handleStorageChange);
//     const interval = setInterval(handleStorageChange, 1000);
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const categories = [
//     { id: 'all', label: 'All Items' },
//     { id: 'food', label: 'Food' },
//     { id: 'drinks', label: 'Drinks' },
//   ];

//   const filteredItems = menuItems.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleAddToCart = (item: any, e: React.MouseEvent) => {
//     e.stopPropagation();
//     addToCart(item);
//     setAddedItems(prev => {
//       const newSet = new Set(prev);
//       newSet.add(item.id);
//       return newSet;
//     });
//     setTimeout(() => {
//       setAddedItems(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(item.id);
//         return newSet;
//       });
//     }, 1500);
    
//     toast.success(`${item.name} added to cart`, {
//       duration: 2000,
//       position: 'bottom-center',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
//       <Toaster position="bottom-center" />
      
//       {/* Header */}
//       <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-900">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex items-end justify-between">
//             <div className="space-y-1">
//               <h1 className="font-serif text-4xl md:text-5xl text-gray-900 dark:text-white tracking-tight">
//                 Menu
//               </h1>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {filteredItems.length} items available
//               </p>
//             </div>
//             <div className="hidden md:flex items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-gray-400" />
//                 <span className="text-sm text-gray-600 dark:text-gray-400">15-25 min</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Controls */}
//       <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
//             {/* Search */}
//             <div className="relative w-full md:w-96">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search menu..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-9 pr-9 py-2.5 text-sm bg-gray-100 dark:bg-gray-900 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 placeholder:text-gray-400 text-gray-900 dark:text-white"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>

//             {/* View Toggle */}
//             <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg w-fit">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 rounded-md transition-all ${
//                   viewMode === 'grid'
//                     ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
//                     : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 <Grid className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2 rounded-md transition-all ${
//                   viewMode === 'list'
//                     ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
//                     : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 <List className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Categories */}
//           <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mt-4 pb-1">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setActiveCategory(category.id)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                   activeCategory === category.id
//                     ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
//                     : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//                 }`}
//               >
//                 {category.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Menu Items */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {filteredItems.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
//               <Search className="w-5 h-5 text-gray-400" />
//             </div>
//             <h3 className="font-medium text-gray-900 dark:text-white mb-1">No items found</h3>
//             <p className="text-sm text-gray-500">Try adjusting your search</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-sm text-gray-500">
//                 Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
//               </p>
//             </div>

//             <div className={
//               viewMode === 'grid' 
//                 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
//                 : 'space-y-3'
//             }>
//               {filteredItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className={`group bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer ${
//                     viewMode === 'grid' 
//                       ? 'rounded-xl overflow-hidden' 
//                       : 'flex gap-4 p-3 rounded-xl'
//                   }`}
//                   onClick={() => setSelectedItem(item)}
//                 >
//                   {/* Image */}
//                   <div className={`relative ${
//                     viewMode === 'grid' 
//                       ? 'aspect-square' 
//                       : 'w-24 h-24 flex-shrink-0'
//                   }`}>
//                     <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
//                       {item.image ? (
//                         <img 
//                           src={item.image} 
//                           alt={item.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <span className="text-2xl text-gray-400">🍽️</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {item.labels?.includes('Popular') && (
//                       <div className="absolute top-2 left-2">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-md text-xs font-medium">
//                           <Flame className="w-3 h-3 text-orange-500" />
//                           <span className="text-gray-900 dark:text-white">Popular</span>
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Content */}
//                   <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 flex flex-col justify-center'}>
//                     <div className="flex items-start justify-between gap-2 mb-1">
//                       <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
//                         {item.name}
//                       </h3>
//                       <span className="font-medium text-gray-900 dark:text-white tabular-nums whitespace-nowrap">
//                         KES {item.price}
//                       </span>
//                     </div>
                    
//                     <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
//                       {item.description}
//                     </p>
                    
//                     {item.nutrition && (
//                       <div className="flex items-center gap-2 mb-3">
//                         <span className="text-xs text-gray-400">
//                           {item.nutrition.calories} cal
//                         </span>
//                         <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
//                         <span className="text-xs text-gray-400">
//                           {item.nutrition.protein}g protein
//                         </span>
//                       </div>
//                     )}
                    
//                     <button
//                       onClick={(e) => handleAddToCart(item, e)}
//                       className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
//                         addedItems.has(item.id)
//                           ? 'bg-green-600 text-white'
//                           : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
//                       }`}
//                     >
//                       {addedItems.has(item.id) ? (
//                         <>
//                           <Check className="w-4 h-4" />
//                           Added
//                         </>
//                       ) : (
//                         <>
//                           <Plus className="w-4 h-4" />
//                           Add
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Item Detail Modal */}
//       {selectedItem && (
//         <div 
//           className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
//           onClick={() => setSelectedItem(null)}
//         >
//           <div 
//             className="absolute inset-0 bg-black/40 dark:bg-black/60"
//             onClick={() => setSelectedItem(null)}
//           />
          
//           <div 
//             className="relative bg-white dark:bg-[#0A0A0A] w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedItem(null)}
//               className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-900 dark:text-white" />
//             </button>

//             {/* Image */}
//             <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-900">
//               {selectedItem.image ? (
//                 <img 
//                   src={selectedItem.image} 
//                   alt={selectedItem.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <span className="text-6xl text-gray-400">🍽️</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Content */}
//             <div className="p-6">
//               <div className="space-y-6">
//                 <div>
//                   <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
//                     {selectedItem.name}
//                   </h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                     {selectedItem.description}
//                   </p>
//                 </div>
                
//                 {/* Nutritional Info */}
//                 {selectedItem.nutrition && (
//                   <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5">
//                     <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
//                       Nutritional Information
//                     </h3>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">
//                           {selectedItem.nutrition.calories}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">
//                           {selectedItem.nutrition.protein}g
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">
//                           {selectedItem.nutrition.carbs}g
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">Fats</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">
//                           {selectedItem.nutrition.fats}g
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Price & Action */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</p>
//                     <p className="font-serif text-2xl text-gray-900 dark:text-white">
//                       KES {selectedItem.price}
//                     </p>
//                   </div>
                  
//                   <button
//                     onClick={(e) => {
//                       handleAddToCart(selectedItem, e);
//                       setSelectedItem(null);
//                     }}
//                     className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all font-medium rounded-lg text-sm"
//                   >
//                     Add to order
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Plus, Search, Grid, List, Info, X, Clock, Flame, ChevronRight, Check } from 'lucide-react';
import { getMenuItems, getCategories } from '../../utils/storage';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

export function Menu() {
  const [menuItems, setMenuItems] = useState(getMenuItems());
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  useEffect(() => {
    const handleStorageChange = () => {
      setMenuItems(getMenuItems());
      
      // Load categories dynamically
      const allCategories = getCategories();
      const formatted = allCategories
        .filter(c => c.isActive && c.id !== 'all' && c.id !== 'popular')
        .map(c => ({ id: c.id, label: c.name }));
      setCategories([
        { id: 'all', label: 'All Items' },
        ...formatted
      ]);
    };
    
    handleStorageChange();
    
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    setAddedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(item.id);
      return newSet;
    });
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 1500);
    
    toast.success(`${item.name} added to cart`, {
      duration: 2000,
      position: 'bottom-center',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      <Toaster position="bottom-center" />
      
      {/* Header */}
      <div className="bg-white dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 dark:text-white tracking-tight">
                Menu
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredItems.length} items available
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">15-25 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-sm bg-gray-100 dark:bg-gray-900 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 placeholder:text-gray-400 text-gray-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg w-fit">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories - Now Dynamic */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mt-4 pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">No items found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-3'
            }>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'rounded-xl overflow-hidden' 
                      : 'flex gap-4 p-3 rounded-xl'
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Image */}
                  <div className={`relative ${
                    viewMode === 'grid' 
                      ? 'aspect-square' 
                      : 'w-24 h-24 flex-shrink-0'
                  }`}>
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl text-gray-400">🍽️</span>
                        </div>
                      )}
                    </div>
                    
                    {item.labels?.includes('Popular') && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-md text-xs font-medium">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span className="text-gray-900 dark:text-white">Popular</span>
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 flex flex-col justify-center'}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h3>
                      <span className="font-medium text-gray-900 dark:text-white tabular-nums whitespace-nowrap">
                        KES {item.price}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    
                    {item.nutrition && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-400">
                          {item.nutrition.calories} cal
                        </span>
                        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                        <span className="text-xs text-gray-400">
                          {item.nutrition.protein}g protein
                        </span>
                      </div>
                    )}
                    
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                        addedItems.has(item.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {addedItems.has(item.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="absolute inset-0 bg-black/40 dark:bg-black/60"
            onClick={() => setSelectedItem(null)}
          />
          
          <div 
            className="relative bg-white dark:bg-[#0A0A0A] w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black transition-colors"
            >
              <X className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>

            {/* Image */}
            <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-900">
              {selectedItem.image ? (
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl text-gray-400">🍽️</span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
                    {selectedItem.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
                
                {/* Nutritional Info */}
                {selectedItem.nutrition && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Nutritional Information
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedItem.nutrition.calories}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedItem.nutrition.protein}g
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedItem.nutrition.carbs}g
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fats</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {selectedItem.nutrition.fats}g
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</p>
                    <p className="font-serif text-2xl text-gray-900 dark:text-white">
                      KES {selectedItem.price}
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      handleAddToCart(selectedItem, e);
                      setSelectedItem(null);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all font-medium rounded-lg text-sm"
                  >
                    Add to order
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}