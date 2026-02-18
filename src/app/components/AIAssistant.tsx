// import { useState, useRef, useEffect } from 'react';
// import { 
//   MessageCircle, 
//   X, 
//   Send, 
//   Bot, 
//   User, 
//   Globe, 
//   Coffee, 
//   Zap, 
//   HelpCircle, 
//   ChevronRight, 
//   Sparkles, 
//   ThumbsUp, 
//   ThumbsDown, 
//   Copy, 
//   Check, 
//   ExternalLink,
//   Wifi,
//   WifiOff,
//   RefreshCw
// } from 'lucide-react';
// import { getSettings } from '../../utils/storage';

// // ============================================================================
// // BIZWAZIRI BRANDING — YOUR LOGO AND POWERED BY
// // ============================================================================
// const BIZWAZIRI_LOGO = "https://i.ibb.co/ByB6Y0Q/Bizwaziri-Logo.png"; // Replace with your actual logo URL
// const BIZWAZIRI_WEBSITE = "https://bizwaziri-clean.vercel.app/";
// const BIZWAZIRI_PHONE = "0792211741";

// // ============================================================================
// // API CONFIGURATION — FULLY WORKING WITH FREE TIERS
// // ============================================================================
// const API_CONFIG = {
//   // PRIMARY: Google Gemini (Free, 60 requests/minute)
//   GEMINI: {
//     API_KEY: 'AIzaSyBzzVQx9CQXxJqQx9CQXxJqQx9CQXxJqQx9C', // REPLACE WITH YOUR ACTUAL KEY
//     API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
//     FALLBACK_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', // Faster model
//   },
  
//   // FALLBACK: Groq (Free, very fast)
//   GROQ: {
//     API_KEY: 'gsk_y0uR4eAlGr0qKeYhErE', // REPLACE WITH YOUR ACTUAL KEY
//     API_URL: 'https://api.groq.com/openai/v1/chat/completions',
//   },

//   // ULTIMATE FALLBACK: Local responses when APIs fail
// };

// // Menu context for the AI
// const MENU_CONTEXT = [
//   {
//     name: "Chicken Wrap",
//     price: 200,
//     description: "Grilled chicken wrapped in tortilla with fresh vegetables",
//     category: "food",
//     nutrition: { calories: 420, protein: 28, carbs: 35, fats: 18 }
//   },
//   {
//     name: "Chicken Quarter",
//     price: 250,
//     description: "Quarter chicken grilled to perfection",
//     category: "food",
//     nutrition: { calories: 325, protein: 32, carbs: 0, fats: 22 }
//   },
//   {
//     name: "Chicken Half",
//     price: 500,
//     description: "Half chicken, perfectly seasoned and grilled",
//     category: "food",
//     nutrition: { calories: 650, protein: 65, carbs: 0, fats: 45 }
//   },
//   {
//     name: "Chips/Fries",
//     price: 150,
//     description: "Crispy golden fries, perfectly salted",
//     category: "food",
//     nutrition: { calories: 365, protein: 4, carbs: 48, fats: 17 }
//   },
//   {
//     name: "Classic Lemonade",
//     price: 130,
//     description: "Fresh squeezed lemonade",
//     category: "drinks",
//     nutrition: { calories: 120, protein: 0, carbs: 30, fats: 0 }
//   },
//   {
//     name: "Mint Lemonade",
//     price: 130,
//     description: "Lemonade with fresh mint leaves",
//     category: "drinks",
//     nutrition: { calories: 120, protein: 0, carbs: 30, fats: 0 }
//   },
//   {
//     name: "Strawberry Lemonade",
//     price: 160,
//     description: "Lemonade with fresh strawberry puree",
//     category: "drinks",
//     nutrition: { calories: 150, protein: 0, carbs: 38, fats: 0 }
//   },
//   {
//     name: "Passion Fruit Mojito",
//     price: 250,
//     description: "Non-alcoholic mojito with passion fruit",
//     category: "drinks",
//     nutrition: { calories: 180, protein: 0, carbs: 45, fats: 0 }
//   },
//   {
//     name: "Fresh Orange Juice",
//     price: 130,
//     description: "Fresh squeezed orange juice",
//     category: "drinks",
//     nutrition: { calories: 110, protein: 2, carbs: 26, fats: 0 }
//   }
// ];

// // ============================================================================
// // TYPES
// // ============================================================================
// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
//   quickReplies?: string[];
// }

// // ============================================================================
// // AI ASSISTANT COMPONENT
// // ============================================================================
// export function AIAssistant() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [copiedId, setCopiedId] = useState<string | null>(null);
//   const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
//   const [usingFallback, setUsingFallback] = useState(false);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const settings = getSettings();

//   // Check API health on mount
//   useEffect(() => {
//     checkAPIHealth();
//   }, []);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Focus input when opened
//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => inputRef.current?.focus(), 300);
//       // Show welcome message if no messages
//       if (messages.length === 0) {
//         setTimeout(() => {
//           setMessages([{
//             id: Date.now().toString(),
//             text: `👋 Welcome to ${settings.name}! I'm your AI assistant, powered by Bizwaziri.\n\nI can help you with:\n• Menu recommendations\n• Nutritional information\n• Price inquiries\n• Food suggestions based on your mood\n\nHow can I help you today?`,
//             isBot: true,
//             timestamp: new Date(),
//             quickReplies: ['What\'s popular?', 'Healthy options', 'Menu prices', 'Catering']
//           }]);
//         }, 500);
//       }
//     }
//   }, [isOpen]);

//   // ==========================================================================
//   // API HEALTH CHECK
//   // ==========================================================================
//   const checkAPIHealth = async () => {
//     setApiStatus('checking');
//     try {
//       // Try Gemini first
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 3000);

//       const response = await fetch(`${API_CONFIG.GEMINI.API_URL}?key=${API_CONFIG.GEMINI.API_KEY}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{
//             parts: [{
//               text: "Respond with only the word 'OK'"
//             }]
//           }]
//         }),
//         signal: controller.signal
//       });

//       clearTimeout(timeoutId);

//       if (response.ok) {
//         setApiStatus('online');
//         setUsingFallback(false);
//         return;
//       }
//       throw new Error('Gemini failed');
//     } catch (error) {
//       // Try Groq as fallback
//       try {
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 3000);

//         const response = await fetch(API_CONFIG.GROQ.API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${API_CONFIG.GROQ.API_KEY}`,
//           },
//           body: JSON.stringify({
//             model: 'mixtral-8x7b-32768',
//             messages: [{ role: 'user', content: 'OK' }],
//             max_tokens: 10
//           }),
//           signal: controller.signal
//         });

//         clearTimeout(timeoutId);

//         if (response.ok) {
//           setApiStatus('online');
//           setUsingFallback(true);
//           return;
//         }
//         throw new Error('Groq failed');
//       } catch (fallbackError) {
//         setApiStatus('offline');
//         setUsingFallback(false);
//       }
//     }
//   };

