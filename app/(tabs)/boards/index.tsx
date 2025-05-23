import { fetchBoardConfigurations } from '@/src/api/supabase-db/board-configurations'
import { BoardSetupListItem } from '@/src/components/boards/board-setup-list-item'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import { useUserContext } from '@/src/hooks/user-context'
import { BoardSetupDbRowFull, BoardSetupDbRowFullSchema } from '@/src/zod-types/boards/board-setup-db-row'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'


export const BoardSetupsScreen = () => {
  const { supabase } = useUserContext();
  const [configurations, setConfigurations] = useState<BoardSetupDbRowFull[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConfigurations() {
      if (!supabase) {
        console.error('No supabase client found');
        return;
      }

      setIsLoading(true);

      try {
        const rawData = await fetchBoardConfigurations(supabase);

        const parsedData = rawData
          .map((item) => BoardSetupDbRowFullSchema.safeParse(item))
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
    router.push(`/(actions)/play-board/board_${id}`);
  }

  // return null;

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          <FlatList
            data={configurations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/boards/board_${item.id}` as any)}
                style={styles.configItem}
              >
                <BoardSetupListItem
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

export default BoardSetupsScreen;

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