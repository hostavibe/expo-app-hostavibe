import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useEnvironment } from '@/src/hooks/useEnvironment';
import { useOrganization, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export const ProfileScreen = () => {

  const { user } = useUser()
  const { organization } = useOrganization()

  const env = useEnvironment();

  
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        {/* <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          {organization && (
            <Text>Active Organization: {organization.name}</Text>
          )}
          <MyOrganizationsComponent />
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut> */}

{/* 
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
         */}
        {/* Example of displaying environment variables (remove in production) */}
        <ThemedText>Environment: {env.envName || 'Not set'}</ThemedText>
        {/* <ThemedText>API Key: {apiKey ? '****' : 'Not set'}</ThemedText>
        <ThemedText>Base URL: {baseUrl || 'Not set'}</ThemedText> */}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          {/* <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '} */}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 178,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  reactLogo: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileScreen;
