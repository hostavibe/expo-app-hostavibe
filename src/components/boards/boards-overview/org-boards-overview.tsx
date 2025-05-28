import { fetchOrgBoardConfigurations } from '@/src/api/supabase-db/boards4orgs-configurations'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import { useUserContext } from '@/src/hooks/user-context'
import { OrgBoardSetupDbRowFull, OrgBoardSetupDbRowFullSchema } from '@/src/zod-types/boards/org-board-setup-db-row'
import { OrgBoardIdPrefix } from '@/src/zod-types/branded-strings/board-id'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { OrgBoardSetupListItem } from '../org-board-setup-list-item'


interface OrgBoardsOverviewScreenProps {
  orgId: string;
  orgName: string;
  userId: string;
}

export const OrgBoardsOverviewScreen = ({ orgId, orgName, userId }: OrgBoardsOverviewScreenProps) => {
  const { supabase } = useUserContext();
  const [configurations, setConfigurations] = useState<OrgBoardSetupDbRowFull[]>([]);
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
        const rawData = await fetchOrgBoardConfigurations(supabase, orgId);

        const parsedData = rawData
          .map((item) => OrgBoardSetupDbRowFullSchema.safeParse(item))
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
  }, [supabase, orgId]);

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
        <ThemedText style={styles.error}>{userId}</ThemedText>
        <ThemedText style={styles.error}>{orgName}</ThemedText>
        <ThemedText style={styles.error}>{orgId}</ThemedText>
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
    
    const boardId = `${OrgBoardIdPrefix}${id}`;
    router.push({
      pathname: '/(actions)/play-board/[id]',
      params: {
        id: boardId,
      },
    });
  }


  return (
    <View style={styles.container}>
      <ThemedText>OrgBoardsOverviewScreen - {orgName}: {orgId}</ThemedText>
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
                // onPress={() => router.push(`/boards/org/board_${item.id}` as any)}
                onPress={() => router.push({
                  pathname: `/(tabs)/org/boards/[id]`,
                  // pathname: `/(tabs)/boards/org/[id]/submissions`,
                  params: {
                    id: `obrd_${item.id}`
                  }
                })}
                style={styles.configItem}
              >
                <OrgBoardSetupListItem
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

export default OrgBoardsOverviewScreen;

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