//   // ==========================================================================
//   // CALL GEMINI API
//   // ==========================================================================
//   const callGeminiAPI = async (userMessage: string, history: any[]) => {
//     const conversationHistory = history.slice(-10).map(msg => ({
//       role: msg.isBot ? 'model' : 'user',
//       parts: [{ text: msg.text }]
//     }));

//     const systemPrompt = `You are a friendly AI assistant for ${settings.name}, a food truck and catering business.

// MENU (with prices and nutrition):
// ${JSON.stringify(MENU_CONTEXT, null, 2)}

// BUSINESS INFO:
// - Name: ${settings.name}
// - Location: ${settings.location || 'Kiambu Road'}
// - Hours: ${settings.operatingHours || 'Mon-Sun: 11am - 10pm'}
// - WhatsApp: ${settings.whatsappNumber || '0792 211 741'}

// YOUR ROLE:
// 1. Help customers with menu recommendations
// 2. Provide nutritional information when asked
// 3. Suggest food based on mood (hungry, tired, happy, etc.)
// 4. Answer price inquiries
// 5. For complex questions (allergies, catering quotes, special events), suggest contacting WhatsApp

// RESPONSE GUIDELINES:
// - Be warm and friendly
// - Keep responses under 150 words
// - Include specific menu items with prices when relevant
// - Suggest 2-3 quick replies when appropriate
// - If question is too complex, include [CONTACT_WHATSAPP] in your response

// USER MESSAGE: ${userMessage}`;

//     try {
//       const response = await fetch(`${API_CONFIG.GEMINI.API_URL}?key=${API_CONFIG.GEMINI.API_KEY}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{
//             parts: [{
//               text: systemPrompt
//             }]
//           }],
//           generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 400,
//           }
//         })
//       });

//       if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
      
//       const data = await response.json();
//       return data.candidates[0].content.parts[0].text;
//     } catch (error) {
//       console.error('Gemini API error:', error);
//       throw error;
//     }
//   };

//   // ==========================================================================
//   // CALL GROQ API (FALLBACK)
//   // ==========================================================================
//   const callGroqAPI = async (userMessage: string, history: any[]) => {
//     const messages = [
//       {
//         role: 'system',
//         content: `You are a friendly AI assistant for ${settings.name}, a food truck business. 
// Menu: ${JSON.stringify(MENU_CONTEXT.map(m => ({ name: m.name, price: m.price, category: m.category })))}
// Keep responses helpful and concise.`
//       },
//       ...history.slice(-8).map(msg => ({
//         role: msg.isBot ? 'assistant' : 'user',
//         content: msg.text
//       })),
//       { role: 'user', content: userMessage }
//     ];

//     try {
//       const response = await fetch(API_CONFIG.GROQ.API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${API_CONFIG.GROQ.API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: 'mixtral-8x7b-32768',
//           messages: messages,
//           temperature: 0.7,
//           max_tokens: 400,
//         })
//       });

//       if (!response.ok) throw new Error(`Groq error: ${response.status}`);
      
//       const data = await response.json();
//       return data.choices[0].message.content;
//     } catch (error) {
//       console.error('Groq API error:', error);
//       throw error;
//     }
//   };

//   // ==========================================================================
//   // LOCAL FALLBACK RESPONSES (WHEN APIs FAIL)
//   // ==========================================================================
//   const getLocalResponse = (userMessage: string): string => {
//     const lower = userMessage.toLowerCase();
    
//     // Mood-based responses
//     if (lower.includes('hungry') || lower.includes('starving')) {
//       return "Our Chicken Half (KES 500) is perfect for big appetites! 65g of protein and very satisfying. For something lighter, try the Chicken Wrap at KES 200.";
//     }
    
//     if (lower.includes('healthy') || lower.includes('diet')) {
//       return "Our Chicken Quarter (KES 250) is high protein, low carb. Pair with Mint Lemonade (KES 130) which aids digestion. Both are fresh daily!";
//     }

//     if (lower.includes('popular') || lower.includes('favorite') || lower.includes('best')) {
//       return "Our most popular items: 🍗 Chicken Wrap (KES 200) and 🍟 Chips/Fries (KES 150). The Passion Fruit Mojito (KES 250) is also a crowd favorite!";
//     }

//     if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
//       return "Our prices: Chicken Wrap (KES 200), Chicken Quarter (KES 250), Chicken Half (KES 500), Chips (KES 150), Lemonades (KES 130-160), Passion Fruit Mojito (KES 250). Great value for fresh food!";
//     }

//     if (lower.includes('drink') || lower.includes('beverage')) {
//       return "We have: Classic Lemonade (KES 130), Mint Lemonade (KES 130), Strawberry Lemonade (KES 160), Passion Fruit Mojito (KES 250), and Fresh Orange Juice (KES 130). All fresh daily!";
//     }

//     if (lower.includes('catering') || lower.includes('event') || lower.includes('party')) {
//       return "For catering inquiries, please contact us on WhatsApp: ${settings.whatsappNumber}. We offer packages for 10-500 guests with custom menus!";
//     }

//     if (lower.includes('allerg') || lower.includes('ingredient')) {
//       return "For detailed allergen information, please reach out on WhatsApp: ${settings.whatsappNumber}. Our team will help with specific dietary needs!";
//     }

//     if (lower.includes('thank')) {
//       return "You're very welcome! 😊 Anything else I can help you with?";
//     }

//     if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
//       return "Hello! 👋 How can I help you today? I can recommend dishes, check prices, or suggest something based on your mood!";
//     }

//     // Default response
//     return "I'd be happy to help! You can ask me about menu items, prices, nutritional info, or get recommendations based on how you're feeling. What would you like to know?";
//   };

//   // ==========================================================================
//   // SEND MESSAGE HANDLER
//   // ==========================================================================
//   const handleSend = async () => {
//     if (!message.trim() || isTyping) return;

//     const userMessageId = Date.now().toString();
//     const userMessageObj: Message = {
//       id: userMessageId,
//       text: message,
//       isBot: false,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMessageObj]);
//     setMessage('');
//     setIsTyping(true);

//     try {
//       let aiResponse = '';
//       let needsWhatsApp = false;

//       // Try API if online
//       if (apiStatus === 'online') {
//         try {
//           if (!usingFallback) {
//             aiResponse = await callGeminiAPI(message, [...messages, userMessageObj]);
//           } else {
//             aiResponse = await callGroqAPI(message, [...messages, userMessageObj]);
//           }
          
//           // Check if response indicates WhatsApp redirect
//           needsWhatsApp = aiResponse.includes('[CONTACT_WHATSAPP]') || 
//                          aiResponse.toLowerCase().includes('whatsapp') ||
//                          message.toLowerCase().includes('catering') ||
//                          message.toLowerCase().includes('allerg') ||
//                          message.toLowerCase().includes('custom order');
          
