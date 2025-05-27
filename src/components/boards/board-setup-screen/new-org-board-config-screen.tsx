import { addOrgBoardConfiguration } from "@/src/api/supabase-db/boards4orgs-configurations";
import { useUserContext } from "@/src/hooks/user-context";
import { BOARD_TYPE_SINGLE_SCREEN } from "@/src/zod-types/boards/board-types/fzb-board-single-screen";
import { OrgBoardSetupDbRow } from "@/src/zod-types/boards/org-board-setup-db-row";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../../ThemedText";
import { ThemedView } from "../../ThemedView";


interface NewOrgBoardConfigScreenProps {
  userId: string;
  orgId: string;
  orgName: string;
}

export const NewOrgBoardConfigScreen = ({ userId, orgId, orgName }: NewOrgBoardConfigScreenProps) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { supabase } = useUserContext();

  console.log('OrgBoardSetupScreen', { userId, orgId, orgName });


  async function handleSubmit() {

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const newBoardConfig: OrgBoardSetupDbRow = {
      name: name.trim(),
      description: description.trim(),

      configuration_json: {
        boardType: BOARD_TYPE_SINGLE_SCREEN,
        screenConfig: {
          screenType: 'show-permanent-blank',
        },
      },

      clerk_org_id: orgId,
    };

    try {
      const result = await addOrgBoardConfiguration(supabase, userId, newBoardConfig);
      console.log('result', result);

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
      <ThemedText type="title" style={styles.title}>Create New Board for {orgName}</ThemedText>

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
            onPress={() => router.back()}
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
