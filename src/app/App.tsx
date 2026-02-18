import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from '../context/CartContext';
import { LockProvider } from '../context/LockContext';
import { Toaster } from 'sonner';
import { initializeStorage } from '../utils/storage';

// Initialize storage on app start
initializeStorage();

export default function App() {
  return (
    <LockProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </CartProvider>
    </LockProvider>
  );
}