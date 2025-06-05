'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  timeout?: number;
}

const AutoLogoutProvider = ({ children, timeout = 5 * 60 * 1000 }: Props) => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = ''; 
    router.push('/auth/login');
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, timeout);
  };

  const events = ['mousemove', 'keydown', 'click', 'scroll'];

  useEffect(() => {
    resetTimer();
    const handleActivity = () => resetTimer();
    events.forEach((event) => window.addEventListener(event, handleActivity));
    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return <>{children}</>;
};

export default AutoLogoutProvider;
