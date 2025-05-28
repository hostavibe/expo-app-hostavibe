import { Link, router, Stack, useFocusEffect, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

export default function NotFoundScreen() {
  const hookPathname = usePathname();
  console.log('pathname from hook', hookPathname);

  const windowLocationPathname = window.location.pathname;
  console.log('windowLocationPathname', windowLocationPathname);

  // const baseUrl = Constants.expoConfig?.experiments?.baseUrl || '';

  useFocusEffect(() => {
    // If this is a direct URL access (not client-side navigation)
    if (typeof window !== 'undefined' && !window.history.state?.usr?.isClientNavigation) {
      // Redirect to the same path but with a query parameter
      // const searchParams = new URLSearchParams(window.location.search);
      // searchParams.set('path', pathname);
      // window.location.href = `/?${searchParams.toString()}`;
      // console.log('window.location.pathname', window.location.pathname);
      // const pathname = decodeURIComponent(window.location.pathname);
      router.push({
        pathname: hookPathname as string,
      });
    }
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/home" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
