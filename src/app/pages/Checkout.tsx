// // import { useState } from 'react';
// // import { useCart } from '../../context/CartContext';
// // import { useNavigate } from 'react-router';
// // import { getSettings } from '../../utils/storage';
// // import { CreditCard, Phone, MessageCircle, Check } from 'lucide-react';
// // import { toast } from 'sonner';
// // import { Toaster } from '../components/ui/sonner';

// // export function Checkout() {
// //   const { cart, total, clearCart } = useCart();
// //   const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'paypal' | null>(null);
// //   const [phone, setPhone] = useState('');
// //   const [name, setName] = useState('');
// //   const [deliveryAddress, setDeliveryAddress] = useState('');
// //   const [orderConfirmed, setOrderConfirmed] = useState(false);
// //   const navigate = useNavigate();
// //   const settings = getSettings();

// //   if (cart.length === 0) {
// //     navigate('/cart');
// //     return null;
// //   }

// //   const handleMpesaPayment = () => {
// //     if (!phone || !name || !deliveryAddress) {
// //       toast.error('Please fill in all delivery details');
// //       return;
// //     }

// //     // Generate order summary for WhatsApp
// //     const orderItems = cart.map(item => 
// //       `${item.quantity}x ${item.name} - KES ${item.price * item.quantity}`
// //     ).join('\n');

// //     const message = encodeURIComponent(
// //       `🛒 NEW ORDER from ${name}\n\n` +
// //       `📱 Phone: ${phone}\n` +
// //       `📍 Delivery: ${deliveryAddress}\n\n` +
// //       `ORDER DETAILS:\n${orderItems}\n\n` +
// //       `💰 TOTAL: KES ${total}\n\n` +
// //       `💳 Payment Method: M-Pesa\n` +
// //       `M-Pesa Number: ${settings.mpesaNumber}\n\n` +
// //       `Please confirm this order!`
// //     );

// //     window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
// //     setOrderConfirmed(true);
// //   };

// //   const handlePayPalPayment = () => {
// //     if (!name || !deliveryAddress) {
// //       toast.error('Please fill in all delivery details');
// //       return;
// //     }

// //     const orderItems = cart.map(item => 
// //       `${item.quantity}x ${item.name} - KES ${item.price * item.quantity}`
// //     ).join('\n');

// //     const message = encodeURIComponent(
// //       `🛒 NEW ORDER from ${name}\n\n` +
// //       `📍 Delivery: ${deliveryAddress}\n\n` +
// //       `ORDER DETAILS:\n${orderItems}\n\n` +
// //       `💰 TOTAL: KES ${total}\n\n` +
// //       `💳 Payment Method: PayPal\n\n` +
// //       `Please send PayPal payment instructions!`
// //     );

// //     window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
// //     setOrderConfirmed(true);
// //   };

