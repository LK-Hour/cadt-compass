'use client';

import { useAuthStore } from '@/stores/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // This component can be used to wrap the app and provide auth context
  // Currently using Zustand, so this is mostly a placeholder for future enhancements
  return <>{children}</>;
}