//           // Clean response
//           aiResponse = aiResponse.replace('[CONTACT_WHATSAPP]', '').trim();
//         } catch (error) {
//           console.error('API error, using local fallback:', error);
//           aiResponse = getLocalResponse(message);
//           // Check if local response suggests WhatsApp
//           needsWhatsApp = aiResponse.toLowerCase().includes('whatsapp');
//         }
//       } else {
//         // Use local responses when offline
//         aiResponse = getLocalResponse(message);
//         needsWhatsApp = aiResponse.toLowerCase().includes('whatsapp');
//       }

//       // Extract quick replies
//       const quickReplies: string[] = [];
//       if (aiResponse.includes('🍗')) quickReplies.push('Chicken options');
//       if (aiResponse.includes('🥤')) quickReplies.push('Drinks menu');
//       if (aiResponse.includes('price')) quickReplies.push('View prices');
//       if (aiResponse.toLowerCase().includes('popular')) quickReplies.push('Popular items');
      
//       // Default quick replies if none extracted
//       const finalQuickReplies = quickReplies.length > 0 
//         ? quickReplies.slice(0, 3) 
//         : needsWhatsApp 
//           ? ['Contact WhatsApp', 'Menu', 'Prices']
//           : ['Menu', 'Prices', 'Popular'];

//       const botMessageObj: Message = {
//         id: (Date.now() + 1).toString(),
//         text: aiResponse,
//         isBot: true,
//         timestamp: new Date(),
//         quickReplies: finalQuickReplies,
//       };

//       setMessages(prev => [...prev, botMessageObj]);
//     } catch (error) {
//       console.error('Fatal error:', error);
      
//       // Ultimate fallback
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: "I'm having trouble connecting right now. For immediate assistance, please contact us on WhatsApp.",
//         isBot: true,
//         timestamp: new Date(),
//         quickReplies: ['Contact WhatsApp', 'Try again'],
//       };
      
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   // ==========================================================================
//   // HANDLE QUICK REPLY
//   // ==========================================================================
//   const handleQuickReply = (reply: string) => {
//     if (reply.includes('WhatsApp') || reply.includes('Contact')) {
//       handleRedirectToWhatsApp();
//       return;
//     }
//     setMessage(reply);
//     setTimeout(() => handleSend(), 100);
//   };

//   // ==========================================================================
//   // HANDLE COPY
//   // ==========================================================================
//   const handleCopyMessage = (text: string, id: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   // ==========================================================================
//   // HANDLE WHATSAPP REDIRECT
//   // ==========================================================================
//   const handleRedirectToWhatsApp = () => {
//     const lastUserMessage = [...messages].reverse().find(m => !m.isBot)?.text || '';
//     const context = encodeURIComponent(`Question: ${lastUserMessage.substring(0, 100)}`);
//     const whatsappMessage = encodeURIComponent(
//       `Hello! I need assistance with ${settings.name}. ${context}`
//     );
//     window.open(`https://wa.me/${settings.whatsappNumber || BIZWAZIRI_PHONE}?text=${whatsappMessage}`, '_blank');
//   };

//   // ==========================================================================
//   // HANDLE REFRESH
//   // ==========================================================================
//   const handleRefresh = () => {
//     checkAPIHealth();
//   };

//   // ==========================================================================
//   // RENDER
//   // ==========================================================================
//   if (!isOpen) {
//     return (
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 group z-50"
//         aria-label="Open AI Assistant"
//       >
//         {/* Pulsing rings */}
//         <div className="absolute inset-0 bg-[#FF6B35] rounded-full animate-ping opacity-20" />
//         <div className="absolute inset-0 bg-[#FF6B35] rounded-full animate-pulse opacity-30" />
        
//         {/* Main button with your logo */}
//         <div className="relative w-14 h-14 bg-gradient-to-r from-[#FF6B35] to-[#FF8B5C] rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 overflow-hidden border-2 border-white dark:border-gray-900">
//           <img 
//             src={BIZWAZIRI_LOGO}
//             alt="Bizwaziri Assistant"
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               // Fallback if logo fails to load
//               e.currentTarget.style.display = 'none';
//               e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
//               const icon = document.createElement('div');
//               icon.innerHTML = '<svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
//               e.currentTarget.parentElement?.appendChild(icon);
//             }}
//           />
//         </div>
        
//         {/* Tooltip */}
//         <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
//           Ask Bizwaziri AI
//         </span>
//       </button>
//     );
//   }

//   return (
//     <div className="fixed bottom-6 right-6 w-[420px] max-w-[calc(100vw-2rem)] z-50 animate-slide-up">
//       {/* Main card */}
//       <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-900 overflow-hidden flex flex-col max-h-[700px]">
        
//         {/* ================================================================== */}
//         {/* HEADER — WITH BIZWAZIRI BRANDING */}
//         {/* ================================================================== */}
//         <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8B5C] text-white p-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {/* Bizwaziri Logo */}
//               <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center p-1">
//                 <img 
//                   src={BIZWAZIRI_LOGO}
//                   alt="Bizwaziri"
//                   className="w-full h-full object-contain"
//                   onError={(e) => {
//                     e.currentTarget.style.display = 'none';
//                     const fallback = document.createElement('div');
//                     fallback.innerHTML = '<span class="text-white font-bold text-lg">B</span>';
//                     e.currentTarget.parentElement?.appendChild(fallback);
//                   }}
//                 />
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-medium text-lg">Bizwaziri Assistant</h3>
//                   <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
//                     <Sparkles className="w-3 h-3" />
//                     AI
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="text-xs text-white/80 flex items-center gap-1">
//                     <Coffee className="w-3 h-3" />
//                     {apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Offline mode' : 'Connecting...'}
//                   </p>
//                   {apiStatus === 'offline' && (
//                     <button 
//                       onClick={handleRefresh}
//                       className="text-white/60 hover:text-white"
//                       title="Retry connection"
//                     >
//                       <RefreshCw className="w-3 h-3" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-1">
//               <a
//                 href={BIZWAZIRI_WEBSITE}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 title="Powered by Bizwaziri"
//               >
//                 <Globe className="w-4 h-4" />
//               </a>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 title="Close"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================================================================== */}
//         {/* MESSAGES AREA */}
//         {/* ================================================================== */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[500px] bg-gray-50/50 dark:bg-gray-900/20">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
//             >
//               <div className={`max-w-[85%] group relative`}>
//                 {/* Message bubble */}
//                 <div
//                   className={`p-3 rounded-2xl ${
//                     msg.isBot
//                       ? 'bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 text-gray-800 dark:text-gray-200'
//                       : 'bg-[#FF6B35] text-white'
//                   }`}
//                 >
//                   {/* Avatar indicator */}
//                   {msg.isBot && (
//                     <div className="absolute -left-8 top-2 w-6 h-6 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
//                       <img 
//                         src={BIZWAZIRI_LOGO}
//                         alt=""
//                         className="w-4 h-4 object-contain"
//                         onError={(e) => {
//                           e.currentTarget.style.display = 'none';
//                           const icon = document.createElement('div');
//                           icon.innerHTML = '<span class="text-[#FF6B35] text-xs font-bold">B</span>';
//                           e.currentTarget.parentElement?.appendChild(icon);
//                         }}
//                       />
//                     </div>
//                   )}
                  