// //   if (orderConfirmed) {
// //     return (
// //       <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
// //         <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
// //           <Check className="w-12 h-12 text-green-600" />
// //         </div>
// //         <h2 className="font-['Poppins'] font-bold text-3xl text-[#212121] dark:text-[#F5F5F5] mb-3 text-center">
// //           Order Sent!
// //         </h2>
// //         <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
// //           Your order details have been sent to our team via WhatsApp. 
// //           They'll confirm your order and payment shortly!
// //         </p>
// //         <button
// //           onClick={() => {
// //             clearCart();
// //             navigate('/');
// //           }}
// //           className="bg-[#FF6B35] text-white px-8 py-4 rounded-xl hover:bg-[#E55A2B] transition-colors font-['Poppins'] font-bold"
// //         >
// //           Back to Home
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-[#1A1A1A] py-8 px-4">
// //       <Toaster position="top-center" />
      
// //       <div className="max-w-4xl mx-auto">
// //         <h1 className="font-['Poppins'] font-bold text-4xl text-[#212121] dark:text-[#F5F5F5] mb-8">
// //           Checkout
// //         </h1>

// //         <div className="grid md:grid-cols-3 gap-6">
// //           {/* Left Column - Forms */}
// //           <div className="md:col-span-2 space-y-6">
// //             {/* Delivery Details */}
// //             <div className="bg-white dark:bg-[#2A2A2A] rounded-xl shadow-lg p-6">
// //               <h2 className="font-['Poppins'] font-bold text-2xl text-[#212121] dark:text-[#F5F5F5] mb-6">
// //                 Delivery Details
// //               </h2>
              
// //               <div className="space-y-4">
// //                 <div>
// //                   <label className="font-['Inter'] text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
// //                     Full Name *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     placeholder="John Doe"
// //                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-['Inter']"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="font-['Inter'] text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
// //                     Phone Number *
// //                   </label>
// //                   <input
// //                     type="tel"
// //                     value={phone}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                     placeholder="0712345678"
// //                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-['Inter']"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="font-['Inter'] text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
// //                     Delivery Address *
// //                   </label>
// //                   <textarea
// //                     value={deliveryAddress}
// //                     onChange={(e) => setDeliveryAddress(e.target.value)}
// //                     placeholder="House number, street name, area..."
// //                     rows={3}
// //                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-['Inter']"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Payment Method */}
// //             <div className="bg-white dark:bg-[#2A2A2A] rounded-xl shadow-lg p-6">
// //               <h2 className="font-['Poppins'] font-bold text-2xl text-[#212121] dark:text-[#F5F5F5] mb-6">
// //                 Payment Method
// //               </h2>

// //               <div className="space-y-4">
// //                 {/* M-Pesa Option */}
// //                 <button
// //                   onClick={() => setPaymentMethod('mpesa')}
// //                   className={`w-full p-6 rounded-xl border-2 transition-all ${
// //                     paymentMethod === 'mpesa'
// //                       ? 'border-[#4CAF50] bg-green-50 dark:bg-green-900/20'
// //                       : 'border-gray-300 dark:border-gray-700 hover:border-[#4CAF50]'
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center">
// //                       <Phone className="w-6 h-6 text-white" />
// //                     </div>
// //                     <div className="text-left flex-1">
// //                       <h3 className="font-['Poppins'] font-bold text-lg text-[#212121] dark:text-[#F5F5F5]">
// //                         M-Pesa (Pochi La Biashara)
// //                       </h3>
// //                       <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
// //                         Pay via M-Pesa to {settings.mpesaNumber}
// //                       </p>
// //                     </div>
// //                     {paymentMethod === 'mpesa' && (
// //                       <Check className="w-6 h-6 text-[#4CAF50]" />
// //                     )}
// //                   </div>
// //                 </button>

// //                 {paymentMethod === 'mpesa' && (
// //                   <div className="bg-green-50 dark:bg-green-900/20 border border-[#4CAF50] rounded-lg p-4">
// //                     <h4 className="font-['Poppins'] font-semibold text-sm mb-2">M-Pesa Payment Instructions:</h4>
// //                     <ol className="font-['Inter'] text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
// //                       <li>Go to M-Pesa menu</li>
// //                       <li>Select Lipa na M-Pesa</li>
// //                       <li>Choose Pochi La Biashara</li>
// //                       <li>Enter number: <strong>{settings.mpesaNumber}</strong></li>
// //                       <li>Enter amount: <strong>KES {total}</strong></li>
// //                       <li>Confirm payment and send us the confirmation message</li>
// //                     </ol>
// //                   </div>
// //                 )}

// //                 {/* PayPal Option */}
// //                 <button
// //                   onClick={() => setPaymentMethod('paypal')}
// //                   className={`w-full p-6 rounded-xl border-2 transition-all ${
// //                     paymentMethod === 'paypal'
// //                       ? 'border-[#0070BA] bg-blue-50 dark:bg-blue-900/20'
// //                       : 'border-gray-300 dark:border-gray-700 hover:border-[#0070BA]'
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 bg-[#0070BA] rounded-full flex items-center justify-center">
// //                       <CreditCard className="w-6 h-6 text-white" />
// //                     </div>
// //                     <div className="text-left flex-1">
// //                       <h3 className="font-['Poppins'] font-bold text-lg text-[#212121] dark:text-[#F5F5F5]">
// //                         PayPal
// //                       </h3>
// //                       <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
// //                         Secure international payment
// //                       </p>
// //                     </div>
// //                     {paymentMethod === 'paypal' && (
// //                       <Check className="w-6 h-6 text-[#0070BA]" />
// //                     )}
// //                   </div>
// //                 </button>

// //                 {paymentMethod === 'paypal' && (
// //                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-[#0070BA] rounded-lg p-4">
// //                     <p className="font-['Inter'] text-sm text-gray-700 dark:text-gray-300">
// //                       Click "Complete Order" to contact us via WhatsApp. We'll send you PayPal payment instructions and our PayPal account details.
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Column - Order Summary */}
// //           <div className="md:col-span-1">
// //             <div className="bg-white dark:bg-[#2A2A2A] rounded-xl shadow-lg p-6 sticky top-24">
// //               <h2 className="font-['Poppins'] font-bold text-xl text-[#212121] dark:text-[#F5F5F5] mb-4">
// //                 Order Summary
// //               </h2>
              
// //               <div className="space-y-3 mb-6">
// //                 {cart.map((item) => (
// //                   <div key={item.id} className="flex justify-between text-sm">
// //                     <span className="font-['Inter'] text-gray-600 dark:text-gray-400">
// //                       {item.quantity}x {item.name}
// //                     </span>
// //                     <span className="font-['Poppins'] font-semibold">
// //                       KES {item.price * item.quantity}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
// //                 <div className="flex justify-between items-center">
// //                   <span className="font-['Poppins'] font-bold text-xl text-[#212121] dark:text-[#F5F5F5]">
// //                     Total
// //                   </span>
// //                   <span className="font-['Poppins'] font-bold text-2xl text-[#FF6B35]">
// //                     KES {total}
// //                   </span>
// //                 </div>
// //               </div>
              
// //               <button
// //                 onClick={paymentMethod === 'mpesa' ? handleMpesaPayment : handlePayPalPayment}
// //                 disabled={!paymentMethod}
// //                 className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] text-white px-6 py-4 rounded-xl hover:bg-[#E55A2B] transition-colors font-['Poppins'] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 <MessageCircle className="w-5 h-5" />
// //                 Complete Order
// //               </button>
              
// //               <p className="font-['Inter'] text-xs text-center text-gray-500 dark:text-gray-500 mt-4">
// //                 Your order will be confirmed via WhatsApp
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import { useState, useEffect } from 'react';
// import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router';
// import { getSettings } from '../../utils/storage';
// import { 
//   CreditCard, Phone, MessageCircle, Check, MapPin, Truck, Clock, 
//   ArrowLeft, Lock, User, Mail, Home, ShoppingBag, ChevronRight // Add ShoppingBag and ChevronRight
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { Toaster } from '../components/ui/sonner';
// import { motion, AnimatePresence } from 'framer-motion';

// export function Checkout() {
//   const { cart, total, clearCart } = useCart();
//   const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cash' | null>(null);
//   const [phone, setPhone] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [deliveryAddress, setDeliveryAddress] = useState('');
//   const [deliveryInstructions, setDeliveryInstructions] = useState('');
//   const [isTakeaway, setIsTakeaway] = useState(false);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);
//   const [orderNumber, setOrderNumber] = useState('');
//   const [step, setStep] = useState(1);
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   const navigate = useNavigate();
//   const settings = getSettings();

//   // Delivery fee (simplified)
//   const deliveryFee = isTakeaway ? 0 : 100;
//   const subtotal = total;
//   const grandTotal = subtotal + deliveryFee;

//   useEffect(() => {
//     if (cart.length === 0) {
//       navigate('/cart');
//     }
//   }, [cart, navigate]);

//   const validateStep1 = () => {
//     if (!name.trim()) {
//       toast.error('Please enter your name');
//       return false;
//     }
//     if (!phone.trim() || phone.length < 10) {
//       toast.error('Please enter a valid phone number');
//       return false;
//     }
//     if (email && !email.includes('@')) {
//       toast.error('Please enter a valid email address');
//       return false;
//     }
//     return true;
//   };

//   const validateStep2 = () => {
//     if (!isTakeaway && !deliveryAddress.trim()) {
//       toast.error('Please enter your delivery address');
//       return false;
//     }
//     return true;
//   };

//   const validateStep3 = () => {
//     if (!paymentMethod) {
//       toast.error('Please select a payment method');
//       return false;
//     }
//     return true;
//   };

//   const handleNextStep = () => {
//     if (step === 1 && validateStep1()) {
//       setStep(2);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else if (step === 2 && validateStep2()) {
//       setStep(3);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handlePrevStep = () => {
//     setStep(step - 1);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePlaceOrder = () => {
//     if (!validateStep3()) return;

//     setIsProcessing(true);

//     try {
//       // Generate order number
//       const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`;
//       setOrderNumber(newOrderNumber);

//       // Prepare WhatsApp message
//       const orderItems = cart.map(item => 
//         `${item.quantity}x ${item.name} - KES ${item.price * item.quantity}`
//       ).join('\n');

//       const message = encodeURIComponent(
//         `🛒 *NEW ORDER #${newOrderNumber}*\n\n` +
//         `👤 *Customer:* ${name}\n` +
//         `📱 *Phone:* ${phone}\n` +
//         `${email ? `✉️ *Email:* ${email}\n` : ''}` +
//         `📍 *${isTakeaway ? 'Takeaway' : 'Delivery'}*${!isTakeaway && deliveryAddress ? `\n📮 *Address:* ${deliveryAddress}` : ''}\n` +
//         `${deliveryInstructions ? `📝 *Instructions:* ${deliveryInstructions}\n` : ''}\n` +
//         `━━━━━━━━━━━━━━━━━━\n` +
//         `*ORDER DETAILS*\n` +
//         `${orderItems}\n` +
//         `━━━━━━━━━━━━━━━━━━\n` +
//         `*Subtotal:* KES ${subtotal}\n` +
//         `*Delivery:* ${deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}\n` +
//         `*TOTAL:* KES ${grandTotal}\n` +
//         `━━━━━━━━━━━━━━━━━━\n` +
//         `*Payment Method:* ${paymentMethod === 'mpesa' ? 'M-PESA' : 'Cash on Delivery'}\n` +
//         `${paymentMethod === 'mpesa' ? `\n📱 M-PESA Number: ${settings.mpesaNumber}` : ''}\n\n` +
//         `Please confirm this order. Thank you!`
//       );

//       // Open WhatsApp
//       window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
      
//       setOrderConfirmed(true);
//       clearCart();
      
//       toast.success('Order placed successfully!');
//     } catch (error) {
//       toast.error('Failed to place order. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (orderConfirmed) {
//     return (
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12"
//       >
//         <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
//           <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
//           </div>
          
//           <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-3">
//             Order Placed!
//           </h2>
          
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             Your order has been sent successfully.
//           </p>
          
//           <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
//             <p className="font-mono text-xl font-bold text-[#FF6B35]">{orderNumber}</p>
//           </div>
          
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//             We've sent your order details via WhatsApp. Our team will confirm shortly.
//           </p>
          
//           <div className="space-y-3">
//             <button
//               onClick={() => navigate('/')}
//               className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-xl font-medium transition-colors"
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
//       <Toaster position="top-center" />
      
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white">
//             Checkout
//           </h1>
//           <button
//             onClick={() => navigate('/cart')}
//             className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Cart
//           </button>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex items-center justify-center mb-8">
//           <div className="flex items-center">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//               step >= 1 ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
//             }`}>
//               1
//             </div>
//             <div className={`w-16 h-1 ${
//               step >= 2 ? 'bg-[#FF6B35]' : 'bg-gray-200 dark:bg-gray-700'
//             }`} />
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//               step >= 2 ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
//             }`}>
//               2
//             </div>
//             <div className={`w-16 h-1 ${
//               step >= 3 ? 'bg-[#FF6B35]' : 'bg-gray-200 dark:bg-gray-700'
//             }`} />
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//               step >= 3 ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
//             }`}>
//               3
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column - Forms */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Step 1: Customer Details */}
//             <AnimatePresence mode="wait">
//               {step === 1 && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
//                 >
//                   <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//                     <User className="w-5 h-5 text-[#FF6B35]" />
//                     Your Details
//                   </h2>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="John Doe"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Phone Number *
//                       </label>
//                       <input
//                         type="tel"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         placeholder="0712345678"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Email (Optional)
//                       </label>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="john@example.com"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Step 2: Delivery */}
//               {step === 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="space-y-6"
//                 >
//                   {/* Delivery Type */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//                     <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//                       <Truck className="w-5 h-5 text-[#FF6B35]" />
//                       Delivery Options
//                     </h2>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <button
//                         onClick={() => setIsTakeaway(false)}
//                         className={`p-4 rounded-xl border-2 transition-all ${
//                           !isTakeaway
//                             ? 'border-[#FF6B35] bg-[#FF6B35]/5'
//                             : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
//                         }`}
//                       >
//                         <Truck className={`w-6 h-6 mx-auto mb-2 ${
//                           !isTakeaway ? 'text-[#FF6B35]' : 'text-gray-400'
//                         }`} />
//                         <span className={`text-sm font-medium ${
//                           !isTakeaway ? 'text-[#FF6B35]' : 'text-gray-600 dark:text-gray-400'
//                         }`}>
//                           Delivery
//                         </span>
//                       </button>

