// import { useCart } from '../../context/CartContext';
// import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
// import { Link } from 'react-router';

// export function Cart() {
//   const { cart, removeFromCart, updateQuantity, total } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
//         <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-700 mb-6" />
//         <h2 className="font-['Poppins'] font-bold text-3xl text-[#212121] dark:text-[#F5F5F5] mb-3">
//           Your Cart is Empty
//         </h2>
//         <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-8">
//           Start adding some delicious items!
//         </p>
//         <Link
//           to="/menu"
//           className="bg-[#FF6B35] text-white px-8 py-4 rounded-xl hover:bg-[#E55A2B] transition-colors font-['Poppins'] font-bold"
//         >
//           Browse Menu
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#1A1A1A] py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="font-['Poppins'] font-bold text-4xl text-[#212121] dark:text-[#F5F5F5] mb-8">
//           Your Cart
//         </h1>

//         <div className="bg-white dark:bg-[#2A2A2A] rounded-xl shadow-lg p-6 mb-6">
//           {cart.map((item) => (
//             <div 
//               key={item.id}
//               className="flex gap-4 py-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
//             >
//               <img 
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
//               />
              
//               <div className="flex-1">
//                 <h3 className="font-['Poppins'] font-bold text-lg text-[#212121] dark:text-[#F5F5F5] mb-1">
//                   {item.name}
//                 </h3>
//                 <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400 mb-3">
//                   KES {item.price} each
//                 </p>
                
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="font-['Poppins'] font-semibold text-lg w-8 text-center">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
                  
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="ml-auto p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="text-right">
//                 <p className="font-['Poppins'] font-bold text-xl text-[#FF6B35]">
//                   KES {item.price * item.quantity}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white dark:bg-[#2A2A2A] rounded-xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
//             <span className="font-['Poppins'] font-bold text-2xl text-[#212121] dark:text-[#F5F5F5]">
//               Total
//             </span>
//             <span className="font-['Poppins'] font-bold text-3xl text-[#FF6B35]">
//               KES {total}
//             </span>
//           </div>
          
//           <Link
//             to="/checkout"
//             className="w-full block text-center bg-[#FF6B35] text-white px-8 py-4 rounded-xl hover:bg-[#E55A2B] transition-colors font-['Poppins'] font-bold text-lg"
//           >
//             Proceed to Checkout
//           </Link>
          
//           <Link
//             to="/menu"
//             className="w-full block text-center mt-3 text-[#FF6B35] hover:text-[#E55A2B] transition-colors font-['Poppins'] font-semibold"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Clock, Shield, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[80vh] flex flex-col items-center justify-center px-4"
      >
        <div className="max-w-md w-full text-center">
          <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600" />
          </div>
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added anything to your cart yet. Browse our menu and find something delicious!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-4 rounded-xl font-medium transition-all hover:scale-105"
          >
            Browse Menu
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white">
              Your Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {itemCount} item{itemCount !== 1 ? 's' : ''} • KES {total}
            </p>
          </div>
          <Link
            to="/menu"
            className="text-[#FF6B35] hover:text-[#E55A2B] font-medium flex items-center gap-1"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  {/* Image */}
                  <div className="sm:w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-[#FF6B35] whitespace-nowrap">
                        KES {item.price * item.quantity}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              {/* Items Summary */}
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      KES {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

              {/* Totals */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    KES {total}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                  <span className="text-green-600 font-medium">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg text-gray-900 dark:text-white">
                    Estimated Total
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#FF6B35]">
                    KES {total}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-4 rounded-xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </Link>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Truck className="w-4 h-4 text-[#FF6B35]" />
                  <span>Free delivery over KES 1,500</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  <span>30-45 min delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-[#FF6B35]" />
                  <span>Secure checkout via WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}