//                   {/* Message text */}
//                   <p className="text-sm whitespace-pre-line leading-relaxed">
//                     {msg.text}
//                   </p>

//                   {/* Timestamp & actions */}
//                   <div className="flex items-center justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <span className="text-[10px] text-gray-400">
//                       {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                     <button
//                       onClick={() => handleCopyMessage(msg.text, msg.id)}
//                       className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
//                       title="Copy"
//                     >
//                       {copiedId === msg.id ? (
//                         <Check className="w-3 h-3 text-green-500" />
//                       ) : (
//                         <Copy className="w-3 h-3 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Quick replies */}
//                 {msg.isBot && msg.quickReplies && msg.quickReplies.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {msg.quickReplies.map((reply) => (
//                       <button
//                         key={reply}
//                         onClick={() => handleQuickReply(reply)}
//                         className="px-3 py-1.5 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-full text-xs hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all"
//                       >
//                         {reply}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Typing indicator */}
//           {isTyping && (
//             <div className="flex justify-start animate-fade-in">
//               <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-900 p-4 rounded-2xl">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                   <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                   <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div ref={messagesEndRef} />
//         </div>

//         {/* ================================================================== */}
//         {/* INPUT AREA */}
//         {/* ================================================================== */}
//         <div className="p-4 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-[#0A0A0A]">
//           <div className="flex gap-2">
//             <input
//               ref={inputRef}
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Ask about menu, prices, recommendations..."
//               className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] transition-all text-sm"
//               disabled={isTyping}
//             />
//             <button
//               onClick={handleSend}
//               disabled={!message.trim() || isTyping}
//               className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Footer with Bizwaziri branding */}
//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center gap-2">
//               {apiStatus === 'online' ? (
//                 <Wifi className="w-3 h-3 text-green-500" />
//               ) : apiStatus === 'offline' ? (
//                 <WifiOff className="w-3 h-3 text-yellow-500" />
//               ) : (
//                 <RefreshCw className="w-3 h-3 text-gray-400 animate-spin" />
//               )}
//               <span className="text-xs text-gray-400">
//                 {apiStatus === 'online' 
//                   ? usingFallback ? 'Groq AI' : 'Gemini AI' 
//                   : 'Offline mode'}
//               </span>
//             </div>
            
//             <a
//               href={BIZWAZIRI_WEBSITE}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-1 text-xs text-[#FF6B35] hover:text-[#E55A2B] transition-colors group"
//             >
//               <span>Powered by</span>
//               <span className="font-medium">Bizwaziri</span>
//               <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//             </a>
//           </div>

//           {/* WhatsApp redirect hint */}
//           <div className="mt-2 text-center">
//             <button
//               onClick={handleRedirectToWhatsApp}
//               className="text-[10px] text-gray-400 hover:text-[#25D366] transition-colors inline-flex items-center gap-1"
//             >
//               <MessageCircle className="w-3 h-3" />
//               Complex questions? Chat with our team on WhatsApp
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-up {
//           animation: slide-up 0.3s ease-out;
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }



// src/app/components/AIAssistant.tsx
import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, User, Sparkles, Copy, Check, 
  Phone, Mail, MapPin, Clock, Star, Heart, ShoppingBag,
  Wifi, Menu, Flame, Award, HelpCircle, Navigation,
  Trash2, Info, ChevronRight, Sun, Moon,
  Maximize2, Minimize2, Coffee, Pizza, Beef,
  AlertCircle, ThumbsUp, Share2, ExternalLink,
  Zap, Gift, CreditCard, Truck, Home
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import { getSettings } from '../../utils/storage';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  isAvailable: boolean;
  preparationTime: string;
  calories: number;
  protein: number;
  ingredients: string[];
  dietary?: string[];
  spicy?: boolean;
  vegetarian?: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  type: 'text' | 'menu' | 'suggestions' | 'image' | 'promo';
  data?: any;
}

interface Suggestion {
  id: string;
  text: string;
  icon: React.ReactNode;
  action: string;
  category?: string;
  color?: string;
}

interface UserProfile {
  name?: string;
  phone?: string;
  email?: string;
  preferences?: string[];
  favorites?: string[];
  lastOrder?: string;
  visitCount?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const BIZWAZIRI_LOGO = "https://i.ibb.co/ByB6Y0Q/Bizwaziri-Logo.png";
const SUPPORT_PHONE = "+254775269628";

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Chicken Wrap",
    description: "Tender grilled chicken with fresh lettuce, tomatoes, and creamy sauce in a warm tortilla. Served with crispy fries.",
    price: 350,
    category: "Mains",
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
    rating: 4.7,
    reviewCount: 234,
    isPopular: true,
    isAvailable: true,
    preparationTime: "15 min",
    calories: 520,
    protein: 32,
    ingredients: ["Grilled chicken", "Lettuce", "Tomatoes", "Creamy sauce", "Tortilla", "Fries"],
    dietary: ["High Protein"]
  },
  {
    id: "2",
    name: "Chicken Quarter",
    description: "Quarter chicken marinated in Kenyan spices, grilled to perfection. Served with kachumbari and fries.",
    price: 450,
    category: "Mains",
    image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg",
    rating: 4.8,
    reviewCount: 567,
    isPopular: true,
    isAvailable: true,
    preparationTime: "20 min",
    calories: 425,
    protein: 38,
    ingredients: ["Chicken quarter", "Kenyan spices", "Kachumbari", "Fries"],
    spicy: true
  },
  {
    id: "3",
    name: "Half Chicken",
    description: "Generous half chicken, perfectly seasoned. Serves 2-3 people. Comes with two sides.",
    price: 950,
    category: "Mains",
    image: "https://images.pexels.com/photos/6210927/pexels-photo-6210927.jpeg",
    rating: 4.9,
    reviewCount: 892,
    isPopular: true,
    isAvailable: true,
    preparationTime: "25 min",
    calories: 850,
    protein: 76,
    ingredients: ["Half chicken", "Secret spices", "Fries", "Coleslaw", "Kachumbari"]
  },
  {
    id: "4",
    name: "Crispy Fries",
    description: "Golden crispy fries, perfectly salted. Made from fresh Kenyan potatoes.",
    price: 180,
    category: "Sides",
    image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
    rating: 4.5,
    reviewCount: 445,
    isPopular: false,
    isAvailable: true,
    preparationTime: "8 min",
    calories: 365,
    protein: 4,
    ingredients: ["Potatoes", "Vegetable oil", "Salt"],
    vegetarian: true
  },
  {
    id: "5",
    name: "Beef Samosas (3 pcs)",
    description: "Crispy pastry triangles filled with spiced minced beef and onions. Served with chutney.",
    price: 200,
    category: "Appetizers",
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    rating: 4.8,
    reviewCount: 423,
    isPopular: true,
    isAvailable: true,
    preparationTime: "12 min",
    calories: 280,
    protein: 12,
    ingredients: ["Minced beef", "Onions", "Spices", "Pastry", "Chutney"],
    spicy: true
  },
  {
    id: "6",
    name: "Classic Lemonade",
    description: "Freshly squeezed lemons with mint leaves and a touch of honey.",
    price: 180,
    category: "Drinks",
    image: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg",
    rating: 4.6,
    reviewCount: 234,
    isPopular: false,
    isAvailable: true,
    preparationTime: "5 min",
    calories: 120,
    protein: 0,
    ingredients: ["Fresh lemons", "Mint", "Honey", "Water"],
    vegetarian: true
  },
  {
    id: "7",
    name: "Passion Fruit Mojito",
    description: "Non-alcoholic mojito with fresh passion fruit, lime, mint, and soda.",
    price: 280,
    category: "Drinks",
    image: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg",
    rating: 4.9,
    reviewCount: 312,
    isPopular: true,
    isAvailable: true,
    preparationTime: "7 min",
    calories: 180,
    protein: 1,
    ingredients: ["Passion fruit", "Lime", "Mint", "Soda", "Sugar"],
    vegetarian: true
  }
];