//                       <button
//                         onClick={() => setIsTakeaway(true)}
//                         className={`p-4 rounded-xl border-2 transition-all ${
//                           isTakeaway
//                             ? 'border-[#FF6B35] bg-[#FF6B35]/5'
//                             : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
//                         }`}
//                       >
//                         <Home className={`w-6 h-6 mx-auto mb-2 ${
//                           isTakeaway ? 'text-[#FF6B35]' : 'text-gray-400'
//                         }`} />
//                         <span className={`text-sm font-medium ${
//                           isTakeaway ? 'text-[#FF6B35]' : 'text-gray-600 dark:text-gray-400'
//                         }`}>
//                           Takeaway
//                         </span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Delivery Address */}
//                   {!isTakeaway && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
//                     >
//                       <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//                         <MapPin className="w-5 h-5 text-[#FF6B35]" />
//                         Delivery Address
//                       </h3>
                      
//                       <div className="space-y-4">
//                         <textarea
//                           value={deliveryAddress}
//                           onChange={(e) => setDeliveryAddress(e.target.value)}
//                           placeholder="House number, street name, estate, landmark..."
//                           rows={3}
//                           className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
//                         />

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Delivery Instructions (Optional)
//                           </label>
//                           <textarea
//                             value={deliveryInstructions}
//                             onChange={(e) => setDeliveryInstructions(e.target.value)}
//                             placeholder="e.g., Gate code, landmark, special instructions..."
//                             rows={2}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
//                           />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               )}

