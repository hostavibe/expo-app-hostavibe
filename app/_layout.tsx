import { UserProvider } from '@/src/hooks/user-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get('path');
      
      if (redirectPath && pathname === '/') {
        // Clear the search params and navigate to the correct path
        window.history.replaceState({}, '', redirectPath);
        // Use the path as a relative path string
        router.replace(redirectPath as any);
      }
    }
  }, [pathname, router]);

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
