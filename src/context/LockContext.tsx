import React, { createContext, useContext, useEffect, useState } from 'react';

interface LockState {
  isLocked: boolean;
  message: string;
  until: string | null;
  lockedBy: string | null;
  lockedAt: string | null;
  reason: 'payment' | 'maintenance' | 'custom' | null;
}

interface LockContextType {
  isLocked: boolean;
  lockMessage: string;
  lockUntil: string | null;
  lockSite: (options: {
    message: string;
    days?: number;
    hours?: number;
    reason?: 'payment' | 'maintenance' | 'custom';
    permanent?: boolean;
  }) => void;
  unlockSite: () => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

const LOCK_STATE_KEY = 'app_global_lock_v2';

export function LockProvider({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(false);
  const [lockMessage, setLockMessage] = useState('');
  const [lockUntil, setLockUntil] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCK_STATE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      setIsLocked(state.isLocked);
      setLockMessage(state.message);
      setLockUntil(state.until);
    }
  }, []);

  const lockSite = (options: {
    message: string;
    days?: number;
    hours?: number;
    reason?: 'payment' | 'maintenance' | 'custom';
    permanent?: boolean;
  }) => {
    let until: string | null = null;
    if (!options.permanent) {
      const date = new Date();
      if (options.days) date.setDate(date.getDate() + options.days);
      if (options.hours) date.setHours(date.getHours() + options.hours);
      until = date.toISOString();
    }

    const newState = {
      isLocked: true,
      message: options.message,
      until,
      lockedBy: localStorage.getItem('admin_user') || 'Admin',
      lockedAt: new Date().toISOString(),
      reason: options.reason || 'custom'
    };

    localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
    setIsLocked(true);
    setLockMessage(options.message);
    setLockUntil(until);
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: LOCK_STATE_KEY,
      newValue: JSON.stringify(newState)
    }));
  };

  const unlockSite = () => {
    const newState = {
      isLocked: false,
      message: '',
      until: null,
      lockedBy: null,
      lockedAt: null,
      reason: null
    };

    localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(newState));
    setIsLocked(false);
    setLockMessage('');
    setLockUntil(null);
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: LOCK_STATE_KEY,
      newValue: JSON.stringify(newState)
    }));
  };

  return (
    <LockContext.Provider value={{ isLocked, lockMessage, lockUntil, lockSite, unlockSite }}>
      {children}
    </LockContext.Provider>
  );
}

export function useLock() {
  const context = useContext(LockContext);
  if (!context) {
    throw new Error('useLock must be used within a LockProvider');
  }
  return context;
}