//               {/* Step 3: Payment */}
//               {step === 3 && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
//                 >
//                   <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
//                     <CreditCard className="w-5 h-5 text-[#FF6B35]" />
//                     Payment Method
//                   </h2>

//                   <div className="space-y-4">
//                     {/* M-PESA Option */}
//                     <button
//                       onClick={() => setPaymentMethod('mpesa')}
//                       className={`w-full p-4 rounded-xl border-2 transition-all ${
//                         paymentMethod === 'mpesa'
//                           ? 'border-[#FF6B35] bg-[#FF6B35]/5'
//                           : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
//                       }`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                           <Phone className="w-6 h-6 text-green-600" />
//                         </div>
//                         <div className="flex-1 text-left">
//                           <h3 className="font-medium text-gray-900 dark:text-white">
//                             M-PESA
//                           </h3>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                             Pay via M-PESA to {settings.mpesaNumber}
//                           </p>
//                         </div>
//                         {paymentMethod === 'mpesa' && (
//                           <Check className="w-5 h-5 text-[#FF6B35]" />
//                         )}
//                       </div>
//                     </button>

//                     {/* Cash Option */}
//                     <button
//                       onClick={() => setPaymentMethod('cash')}
//                       className={`w-full p-4 rounded-xl border-2 transition-all ${
//                         paymentMethod === 'cash'
//                           ? 'border-[#FF6B35] bg-[#FF6B35]/5'
//                           : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
//                       }`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                           <CreditCard className="w-6 h-6 text-gray-600" />
//                         </div>
//                         <div className="flex-1 text-left">
//                           <h3 className="font-medium text-gray-900 dark:text-white">
//                             Cash on Delivery
//                           </h3>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                             Pay with cash when your order arrives
//                           </p>
//                         </div>
//                         {paymentMethod === 'cash' && (
//                           <Check className="w-5 h-5 text-[#FF6B35]" />
//                         )}
//                       </div>
//                     </button>

