import { UserProvider } from '@/src/hooks/user-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </ClerkProvider>
  );
}
