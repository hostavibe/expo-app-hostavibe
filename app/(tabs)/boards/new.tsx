import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useUserContext } from '@/src/hooks/user-context';
import { BoardSetupDbRowNew } from '@/src/zod-types/boards/board-setup-db-row';
import { BOARD_TYPE_SINGLE_SCREEN } from '@/src/zod-types/boards/board-types/fzb-board-single-screen';
import { useUser as useClerkUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export const NewBoardSetupScreen = () => {
  const router = useRouter();
  const { supabase } = useUserContext();
  const { user } = useClerkUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clerk_user_org_id = user?.organizationMemberships[0].organization.id;

  if (!user) {
    return <ThemedText>User not found</ThemedText>;
  }

  if (!clerk_user_org_id) {
    return <ThemedText>Organization not found</ThemedText>;
  }

  async function handleSubmit() {

    if (!user) {
      setError('User not found');
      return;
    }

    if (!clerk_user_org_id) {
      setError('Organization not found');
      return;
    }

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // const newBoardConfig: FzbBoardTypes = {
    //   boardType: BOARD_TYPE_SINGLE_SCREEN,
    //   screenConfig: {
    //     screenType: 'show-permanent-blank',
    //   },
    // };

    const newBoardConfig: BoardSetupDbRowNew = {
      name: name.trim(),
      description: description.trim(),

      configuration_json: {
        boardType: BOARD_TYPE_SINGLE_SCREEN,
        screenConfig: {
          screenType: 'show-permanent-blank',
        },
      },

      clerk_user_id: user.id,
      clerk_org_id: clerk_user_org_id,

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { error: insertError } = await supabase
        .from('board_configurations')
        .insert(newBoardConfig);
        // .insert({
        //   name: name.trim(),
        //   description: description.trim(),
        //   clerk_user_id: user?.id,
        //   clerk_org_id: clerk_user_org_id,
        //   configuration_json: newBoardConfig,
        // });

      if (insertError) throw insertError;

      // Navigate back to the board list
      router.back();
    } catch (err) {
      console.error('Error creating board:', err);
      setError('Failed to create board. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Create New Board</ThemedText>

      {error && (
        <ThemedText style={styles.error}>{error}</ThemedText>
      )}

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <ThemedText>Name</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter board name"
            maxLength={50}
            autoFocus
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText>Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter board description"
            maxLength={255}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.push('/(tabs)/boards/[id]/index')}
          >
            <ThemedText style={styles.buttonText}>Cancel</ThemedText>
          </Pressable>

          <Pressable
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <ThemedText style={styles.buttonText}>
              {isSubmitting ? 'Creating...' : 'Create Board'}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

export default NewBoardSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff4444',
    marginBottom: 16,
  },
}); 