//                     {paymentMethod === 'mpesa' && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
//                       >
//                         <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
//                           M-PESA Payment Details
//                         </h4>
//                         <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
//                           <p>📱 Till Number: {settings.mpesaNumber}</p>
//                           <p className="mt-2 text-xs italic">
//                             Send payment to this number and we'll confirm your order.
//                           </p>
//                         </div>
//                       </motion.div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
//               <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//                 <ShoppingBag className="w-5 h-5 text-[#FF6B35]" />
//                 Order Summary
//               </h2>

//               {/* Items */}
//               <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
//                 {cart.map((item) => (
//                   <div key={item.id} className="flex justify-between text-sm">
//                     <span className="text-gray-600 dark:text-gray-400">
//                       {item.quantity}x {item.name}
//                     </span>
//                     <span className="font-medium text-gray-900 dark:text-white">
//                       KES {item.price * item.quantity}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Divider */}
//               <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

//               {/* Totals */}
//               <div className="space-y-2 mb-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//                   <span className="font-medium text-gray-900 dark:text-white">
//                     KES {subtotal}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600 dark:text-gray-400">Delivery</span>
//                   <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
//                     {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
//                   </span>
//                 </div>
//               </div>

//               {/* Total */}
//               <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-lg text-gray-900 dark:text-white">
//                     Total
//                   </span>
//                   <span className="font-serif text-2xl font-bold text-[#FF6B35]">
//                     KES {grandTotal}
//                   </span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-3">
//                 {step < 3 ? (
//                   <button
//                     onClick={handleNextStep}
//                     className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
//                   >
//                     Continue
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handlePlaceOrder}
//                     disabled={isProcessing}
//                     className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                   >
//                     {isProcessing ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <Lock className="w-4 h-4" />
//                         Place Order
//                       </>
//                     )}
//                   </button>
//                 )}

