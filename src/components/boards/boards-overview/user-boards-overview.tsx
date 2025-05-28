import { fetchUserBoardConfigurations } from '@/src/api/supabase-db/boards4users-configurations'
import { UserBoardSetupListItem } from '@/src/components/boards/user-board-setup-list-item'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import { useUserContext } from '@/src/hooks/user-context'
import { UserBoardSetupDbRowFull, UserBoardSetupDbRowFullSchema } from '@/src/zod-types/boards/user-board-setup-db-row'
import { useOrganization, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'


interface UserBoardsOverviewScreenProps {
  userId: string;
}

export const UserBoardsOverviewScreen = ({ userId }: UserBoardsOverviewScreenProps) => {
  const { supabase } = useUserContext();
  const [configurations, setConfigurations] = useState<UserBoardSetupDbRowFull[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();
  const { organization } = useOrganization();

  useEffect(() => {
    async function fetchConfigurations() {
      if (!supabase) {
        console.error('No supabase client found');
        return;
      }

      setIsLoading(true);

      try {
        const rawData = await fetchUserBoardConfigurations(supabase);

        const parsedData = rawData
          .map((item) => UserBoardSetupDbRowFullSchema.safeParse(item))
          .filter((result) => result.success)
          .map((result) => result.data);

        setConfigurations(parsedData || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching board configurations:', err);
        setError('Failed to load board configurations');
      } finally {
        setIsLoading(false);
      }
    }

    fetchConfigurations();
  }, [supabase]);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>{user?.emailAddresses[0].emailAddress}</ThemedText>
        <ThemedText style={styles.error}>{organization?.name}</ThemedText>
        <ThemedText style={styles.error}>{organization?.id}</ThemedText>
        <ThemedText style={styles.error}>{error}</ThemedText>
      </ThemedView>
    );
  }


  const handleDelete = (id: string) => {
    console.log('delete', id);
  }

  const handleLaunch = (id: string) => {
    console.log('launch', id);
    // router.push(`/boards/board_${id}/play`);
    // router.push(`/(actions)/play-board/board_${id}`);
  }


  return (
    <View style={styles.container}>
      <ThemedText>UserBoardsOverviewScreen</ThemedText>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          <FlatList
            data={configurations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // <Link href={`/(tabs)/boards/mine/board_${item.id}`} asChild>
            <Pressable
                onPress={() => router.push({
                  pathname: `/(tabs)/my/boards/[id]`,
                  // pathname: `/(tabs)/boards/mine/[id]`,
                  params: {
                    id: `ubrd_${item.id}`
                  }
                  
                  // pathname: '/(tabs)/boards/mine/[zboardId]',
                  // params: { zboardId: `board_${item.id}` }
                })}
                style={styles.configItem}
              >
                <UserBoardSetupListItem
                  item={item}
                  onDelete={handleDelete}
                  onLaunch={handleLaunch}
                />
                {/* <ThemedText type="title">{item.name}</ThemedText>
                {/* {item.description && ( */}
                  {/* <ThemedText style={styles.description}>{item.description}</ThemedText> */}
                {/* )} */}
                {/* <ThemedText style={styles.date}>
                  Created: {new Date(item.created_at).toLocaleDateString()}
                </ThemedText> */}
              </Pressable>
              // </Link>
              // <ThemedText>blah</ThemedText>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>
                  No board configurations found
                </ThemedText>
              </View>
            }
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default UserBoardsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  contentContainer: {
    width: 400,
    maxWidth: '100%',
    // padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  configItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  description: {
    marginTop: 4,
    color: '#666',
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#999',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});