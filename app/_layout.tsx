import { UserProvider } from '@/src/hooks/user-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import Constants from 'expo-constants';
import { Slot, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const router = useRouter();
  const pathname = usePathname();
  const baseUrl = Constants.expoConfig?.experiments?.baseUrl || '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get('redirect');
      
      if (redirectPath && pathname === '/') {
        // Remove the baseUrl from the path if it exists
        const cleanPath = redirectPath.startsWith(baseUrl) 
          ? redirectPath.slice(baseUrl.length) 
          : redirectPath;
        
        // Clear the search params and navigate to the correct path
        window.history.replaceState({}, '', cleanPath);
        // Use the path as a relative path string
        router.replace(cleanPath as any);
      }
    }
  }, [pathname, router, baseUrl]);

  if (!clerkPublishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </ClerkProvider>
  );
}