const CATEGORIES = [
  { id: "all", name: "All Items", icon: "🍽️", color: "#FF6B35" },
  { id: "popular", name: "Popular", icon: "🔥", color: "#FF4500" },
  { id: "appetizers", name: "Appetizers", icon: "🥟", color: "#FFA500" },
  { id: "mains", name: "Main Course", icon: "🍛", color: "#32CD32" },
  { id: "sides", name: "Sides", icon: "🍟", color: "#FFD700" },
  { id: "drinks", name: "Drinks", icon: "🥤", color: "#00CED1" }
];

const QUICK_ACTIONS: Suggestion[] = [
  { id: 'menu', text: '📋 Browse Menu', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU', color: '#FF6B35' },
  { id: 'popular', text: '🔥 Popular Items', icon: <Flame className="w-4 h-4" />, action: 'SHOW_POPULAR', color: '#FF4500' },
  { id: 'hours', text: '🕐 Opening Hours', icon: <Clock className="w-4 h-4" />, action: 'SHOW_HOURS', color: '#32CD32' },
  { id: 'location', text: '📍 Our Location', icon: <MapPin className="w-4 h-4" />, action: 'SHOW_LOCATION', color: '#00CED1' },
  { id: 'delivery', text: '🚚 Delivery Info', icon: <Truck className="w-4 h-4" />, action: 'SHOW_DELIVERY', color: '#9370DB' },
  { id: 'payment', text: '💳 Payment', icon: <CreditCard className="w-4 h-4" />, action: 'SHOW_PAYMENT', color: '#FF69B4' }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const formatCurrency = (amount: number): string => {
  return `KES ${amount.toLocaleString()}`;
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const triggerSuccess = () => {
  toast.success('✨ Item added to cart!', {
    icon: '🎉',
    style: {
      background: '#FF6B35',
      color: 'white',
      border: 'none'
    }
  });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AIAssistant() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [settings, setSettings] = useState(getSettings());
  
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMenuGrid, setShowMenuGrid] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for settings changes
  useEffect(() => {
    const handleStorageChange = () => {
      setSettings(getSettings());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Effects
  useEffect(() => {
    loadUserProfile();
    
    // Set theme
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Welcome message
    if (isOpen && messages.length === 0) {
      setTimeout(() => sendWelcomeMessage(), 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load user profile
  const loadUserProfile = () => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load user profile');
      }
    }
  };

  const saveUserProfile = (profile: UserProfile) => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
    setUser(profile);
  };

  // Message functions
  const sendWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = "Hello! ";
    
    if (hour < 12) greeting = "🌅 Good morning! ";
    else if (hour < 17) greeting = "☀️ Good afternoon! ";
    else greeting = "🌙 Good evening! ";
    
    const welcomeText = user?.name
      ? `${greeting}Welcome back, ${user.name}! 👋 Ready to order your favorites?`
      : `${greeting}Welcome to ${settings.name}! I'm your AI assistant. How can I help you today?`;

    addBotMessage(welcomeText, 'text', QUICK_ACTIONS);
  };

  const addBotMessage = (content: string, type: Message['type'] = 'text', suggestions?: Suggestion[]) => {
    const newMessage: Message = {
      id: generateId(),
      content,
      sender: 'assistant',
      timestamp: new Date(),
      type,
      data: suggestions ? { suggestions } : undefined
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // AI Response Generation
  const generateResponse = (input: string): { text: string; suggestions?: Suggestion[] } => {
    const lowercaseInput = input.toLowerCase().trim();

    // Greeting detection
    if (lowercaseInput.match(/^(hi|hello|hey|howdy|greetings|good morning|good afternoon|good evening)/i)) {
      const hour = new Date().getHours();
      let greeting = "Hello! ";
      if (hour < 12) greeting = "Good morning! ";
      else if (hour < 17) greeting = "Good afternoon! ";
      else greeting = "Good evening! ";
      
      return {
        text: user?.name
          ? `${greeting}${user.name}! 😊 What can I get for you today?`
          : `${greeting}I'm here to help! What would you like to know?`,
        suggestions: QUICK_ACTIONS
      };
    }

    // Menu related
    if (lowercaseInput.includes('menu') || lowercaseInput.includes('food') || lowercaseInput.includes('eat')) {
      return handleMenuQuery();
    }

    // Popular items
    if (lowercaseInput.includes('popular') || lowercaseInput.includes('best') || lowercaseInput.includes('favorite')) {
      return handlePopularQuery();
    }

    // Category specific
    for (const cat of CATEGORIES) {
      if (lowercaseInput.includes(cat.name.toLowerCase()) || 
          (cat.id === 'mains' && lowercaseInput.includes('main')) ||
          (cat.id === 'appetizers' && (lowercaseInput.includes('appetizer') || lowercaseInput.includes('starter')))) {
        const items = MENU_ITEMS.filter(i => i.category.toLowerCase().includes(cat.name.toLowerCase()));
        return {
          text: `${cat.icon} **${cat.name}**\n\nHere are our ${cat.name.toLowerCase()}:`,
          suggestions: items.slice(0, 5).map(item => ({
            id: item.id,
            text: `${item.name} - ${formatCurrency(item.price)}`,
            icon: item.isPopular ? <Flame className="w-3 h-3" /> : <Info className="w-3 h-3" />,
            action: `VIEW_ITEM_${item.id}`
          }))
        };
      }
    }

    // Price queries
    if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('how much')) {
      return handlePriceQuery(lowercaseInput);
    }

    // Order
    if (lowercaseInput.includes('order') || lowercaseInput.includes('buy') || lowercaseInput.includes('want')) {
      return handleOrderQuery();
    }

    // Cart
    if (lowercaseInput.includes('cart') || lowercaseInput.includes('basket') || lowercaseInput.includes('bag')) {
      return handleCartQuery();
    }

    // Location - Using settings from admin
    if (lowercaseInput.includes('location') || lowercaseInput.includes('address') || lowercaseInput.includes('where')) {
      return {
        text: `📍 **Our Location**\n\n${settings.location}\n\n[Open in Google Maps](https://maps.google.com/?q=${encodeURIComponent(settings.location)})`,
        suggestions: [
          { id: 'directions', text: '🗺️ Get Directions', icon: <Navigation className="w-4 h-4" />, action: 'GET_DIRECTIONS' },
          { id: 'call', text: '📞 Call Us', icon: <Phone className="w-4 h-4" />, action: 'CALL' }
        ]
      };
    }

    // Hours - Using settings from admin
    if (lowercaseInput.includes('hour') || lowercaseInput.includes('open') || lowercaseInput.includes('close') || lowercaseInput.includes('time')) {
      return {
        text: `🕐 **Opening Hours**\n\n${settings.operatingHours}\n\nWe're open 7 days a week!`,
        suggestions: [
          { id: 'menu', text: '📋 Browse Menu', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
        ]
      };
    }

    // Contact - Using settings from admin
    if (lowercaseInput.includes('contact') || lowercaseInput.includes('phone') || lowercaseInput.includes('call') || lowercaseInput.includes('email')) {
      return {
        text: `📞 **Contact Information**\n\n` +
              `**Phone:** ${settings.mpesaNumber}\n` +
              `**WhatsApp:** ${settings.whatsappNumber}\n` +
              `**Instagram:** @bizwaziri\n` +
              `**Facebook:** /bizwaziri`,
        suggestions: [
          { id: 'call_now', text: '📞 Call Now', icon: <Phone className="w-4 h-4" />, action: 'CALL' },
          { id: 'whatsapp', text: '💬 WhatsApp', icon: <MessageCircle className="w-4 h-4" />, action: 'WHATSAPP' },
          { id: 'instagram', text: '📸 Instagram', icon: <ExternalLink className="w-4 h-4" />, action: 'INSTAGRAM' }
        ]
      };
    }

    // Delivery
    if (lowercaseInput.includes('delivery') || lowercaseInput.includes('deliver') || lowercaseInput.includes('takeaway')) {
      return {
        text: `🚚 **Delivery Information**\n\n` +
              `• Minimum order: KES 300\n` +
              `• Delivery fee: KES 100\n` +
              `• Free delivery over: KES 1,000\n` +
              `• Estimated time: 30-45 min\n` +
              `• Delivery radius: 10km`,
        suggestions: [
          { id: 'menu', text: '🛵 Order Now', icon: <ShoppingBag className="w-4 h-4" />, action: 'SHOW_MENU' }
        ]
      };
    }

    // Payment
    if (lowercaseInput.includes('pay') || lowercaseInput.includes('payment') || lowercaseInput.includes('mpesa') || lowercaseInput.includes('cash')) {
      return {
        text: `💳 **Payment Methods**\n\nWe accept:\n• M-PESA\n• Cash\n• Card\n• PayPal\n\n**M-PESA Till Number:** 123456`,
        suggestions: QUICK_ACTIONS
      };
    }

    // Recommendations based on preferences
    if (lowercaseInput.includes('recommend') || lowercaseInput.includes('suggest') || lowercaseInput.includes('what should i')) {
      if (user?.preferences?.length) {
        const recommendations = MENU_ITEMS.filter(item => 
          user.preferences?.some(pref => 
            item.name.toLowerCase().includes(pref) || 
            item.category.toLowerCase().includes(pref)
          )
        ).slice(0, 3);
        
        if (recommendations.length > 0) {
          return {
            text: "🎯 **Personalized Recommendations**\n\nBased on your preferences, you might like:",
            suggestions: recommendations.map(item => ({
              id: item.id,
              text: `${item.name} - ${formatCurrency(item.price)}`,
              icon: <Star className="w-3 h-3 text-yellow-500" />,
              action: `VIEW_ITEM_${item.id}`
            }))
          };
        }
      }
      return handlePopularQuery();
    }

    // Help
    if (lowercaseInput.includes('help') || lowercaseInput.includes('support') || lowercaseInput.includes('?')) {
      return {
        text: "❓ **How can I help you?**\n\n" +
              "You can ask me about:\n" +
              "• 📋 **Menu items** - 'Show me the menu'\n" +
              "• 🔥 **Popular items** - 'What's popular?'\n" +
              "• 💰 **Prices** - 'How much is the chicken wrap?'\n" +
              "• 🚚 **Delivery** - 'Do you deliver?'\n" +
              "• 📍 **Location** - 'Where are you?'\n" +
              "• 🕐 **Hours** - 'What time do you close?'\n" +
              "• 📞 **Contact** - 'How can I reach you?'\n\n" +
              "Just type your question!",
        suggestions: QUICK_ACTIONS
      };
    }

    // Name capture
    if (!user?.name && lowercaseInput.length > 2 && !lowercaseInput.match(/menu|help|popular|price|cart|order/)) {
      saveUserProfile({ name: input });
      return {
        text: `Nice to meet you, ${input}! 😊 What would you like to order today?`,
        suggestions: QUICK_ACTIONS
      };
    }

    // Search menu items
    const results = searchMenuItems(lowercaseInput);
    if (results.length > 0) {
      return {
        text: `🔍 I found ${results.length} item${results.length > 1 ? 's' : ''} matching "${input}":`,
        suggestions: results.slice(0, 5).map(item => ({
          id: item.id,
          text: `${item.name} - ${formatCurrency(item.price)}`,
          icon: item.isPopular ? <Flame className="w-3 h-3 text-orange-500" /> : <Info className="w-3 h-3" />,
          action: `VIEW_ITEM_${item.id}`
        }))
      };
    }

    // Default
    return {
      text: "I'm not sure I understand. Could you rephrase that? Type 'help' to see what I can do!",
      suggestions: QUICK_ACTIONS
    };
  };

  const handleMenuQuery = () => {
    setShowMenuGrid(true);
    return {
      text: "📋 **Our Menu**\n\nBrowse by category or search for specific items:",
      suggestions: CATEGORIES.map(cat => ({
        id: cat.id,
        text: `${cat.icon} ${cat.name}`,
        icon: null,
        action: `SHOW_CATEGORY_${cat.id}`,
        color: cat.color
      }))
    };
  };

  const handlePopularQuery = () => {
    const popular = MENU_ITEMS.filter(i => i.isPopular).slice(0, 6);
    return {
      text: "🔥 **Our Most Popular Items**\n\nThese are customer favorites:",
      suggestions: popular.map(item => ({
        id: item.id,
        text: `${item.name} - ${formatCurrency(item.price)} (${item.rating}★)`,
        icon: <Flame className="w-3 h-3" />,
        action: `VIEW_ITEM_${item.id}`,
        color: '#FF4500'
      }))
    };
  };

  const handlePriceQuery = (input: string) => {
    for (const item of MENU_ITEMS) {
      if (input.includes(item.name.toLowerCase().split(' ')[0])) {
        return {
          text: `**${item.name}**\n\n` +
                `💰 Price: ${formatCurrency(item.price)}\n` +
                `⭐ Rating: ${item.rating} (${item.reviewCount} reviews)\n` +
                `🕐 Prep time: ${item.preparationTime}\n` +
                `🔥 Calories: ${item.calories}\n` +
                `🥩 Protein: ${item.protein}g\n\n` +
                `${item.description}`,
          suggestions: [
            { id: `add_${item.id}`, text: '🛒 Add to Cart', icon: <ShoppingBag className="w-4 h-4" />, action: `ADD_TO_CART_${item.id}`, color: '#FF6B35' },
            { id: `details_${item.id}`, text: '🔍 Details', icon: <Info className="w-4 h-4" />, action: `VIEW_ITEM_${item.id}`, color: '#32CD32' }
          ]
        };
      }
    }
    return {
      text: "Our prices range from KES 180 to KES 950. Ask about specific items like 'How much is the chicken wrap?'",
      suggestions: QUICK_ACTIONS
    };
  };

  const handleOrderQuery = () => {
    if (!user?.name) {
      return {
        text: "To place an order, please tell me your name first.",
        suggestions: []
      };
    }

    if (cart.length === 0) {
      return {
        text: "Your cart is empty. Would you like to browse our menu?",
        suggestions: [
          { id: 'menu', text: '📋 Browse Menu', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
        ]
      };
    }

    return {
      text: `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart. Ready to checkout?`,
      suggestions: [
        { id: 'checkout', text: '✅ Checkout', icon: <ShoppingBag className="w-4 h-4" />, action: 'CHECKOUT' },
        { id: 'view_cart', text: '👁️ View Cart', icon: <ShoppingBag className="w-4 h-4" />, action: 'VIEW_CART' },
        { id: 'menu', text: '📋 Add More', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
      ]
    };
  };

  const handleCartQuery = () => {
    if (cart.length === 0) {
      return {
        text: "🛒 Your cart is empty. Start adding delicious items!",
        suggestions: [
          { id: 'menu', text: '📋 Browse Menu', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
        ]
      };
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 1000 ? 0 : 100;
    const total = subtotal + delivery;

    const cartText = cart.map(item => 
      `• ${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');

    return {
      text: `🛒 **Your Cart**\n\n${cartText}\n\n` +
            `Subtotal: ${formatCurrency(subtotal)}\n` +
            `Delivery: ${delivery === 0 ? 'FREE' : formatCurrency(delivery)}\n` +
            `**Total: ${formatCurrency(total)}**`,
      suggestions: [
        { id: 'checkout', text: '✅ Checkout', icon: <ShoppingBag className="w-4 h-4" />, action: 'CHECKOUT' },
        { id: 'clear_cart', text: '🗑️ Clear Cart', icon: <Trash2 className="w-4 h-4" />, action: 'CLEAR_CART' },
        { id: 'menu', text: '📋 Add More', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
      ]
    };
  };

  const searchMenuItems = (query: string): MenuItem[] => {
    const words = query.split(' ').filter(w => w.length > 2);
    return MENU_ITEMS.filter(item => {
      const searchableText = `${item.name} ${item.description} ${item.category} ${item.ingredients.join(' ')}`.toLowerCase();
      return words.some(word => searchableText.includes(word));
    });
  };

  // Send message
  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    const userInput = inputMessage;
    setInputMessage('');
    addUserMessage(userInput);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userInput);
      addBotMessage(response.text, 'text', response.suggestions);
      setIsTyping(false);
    }, 800);
  };

  // Handle suggestions
  const handleSuggestionClick = (suggestion: Suggestion) => {
    const action = suggestion.action;

    if (action === 'SHOW_MENU') {
      const response = handleMenuQuery();
      addBotMessage(response.text, 'text', response.suggestions);
    }

    else if (action === 'SHOW_POPULAR') {
      const response = handlePopularQuery();
      addBotMessage(response.text, 'text', response.suggestions);
    }

    else if (action === 'SHOW_HOURS') {
      addBotMessage(
        `🕐 **Opening Hours**\n\n` +
        `${settings.operatingHours}`,
        'text'
      );
    }

    else if (action === 'SHOW_LOCATION') {
      addBotMessage(
        `📍 **Our Location**\n\n${settings.location}`,
        'text',
        [
          { id: 'directions', text: '🗺️ Get Directions', icon: <Navigation className="w-4 h-4" />, action: 'GET_DIRECTIONS' }
        ]
      );
    }

    else if (action === 'SHOW_DELIVERY') {
      addBotMessage(
        `🚚 **Delivery Information**\n\n` +
        `• Minimum: KES 300\n` +
        `• Fee: KES 100\n` +
        `• Free over: KES 1,000\n` +
        `• Time: 30-45 min`,
        'text'
      );
    }

    else if (action === 'SHOW_PAYMENT') {
      addBotMessage(
        `💳 **Payment Methods**\n\n` +
        `• M-PESA\n• Cash\n• Card\n• PayPal`,
        'text'
      );
    }

    else if (action.startsWith('SHOW_CATEGORY_')) {
      const categoryId = action.replace('SHOW_CATEGORY_', '');
      const items = categoryId === 'all' 
        ? MENU_ITEMS 
        : MENU_ITEMS.filter(i => i.category.toLowerCase() === 
            CATEGORIES.find(c => c.id === categoryId)?.name.toLowerCase());
      
      const category = CATEGORIES.find(c => c.id === categoryId);
      
      addBotMessage(`${category?.icon} **${category?.name}**`, 'text',
        items.slice(0, 6).map(item => ({
          id: item.id,
          text: `${item.name} - ${formatCurrency(item.price)}`,
          icon: item.isPopular ? <Flame className="w-3 h-3" /> : null,
          action: `VIEW_ITEM_${item.id}`,
          color: category?.color
        }))
      );
    }

    else if (action.startsWith('VIEW_ITEM_')) {
      const itemId = action.replace('VIEW_ITEM_', '');
      const item = MENU_ITEMS.find(i => i.id === itemId);
      if (item) {
        addBotMessage(
          `**${item.name}**\n\n` +
          `${item.description}\n\n` +
          `💰 **Price:** ${formatCurrency(item.price)}\n` +
          `⭐ **Rating:** ${item.rating} (${item.reviewCount} reviews)\n` +
          `🕐 **Prep time:** ${item.preparationTime}\n` +
          `🔥 **Calories:** ${item.calories}\n` +
          `🥩 **Protein:** ${item.protein}g\n\n` +
          `**Ingredients:**\n${item.ingredients.join(', ')}`,
          'text',
          [
            { id: `add_${item.id}`, text: '🛒 Add to Cart', icon: <ShoppingBag className="w-4 h-4" />, action: `ADD_TO_CART_${item.id}` },
            { id: 'menu', text: '📋 Back to Menu', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
          ]
        );
      }
    }

    else if (action.startsWith('ADD_TO_CART_')) {
      const itemId = action.replace('ADD_TO_CART_', '');
      const item = MENU_ITEMS.find(i => i.id === itemId);
      if (item) {
        addToCart({
          id: generateId(),
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        });
        
        triggerSuccess();
        
        addBotMessage(
          `✅ Added **${item.name}** to your cart!`,
          'text',
          [
            { id: 'view_cart', text: '🛒 View Cart', icon: <ShoppingBag className="w-4 h-4" />, action: 'VIEW_CART' },
            { id: 'checkout', text: '✅ Checkout', icon: <ShoppingBag className="w-4 h-4" />, action: 'CHECKOUT' },
            { id: 'menu', text: '📋 Continue Shopping', icon: <Menu className="w-4 h-4" />, action: 'SHOW_MENU' }
          ]
        );
      }
    }

    else if (action === 'VIEW_CART') {
      const response = handleCartQuery();
      addBotMessage(response.text, 'text', response.suggestions);
    }

    else if (action === 'CLEAR_CART') {
      localStorage.removeItem('cart');
      toast.success('Cart cleared');
      addBotMessage("Your cart has been cleared.", 'text');
    }

    else if (action === 'CHECKOUT') {
      if (cart.length === 0) {
        toast.error('Your cart is empty');
        return;
      }
      if (!user?.name) {
        addBotMessage("Please tell me your name to complete the order.", 'text');
      } else {
        navigate('/checkout');
      }
    }

    else if (action === 'GET_DIRECTIONS') {
      window.open(`https://maps.google.com/?q=${encodeURIComponent(settings.location)}`, '_blank');
    }

    else if (action === 'CALL') {
      window.open(`tel:${settings.mpesaNumber.replace(/\s/g, '')}`);
    }

    else if (action === 'WHATSAPP') {
      window.open(`https://wa.me/${settings.whatsappNumber}`, '_blank');
    }

    else if (action === 'EMAIL') {
      window.open(`mailto:info@${settings.name?.toLowerCase().replace(/\s/g, '')}.com`);
    }

    else if (action === 'INSTAGRAM') {
      window.open('https://instagram.com/bizwaziri', '_blank');
    }
  };

  // Copy message
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render typing indicator
  const renderTypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none">
        <div className="relative">
          <div className="w-6 h-6 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-full animate-pulse" />
          <Sparkles className="absolute top-1.5 left-1.5 w-3 h-3 text-white" />
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </motion.div>
  );

  // Render message
  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[85%] group`}>
          {!isUser && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">AI Assistant</span>
            </div>
          )}
          
          <div className={`relative p-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] text-white rounded-tr-none'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
          }`}>
            <div className="text-sm whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>

            <div className={`flex items-center justify-end gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
              isUser ? 'text-white/70' : 'text-gray-400'
            }`}>
              <span className="text-[10px]">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                onClick={() => handleCopy(message.content, message.id)}
                className="p-1 hover:bg-black/10 rounded"
              >
                {copiedId === message.id ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>

          {message.data?.suggestions && (
            <div className="flex flex-wrap gap-2 mt-2">
              {message.data.suggestions.map((suggestion: Suggestion) => (
                <motion.button
                  key={suggestion.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all flex items-center gap-1"
                  style={{ borderColor: suggestion.color }}
                >
                  {suggestion.icon}
                  <span>{suggestion.text}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Render menu grid
  const renderMenuGrid = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-['Poppins'] font-bold text-gray-900 dark:text-white">
          📋 Today's Menu
        </h4>
        <button
          onClick={() => setShowMenuGrid(false)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              handleSuggestionClick({
                id: cat.id,
                text: cat.name,
                icon: null,
                action: `SHOW_CATEGORY_${cat.id}`
              });
            }}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs hover:bg-[#FF6B35] hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {MENU_ITEMS.filter(item => 
          selectedCategory === 'all' ? true : 
          item.category.toLowerCase() === CATEGORIES.find(c => c.id === selectedCategory)?.name.toLowerCase()
        ).slice(0, 5).map(item => (
          <div
            key={item.id}
            onClick={() => handleSuggestionClick({
              id: item.id,
              text: item.name,
              icon: null,
              action: `VIEW_ITEM_${item.id}`
            })}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
          >
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1">
              <h5 className="font-['Poppins'] font-medium text-sm text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatCurrency(item.price)}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Main render
  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 group z-50"
      >
        <div className="absolute inset-0 bg-[#FF6B35] rounded-full animate-ping opacity-20" />
        <div className="absolute inset-0 bg-[#FF6B35] rounded-full animate-pulse opacity-30" />
        
        <div className="relative w-14 h-14 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-white dark:border-gray-800">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {cart.length > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{cart.length}</span>
          </div>
        )}
      </motion.button>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 ${
          isFullScreen ? 'inset-4' : 'w-[400px] max-w-[calc(100vw-2rem)]'
        }`}
      >
        <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col ${
          isFullScreen ? 'h-full' : 'h-[600px]'
        }`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center p-1">
                  {settings.logo?.startsWith('data:') ? (
                    <img 
                      src={settings.logo} 
                      alt={settings.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-white text-lg font-bold">{settings.logo || 'B'}</span>
                  )}
                </div>
                
                <div>
                  <h3 className="font-['Poppins'] font-bold text-base">{settings.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                      <span className="text-xs text-white/80">Online</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-300 fill-current" />
                      <span className="text-xs text-white/80">4.8</span>
                    </div>
                    {user?.name && (
                      <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                        <User className="w-3 h-3" />
                        <span className="text-xs">{user.name.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ rotate: 180 }}
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    document.documentElement.classList.toggle('dark');
                  }}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </motion.button>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {cart.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 pt-3 border-t border-white/20"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{cart.length} item{cart.length > 1 ? 's' : ''}</span>
                  </div>
                  <span>{formatCurrency(cart.reduce((sum, i) => sum + (i.price * i.quantity), 0))}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/20">
            <AnimatePresence>
              {showMenuGrid && renderMenuGrid()}
              {messages.map(renderMessage)}
              {isTyping && renderTypingIndicator()}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask about ${settings.name}...`}
                className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35] transition-all text-sm font-['Inter']"
                disabled={isTyping}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <img 
                  src={BIZWAZIRI_LOGO}
                  alt="Bizwaziri"
                  className="w-4 h-4 object-contain opacity-50"
                />
                <span className="text-xs text-gray-400">Powered by Bizwaziri</span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSuggestionClick(QUICK_ACTIONS[5])}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Help
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.open(`tel:${SUPPORT_PHONE}`)}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Call
                </motion.button>
                {cart.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSuggestionClick({ id: 'cart', text: 'Cart', icon: <ShoppingBag />, action: 'VIEW_CART' })}
                    className="text-xs bg-[#FF6B35] text-white hover:bg-[#E55A2B] transition-colors px-2 py-1 rounded-lg font-medium flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    {cart.length}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}