//                 {step > 1 && (
//                   <button
//                     onClick={handlePrevStep}
//                     className="w-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back
//                   </button>
//                 )}
//               </div>

//               {/* Security Note */}
//               <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
//                 <Lock className="w-3 h-3" />
//                 Your order will be confirmed via WhatsApp
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router';
import { getSettings } from '../../utils/storage';
import { 
  CreditCard, Phone, MessageCircle, Check, MapPin, Truck, Clock, 
  ArrowLeft, Lock, User, Mail, Home, ShoppingBag, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

export function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'mpesa-paybill' | 'mpesa-till' | 'mpesa-pochi' | 'cash' | null>(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isTakeaway, setIsTakeaway] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const settings = getSettings();

  // Delivery fee
  const deliveryFee = isTakeaway ? 0 : 100;
  const subtotal = total;
  const grandTotal = subtotal + deliveryFee;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const validateStep1 = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (email && !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!isTakeaway && !deliveryAddress.trim()) {
      toast.error('Please enter your delivery address');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    if (!validateStep3()) return;

    setIsProcessing(true);

    try {
      // Generate order number
      const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`;
      setOrderNumber(newOrderNumber);

      // Format payment method name for display
      let paymentMethodName = '';
      if (paymentMethod === 'mpesa-paybill') paymentMethodName = 'M-PESA Paybill';
      else if (paymentMethod === 'mpesa-till') paymentMethodName = 'M-PESA Till Number';
      else if (paymentMethod === 'mpesa-pochi') paymentMethodName = 'M-PESA Pochi La Biashara';
      else if (paymentMethod === 'cash') paymentMethodName = 'Cash on Delivery';

      // Prepare WhatsApp message
      const orderItems = cart.map(item => 
        `${item.quantity}x ${item.name} - KES ${item.price * item.quantity}`
      ).join('\n');

      const message = encodeURIComponent(
        `🛒 *NEW ORDER #${newOrderNumber}*\n\n` +
        `👤 *Customer:* ${name}\n` +
        `📱 *Phone:* ${phone}\n` +
        `${email ? `✉️ *Email:* ${email}\n` : ''}` +
        `📍 *${isTakeaway ? 'Takeaway' : 'Delivery'}*${!isTakeaway && deliveryAddress ? `\n📮 *Address:* ${deliveryAddress}` : ''}\n` +
        `${deliveryInstructions ? `📝 *Instructions:* ${deliveryInstructions}\n` : ''}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `*ORDER DETAILS*\n` +
        `${orderItems}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `*Subtotal:* KES ${subtotal}\n` +
        `*Delivery:* ${deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}\n` +
        `*TOTAL:* KES ${grandTotal}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `*Payment Method:* ${paymentMethodName}\n` +
        `${paymentMethod?.startsWith('mpesa') ? `\n📱 M-PESA Number: ${settings.mpesaNumber}` : ''}\n\n` +
        `Please confirm this order. Thank you!`
      );

      // Open WhatsApp
      window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
      
      setOrderConfirmed(true);
      clearCart();
      
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderConfirmed) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12"
      >
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-3">
            Order Placed!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your order has been sent successfully.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
            <p className="font-mono text-xl font-bold text-[#FF6B35]">{orderNumber}</p>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            We've sent your order details via WhatsApp. Our team will confirm shortly.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white">
            Checkout
          </h1>
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              step >= 2 ? 'bg-[#FF6B35]' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${
              step >= 3 ? 'bg-[#FF6B35]' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Customer Details */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#FF6B35]" />
                    Your Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0712345678"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Delivery */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Delivery Type */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#FF6B35]" />
                      Delivery Options
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setIsTakeaway(false)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          !isTakeaway
                            ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
                        }`}
                      >
                        <Truck className={`w-6 h-6 mx-auto mb-2 ${
                          !isTakeaway ? 'text-[#FF6B35]' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          !isTakeaway ? 'text-[#FF6B35]' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          Delivery
                        </span>
                      </button>

                      <button
                        onClick={() => setIsTakeaway(true)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isTakeaway
                            ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
                        }`}
                      >
                        <Home className={`w-6 h-6 mx-auto mb-2 ${
                          isTakeaway ? 'text-[#FF6B35]' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          isTakeaway ? 'text-[#FF6B35]' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          Takeaway
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {!isTakeaway && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    >
                      <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#FF6B35]" />
                        Delivery Address
                      </h3>
                      
                      <div className="space-y-4">
                        <textarea
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="House number, street name, estate, landmark..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                        />

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Delivery Instructions (Optional)
                          </label>
                          <textarea
                            value={deliveryInstructions}
                            onChange={(e) => setDeliveryInstructions(e.target.value)}
                            placeholder="e.g., Gate code, landmark, special instructions..."
                            rows={2}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#FF6B35]" />
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    {/* M-PESA Paybill */}
                    <button
                      onClick={() => setPaymentMethod('mpesa-paybill')}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'mpesa-paybill'
                          ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            M-PESA Paybill
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Pay via Paybill {settings.mpesaNumber}
                          </p>
                        </div>
                        {paymentMethod === 'mpesa-paybill' && (
                          <Check className="w-5 h-5 text-[#FF6B35]" />
                        )}
                      </div>
                    </button>

                    {/* M-PESA Till Number */}
                    <button
                      onClick={() => setPaymentMethod('mpesa-till')}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'mpesa-till'
                          ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            M-PESA Till Number
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Pay via Till Number {settings.mpesaNumber}
                          </p>
                        </div>
                        {paymentMethod === 'mpesa-till' && (
                          <Check className="w-5 h-5 text-[#FF6B35]" />
                        )}
                      </div>
                    </button>

                    {/* M-PESA Pochi La Biashara */}
                    <button
                      onClick={() => setPaymentMethod('mpesa-pochi')}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'mpesa-pochi'
                          ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            M-PESA Pochi La Biashara
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Pay to our business account
                          </p>
                        </div>
                        {paymentMethod === 'mpesa-pochi' && (
                          <Check className="w-5 h-5 text-[#FF6B35]" />
                        )}
                      </div>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-[#FF6B35] bg-[#FF6B35]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#FF6B35]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Cash on Delivery
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Pay with cash when your order arrives
                          </p>
                        </div>
                        {paymentMethod === 'cash' && (
                          <Check className="w-5 h-5 text-[#FF6B35]" />
                        )}
                      </div>
                    </button>

                    {/* Payment Instructions */}
                    {paymentMethod?.startsWith('mpesa') && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      >
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
                          M-PESA Payment Instructions
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          {paymentMethod === 'mpesa-paybill' && (
                            <>
                              <p>1. Go to M-PESA on your phone</p>
                              <p>2. Select "Lipa Na M-PESA"</p>
                              <p>3. Select "Paybill"</p>
                              <p>4. Enter Business Number: <strong>{settings.mpesaNumber}</strong></p>
                              <p>5. Enter Account Number: <strong>Your phone number</strong></p>
                              <p>6. Enter amount: <strong>KES {grandTotal}</strong></p>
                              <p>7. Enter your PIN and confirm</p>
                            </>
                          )}
                          {paymentMethod === 'mpesa-till' && (
                            <>
                              <p>1. Go to M-PESA on your phone</p>
                              <p>2. Select "Lipa Na M-PESA"</p>
                              <p>3. Select "Buy Goods and Services"</p>
                              <p>4. Enter Till Number: <strong>{settings.mpesaNumber}</strong></p>
                              <p>5. Enter amount: <strong>KES {grandTotal}</strong></p>
                              <p>6. Enter your PIN and confirm</p>
                            </>
                          )}
                          {paymentMethod === 'mpesa-pochi' && (
                            <>
                              <p>1. Go to M-PESA on your phone</p>
                              <p>2. Select "Lipa Na M-PESA"</p>
                              <p>3. Select "Pochi La Biashara"</p>
                              <p>4. Enter Business Number: <strong>{settings.mpesaNumber}</strong></p>
                              <p>5. Enter amount: <strong>KES {grandTotal}</strong></p>
                              <p>6. Enter your PIN and confirm</p>
                            </>
                          )}
                          <p className="mt-2 text-xs italic">
                            After payment, your order will be confirmed automatically.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="font-medium text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#FF6B35]" />
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
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
                    KES {subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                    {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#FF6B35]">
                    KES {grandTotal}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </button>
                )}

                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="w-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
              </div>

              {/* Security Note */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Your order will be confirmed via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}